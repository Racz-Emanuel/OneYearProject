<template>
  <div class="hand-container">
    <button @click="cameraOn ? stopCamera() : startCamera()" class="toggle-btn">
      {{ cameraOn ? "Turn Camera Off" : "Turn Camera On" }}
    </button>

    <div class="video-container">
      <video ref="video" class="video" width="640" height="480" autoplay playsinline></video>
      <canvas ref="canvas" class="canvas" width="640" height="480"></canvas>
    </div>

    <p class="status">Detected gesture: {{ gesture }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { Hands } from "@mediapipe/hands"
import { Camera } from "@mediapipe/camera_utils"

const video = ref(null)
const canvas = ref(null)
const gesture = ref("None")
const camera = ref(null)
const cameraOn = ref(false)

const HAND_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [0, 17]
]

/* ---------------------------
   3D CURL DETECTOR (FIXED)
   MediaPipe z is negative when
   closer to camera, so we use
   only the bend angle between
   consecutive bone vectors.
   Straight finger ≈ 0 rad,
   fully curled ≈ 1.8–2.2 rad.
----------------------------*/
/* ---------------------------
   3D CURL DETECTOR (FIXED)
----------------------------*/
function computeCurl(landmarks, finger) {
  const joints = {
    thumb: [1, 2, 3, 4],
    index: [5, 6, 7, 8],
    middle: [9, 10, 11, 12],
    ring: [13, 14, 15, 16],
    pinky: [17, 18, 19, 20]
  }

  const ids = joints[finger]
  const mcp = landmarks[ids[0]]
  const pip = landmarks[ids[1]]
  const dip = landmarks[ids[2]]
  const tip = landmarks[ids[3]]

  function vec(a, b) {
    return { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z }
  }

  function angle(a, b) {
    const dot = a.x * b.x + a.y * b.y + a.z * b.z
    const mag = Math.sqrt((a.x * a.x + a.y * a.y + a.z * a.z) * (b.x * b.x + b.y * b.y + b.z * b.z))
    if (mag === 0) return 0
    return Math.acos(Math.max(-1, Math.min(1, dot / mag)))
  }

  const a1 = angle(vec(mcp, pip), vec(pip, dip))
  const a2 = angle(vec(pip, dip), vec(dip, tip))
  const avg = (a1 + a2) / 2

  if (avg > 0.7) return "Full Curl"
  if (avg > 0.4) return "Half Curl"
  return "No Curl"
}

/* ---------------------------
   THUMB EXTENSION HELPER
   Detects if thumb is extended
   outward (L-shape, Y-shape)
   vs tucked/alongside fist.
   Uses angle between thumb
   base vector and index MCP.
----------------------------*/
function thumbIsExtended(landmarks) {
  // Vector from wrist to index MCP (palm direction)
  const wrist = landmarks[0]
  const indexMCP = landmarks[5]
  const thumbMCP = landmarks[1]
  const thumbTip = landmarks[4]

  function vec(a, b) {
    return { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z }
  }
  function angle(a, b) {
    const dot = a.x * b.x + a.y * b.y + a.z * b.z
    const mag = Math.sqrt((a.x * a.x + a.y * a.y + a.z * a.z) * (b.x * b.x + b.y * b.y + b.z * b.z))
    if (mag === 0) return 0
    return Math.acos(Math.max(-1, Math.min(1, dot / mag)))
  }

  const palmVec = vec(wrist, indexMCP)
  const thumbVec = vec(thumbMCP, thumbTip)
  // If thumb points significantly away from palm axis → extended
  return angle(palmVec, thumbVec) > 0.8
}

/* ---------------------------
   FINGERTIP PROXIMITY HELPER
   Returns true if two landmark
   tips are close to each other.
   Normalized to hand size.
----------------------------*/
function tipsClose(landmarks, idA, idB, threshold = 0.07) {
  const a = landmarks[idA]
  const b = landmarks[idB]
  const wrist = landmarks[0]
  const middleMCP = landmarks[9]
  // Normalize by hand size (wrist→middle MCP distance)
  const handSize = Math.sqrt(
    (middleMCP.x - wrist.x) ** 2 + (middleMCP.y - wrist.y) ** 2 + (middleMCP.z - wrist.z) ** 2
  )
  const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2)
  return dist / handSize < threshold
}

/* ---------------------------
   ASL A–Z DETECTOR
   J and Z require motion and
   cannot be detected from a
   single static frame — they
   are skipped (return "J/Z?").
----------------------------*/
function curlScore(val) {
  if (val === "No Curl") return 0
  if (val === "Half Curl") return 1
  return 2
}

function detectASL(curl, landmarks) {
  const s = {}
  for (const f of ["thumb", "index", "middle", "ring", "pinky"]) {
    s[f] = curlScore(curl[f])
  }

  const thumbExt = thumbIsExtended(landmarks)

  // Tip landmark IDs: thumb=4, index=8, middle=12, ring=16, pinky=20
  const thumbIndexClose = tipsClose(landmarks, 4, 8)
  const thumbMiddleClose = tipsClose(landmarks, 4, 12)
  const thumbPinkyClose = tipsClose(landmarks, 4, 20)
  const indexMiddleClose = tipsClose(landmarks, 8, 12)

  // ── A: fist, thumb rests on side (Half curl) ──────────────────
  if (s.thumb === 1 && s.index === 2 && s.middle === 2 && s.ring === 2 && s.pinky === 2) return "A"

  // ── B: four fingers fully up, thumb tucked across palm ────────
  if (s.thumb === 2 && s.index === 0 && s.middle === 0 && s.ring === 0 && s.pinky === 0) return "B"

  // ── C: open curve, all Half curl ──────────────────────────────
  if (s.thumb === 1 && s.index === 1 && s.middle === 1 && s.ring === 1 && s.pinky === 1) return "C"

  // ── D: index up, middle/ring/pinky curled, thumb touches middle
  if (s.index === 0 && s.middle >= 1 && s.ring >= 1 && s.pinky >= 1 && thumbMiddleClose) return "D"

  // ── E: all fingers hooked (Half), thumb tucked under (Full) ───
  if (s.thumb === 2 && s.index === 1 && s.middle === 1 && s.ring === 1 && s.pinky === 1) return "E"

  // ── F: index+thumb pinch, middle/ring/pinky extended ──────────
  if (thumbIndexClose && s.middle === 0 && s.ring === 0 && s.pinky === 0) return "F"

  // ── G: index pointing sideways, thumb parallel, others curled ─
  // index & thumb extended, middle/ring/pinky curled
  if (
    s.index === 0 &&
    s.thumb === 0 &&
    !thumbIndexClose &&
    s.middle >= 1 &&
    s.ring >= 1 &&
    s.pinky >= 1
  )
    return "G"

  // ── H: index + middle extended horizontally together, others in
  if (
    s.index === 0 &&
    s.middle === 0 &&
    indexMiddleClose &&
    s.ring >= 1 &&
    s.pinky >= 1 &&
    s.thumb === 2
  )
    return "H"

  // ── I: only pinky up, thumb tucked over others ────────────────
  if (s.index >= 1 && s.middle >= 1 && s.ring >= 1 && s.pinky === 0 && s.thumb === 2) return "I"

  // ── J: I-shape + motion (static frame can't detect motion) ────
  // return "J?" here if you have motion tracking

  // ── K: index + middle up + spread, thumb up toward middle ─────
  if (
    s.index === 0 &&
    s.middle === 0 &&
    !indexMiddleClose &&
    s.ring >= 1 &&
    s.pinky >= 1 &&
    s.thumb === 1 &&
    thumbMiddleClose
  )
    return "K"

  // ── L: index up + thumb out at 90°, others curled ─────────────
  if (s.index === 0 && thumbExt && !thumbIndexClose && s.middle >= 1 && s.ring >= 1 && s.pinky >= 1)
    return "L"

  // ── M: index/middle/ring folded over thumb, pinky folded ──────
  // all four fingers curled over tucked thumb
  if (s.index === 2 && s.middle === 2 && s.ring === 2 && s.pinky === 2 && s.thumb === 2) return "M" // distinguished from E/S by tip positions — see note below

  // ── N: index/middle folded over thumb, ring/pinky folded ──────
  if (
    s.index === 2 &&
    s.middle === 2 &&
    s.ring === 2 &&
    s.pinky === 2 &&
    s.thumb === 1 &&
    !thumbExt
  )
    return "N"

  // ── O: all fingertips meet thumb tip forming O ────────────────
  if (thumbIndexClose && s.index === 1 && s.middle === 1 && s.ring === 1 && s.pinky === 1)
    return "O"

  // ── P: like K but hand tilted down (middle points down) ───────
  // MediaPipe doesn't give orientation, so we detect same curl as K
  // and rely on wrist landmark y-tilt — skipped for simplicity, map to K

  // ── Q: like G but pointing downward ───────────────────────────
  // Same curl as G; orientation-based, skipped — maps to G

  // ── R: index + middle crossed (touching), others curled ───────
  if (
    s.index === 0 &&
    s.middle === 0 &&
    indexMiddleClose &&
    s.ring >= 1 &&
    s.pinky >= 1 &&
    s.thumb >= 1
  )
    return "R"

  // ── S: tight fist, thumb over index+middle ────────────────────
  if (s.thumb === 1 && s.index === 2 && s.middle === 2 && s.ring === 2 && s.pinky === 2) return "S" // same curl as A — differentiated by thumb tip position (over vs. beside)
  // To tell A vs S: in A thumb tip is beside index; in S it crosses over index+middle
  // Add: tipsClose(landmarks, 4, 6) (thumb tip near index PIP) for S

  // ── T: index folds over thumb, thumb between index+middle ─────
  if (
    s.index === 2 &&
    s.middle === 2 &&
    s.ring === 2 &&
    s.pinky === 2 &&
    s.thumb === 1 &&
    tipsClose(landmarks, 4, 6)
  )
    return "T"

  // ── U: index + middle straight together, ring/pinky/thumb in ──
  if (
    s.index === 0 &&
    s.middle === 0 &&
    indexMiddleClose &&
    s.ring >= 1 &&
    s.pinky >= 1 &&
    s.thumb >= 1 &&
    !tipsClose(landmarks, 4, 12)
  )
    return "U"

  // ── V: index + middle straight and spread apart, others in ────
  if (
    s.index === 0 &&
    s.middle === 0 &&
    !indexMiddleClose &&
    s.ring >= 1 &&
    s.pinky >= 1 &&
    s.thumb >= 1 &&
    !thumbMiddleClose
  )
    return "V"

  // ── W: index + middle + ring straight and spread, pinky+thumb in
  if (s.index === 0 && s.middle === 0 && s.ring === 0 && s.pinky >= 1 && thumbPinkyClose) return "W"

  // ── X: index finger hooked/bent, others curled ────────────────
  if (s.index === 1 && s.middle >= 1 && s.ring >= 1 && s.pinky >= 1 && s.thumb === 1) return "X"

  // ── Y: thumb + pinky extended wide, index/middle/ring curled ──
  if (thumbExt && s.index >= 1 && s.middle >= 1 && s.ring >= 1 && s.pinky === 0 && !thumbPinkyClose)
    return "Y"

  // ── Z: index pointing, draws Z in air (motion-based) ──────────
  // return "Z?" here if you have motion tracking

  // ── Fuzzy fallback ────────────────────────────────────────────
  const targets = {
    A: [1, 2, 2, 2, 2],
    B: [2, 0, 0, 0, 0],
    C: [1, 1, 1, 1, 1],
    D: [1, 0, 2, 2, 2],
    E: [2, 1, 1, 1, 1],
    F: [1, 1, 0, 0, 0],
    G: [0, 0, 1, 1, 1],
    H: [2, 0, 0, 1, 1],
    I: [2, 1, 1, 1, 0],
    K: [1, 0, 0, 1, 1],
    L: [0, 0, 1, 1, 1],
    M: [2, 2, 2, 2, 2],
    N: [1, 2, 2, 2, 2],
    O: [1, 1, 1, 1, 1],
    R: [1, 0, 0, 1, 1],
    S: [1, 2, 2, 2, 2],
    T: [1, 2, 2, 2, 2],
    U: [1, 0, 0, 1, 1],
    V: [1, 0, 0, 1, 1],
    W: [1, 0, 0, 0, 1],
    X: [1, 1, 1, 1, 1],
    Y: [0, 1, 1, 1, 0]
  }
  const fingers = ["thumb", "index", "middle", "ring", "pinky"]
  let best = "Unknown",
    bestDist = Infinity
  for (const [letter, scores] of Object.entries(targets)) {
    const dist = fingers.reduce((acc, f, i) => acc + Math.abs(s[f] - scores[i]), 0)
    if (dist < bestDist) {
      bestDist = dist
      best = letter
    }
  }
  return bestDist <= 2 ? best : "Unknown"
}

/* ---------------------------
   DRAWING
----------------------------*/
function drawLandmarks(ctx, landmarks, color = "#00FF00") {
  for (const p of landmarks) {
    ctx.beginPath()
    ctx.arc(p.x * canvas.value.width, p.y * canvas.value.height, 5, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
  }
}

function drawConnections(ctx, landmarks, connections, color = "#00FF00") {
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  for (const [s, e] of connections) {
    const p1 = landmarks[s]
    const p2 = landmarks[e]
    ctx.beginPath()
    ctx.moveTo(p1.x * canvas.value.width, p1.y * canvas.value.height)
    ctx.lineTo(p2.x * canvas.value.width, p2.y * canvas.value.height)
    ctx.stroke()
  }
}

/* ---------------------------
   MEDIAPIPE HANDS
----------------------------*/
let hands

onMounted(() => {
  hands = new Hands({
    locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
  })

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  })

  hands.onResults(results => {
    const ctx = canvas.value.getContext("2d")
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    if (!results.multiHandLandmarks.length) return

    const landmarks = results.multiHandLandmarks[0]

    drawConnections(ctx, landmarks, HAND_CONNECTIONS)
    drawLandmarks(ctx, landmarks)

    const fingers = ["thumb", "index", "middle", "ring", "pinky"]
    const curl = {}
    fingers.forEach(f => {
      curl[f] = computeCurl(landmarks, f)
    })

    console.log("Curl:", curl)
    // in hands.onResults — replace the old single line:
    gesture.value = detectASL(curl, landmarks) // ← add landmarks as second arg
  })
})

function startCamera() {
  if (cameraOn.value) return
  camera.value = new Camera(video.value, {
    onFrame: async () => {
      await hands.send({ image: video.value })
    },
    width: 640,
    height: 480
  })
  camera.value.start()
  cameraOn.value = true
}

function stopCamera() {
  if (!cameraOn.value) return
  const stream = video.value.srcObject
  if (stream) stream.getTracks().forEach(t => t.stop())
  video.value.srcObject = null
  cameraOn.value = false
}

onBeforeUnmount(() => stopCamera())
</script>

<style scoped>
.hand-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video,
.canvas {
  width: 640px;
  height: 480px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.status {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4f46e5;
}

.toggle-btn {
  background: #4f46e5;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.toggle-btn:hover {
  background: #4338ca;
}

.video-container {
  position: relative;
  width: 640px;
  height: 480px;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* important */
}
</style>
