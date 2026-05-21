import * as fp from "fingerpose"

// A: fist, thumb on side
export const AGesture = new fp.GestureDescription("A")
AGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0)
AGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5)
;[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  AGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
})

// B: flat hand, fingers extended, thumb across palm
export const BGesture = new fp.GestureDescription("B")
;[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  BGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0)
  BGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 0.8)
})
BGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0)

// C: curved hand like a “C”
export const CGesture = new fp.GestureDescription("C")
;[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  CGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0)
})
CGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0)

// D: index up, others curled
export const DGesture = new fp.GestureDescription("D")
DGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0)
DGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.8)
;[fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  DGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
})
DGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0)

// E: tight fist, thumb over fingers
export const EGesture = new fp.GestureDescription("E")
;[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  EGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
})
EGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0)

// F: “OK” sign (thumb + index circle, others up)
export const FGesture = new fp.GestureDescription("F")
FGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0)
FGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0)
FGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.5)
;[fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  FGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0)
})
