<script setup>
import FeedBack from "@/components/FeedBack.vue"
import { useStatsStore } from "@/stores/stats.js"
import { useDailyChallengeStore } from "@/stores/dailyChallenge"
import { useUserStore } from "@/stores/user"
import { ref, watch } from "vue"

// 1. declare stores first
const statsStore = useStatsStore()
const dailyChallenge = useDailyChallengeStore()
const userStore = useUserStore()

// 2. then use them
const levels = ["beginner", "intermediate", "advanced"]
const minutesToAdd = ref(0)
const ageInput = ref(userStore.profile?.age || "")

// 3. watch after stores are declared
watch(
  () => userStore.profile,
  profile => {
    if (profile) {
      statsStore.sessions = profile.sessions || 0
      statsStore.minutes = profile.minutes || 0
    }
  },
  { immediate: true }
)

const confirmDelete = () => {
  if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
    userStore.deleteAccount()
  }
}

const confirmReset = () => {
  if (confirm("Are you sure you want to delete your stats? This cannot be undone.")) {
    statsStore.resetStats()
  }
}
</script>
<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <i class="bi bi-speedometer2 icon"></i>
      <h1>Dashboard</h1>
      <p>Account & Progress Overview</p>
    </div>

    <!-- USER PROFILE CARD -->
    <div class="card">
      <h2><i class="bi bi-person-circle"></i> Profile</h2>
      <div class="stats">
        <div class="stat">
          <i class="bi bi-person"></i>
          <span>{{ userStore.user?.username || "—" }}</span>
          <p>Username</p>
        </div>
        <div class="stat">
          <i class="bi bi-bar-chart"></i>
          <span>{{ userStore.profile?.level || "—" }}</span>
          <p>Level</p>
        </div>
        <div class="stat">
          <i class="bi bi-calendar"></i>
          <span>{{ userStore.profile?.age || "—" }}</span>
          <p>Age</p>
        </div>
      </div>

      <div class="minutes">
        <input v-model="ageInput" type="number" placeholder="Set your age" />
        <button class="secondary" @click="userStore.updateProfile({ age: Number(ageInput) })">
          <i class="bi bi-save"></i> Save Age
        </button>
      </div>

      <button class="danger" @click="confirmDelete">
        <i class="bi bi-trash"></i>
        Delete Account
      </button>
    </div>

    <!-- DAILY CHALLENGE -->
    <div class="card">
      <h2>
        <i class="bi bi-trophy"></i>
        Daily Challenge
      </h2>

      <select @change="dailyChallenge.setDifficulty($event.target.value)">
        <option v-for="level in levels" :key="level" :value="level">
          {{ level }}
        </option>
      </select>
    </div>

    <!-- STATS -->
    <div class="card">
      <h2>
        <i class="bi bi-graph-up"></i>
        Statistics
      </h2>

      <div class="stats">
        <div class="stat">
          <i class="bi bi-list-check"></i>
          <span>{{ statsStore.totalSessions }}</span>
          <p>Sessions</p>
        </div>

        <div class="stat">
          <i class="bi bi-clock-history"></i>
          <span>{{ statsStore.totalMinutes }}</span>
          <p>Minutes</p>
        </div>
      </div>

      <button class="primary" @click="statsStore.addSession">
        <i class="bi bi-plus-circle"></i>
        Add Session
      </button>

      <div class="minutes">
        <input v-model="minutesToAdd" type="number" placeholder="Minutes" />

        <button class="secondary" @click="statsStore.addMinutes(Number(minutesToAdd))">
          <i class="bi bi-plus"></i>
          Add Minutes
        </button>
      </div>
    </div>
    <button class="danger" @click="confirmReset">
      <i class="bi bi-arrow-counterclockwise"></i>
      Delete Stats
    </button>
    <FeedBack />
  </div>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* HEADER */
.header {
  text-align: center;
}

.header h1 {
  font-size: 2.4rem;
  font-weight: 800;
  color: #4f46e5;
}

.header p {
  color: #6b7280;
}

.icon {
  font-size: 2rem;
  color: #4f46e5;
  margin-bottom: 8px;
}

/* CARD */
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card h2 {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #111827;
}

/* INPUTS */
input,
select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  outline: none;
}

/* LOGIN */
.login-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* BUTTONS */
button {
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.primary {
  background: #4f46e5;
  color: white;
}

.secondary {
  background: #e5e7eb;
  color: #111827;
}

/* STATS */
.stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat i {
  font-size: 1.2rem;
  color: #4f46e5;
}

.stat span {
  font-size: 1.4rem;
  font-weight: bold;
}

/* MINUTES */
.minutes {
  display: flex;
  gap: 10px;
}

.danger {
  background: #ef4444;
  color: white;
}
</style>
