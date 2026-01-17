<script setup>
import FeedBack from "@/components/FeedBack.vue"
import { useUserStore } from "@/stores/user.js"
import { useStatsStore } from "@/stores/stats.js"
import { ref } from "vue"
import { useDailyChallengeStore } from "@/stores/dailyChallenge"

const userStore = useUserStore()
const statsStore = useStatsStore()
const dailyChallenge = useDailyChallengeStore()

const levels = ["beginner", "intermediate", "difficult"]

const loginName = ref("")
const minutesToAdd = ref(0)
</script>

<template>
  <div>
    <h2>Selectează dificultatea provocărilor</h2>

    <select @change="dailyChallenge.setDifficulty($event.target.value)">
      <option v-for="level in levels" :key="level" :value="level">
        {{ level }}
      </option>
    </select>
  </div>

  <div>
    <h2>Despre</h2>
    <p>Site-ul încă se construiește, vă rog aveți răbdare</p>

    <p v-if="userStore.isLoggedIn">Bine ai venit, {{ userStore.userName }}!</p>
    <p v-else>Nu ești logat</p>

    <div>
      <input v-model="loginName" placeholder="Nume utilizator" />
      <button @click="userStore.login(loginName.value)">Login</button>
      <button @click="userStore.logout">Logout</button>
    </div>

    <div>
      <h2>Statistici utilizator</h2>

      <p>Total sesiuni: {{ statsStore.totalSessions }}</p>
      <p>Total minute: {{ statsStore.totalMinutes }}</p>

      <button @click="statsStore.addSession">Adaugă o sesiune</button>

      <div>
        <input v-model="minutesToAdd" type="number" placeholder="Minute de adăugat" />
        <button @click="statsStore.addMinutes(Number(minutesToAdd.value))">Adaugă minute</button>
      </div>
    </div>

    <FeedBack />
  </div>
</template>
