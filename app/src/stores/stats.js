import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useUserStore } from "@/stores/user"
import axios from "axios"

export const useStatsStore = defineStore("stats", () => {
  const userStore = useUserStore()

  const sessions = ref(userStore.profile?.sessions || 0)
  const minutes = ref(userStore.profile?.minutes || 0)

  const totalSessions = computed(() => sessions.value)
  const totalMinutes = computed(() => minutes.value)

  const save = async () => {
    if (!userStore.user?.id) return
    const res = await axios.put(`http://localhost:3000/auth/profile/${userStore.user.id}`, {
      sessions: sessions.value,
      minutes: minutes.value
    })
    if (res.data.success) {
      userStore.profile = res.data.profile
     
      const session = JSON.parse(localStorage.getItem("session"))
      session.profile = res.data.profile
      localStorage.setItem("session", JSON.stringify(session))
    }
  }

  const addSession = async () => {
    sessions.value++
    await save()
  }

  const addMinutes = async m => {
    minutes.value += m
    await save()
  }
  const resetStats = async () => {
    if (!userStore.user?.id) return
    const res = await axios.delete(`http://localhost:3000/auth/profile/stats/${userStore.user.id}`)
    if (res.data.success) {
      sessions.value = 0
      minutes.value = 0
      userStore.profile = res.data.profile
      const session = JSON.parse(localStorage.getItem("session"))
      session.profile = res.data.profile
      localStorage.setItem("session", JSON.stringify(session))
    }
  }
  return { sessions, minutes, totalSessions, totalMinutes, addSession, addMinutes, resetStats }
})
