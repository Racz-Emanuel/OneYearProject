import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useStatsStore = defineStore("stats", () => {
  const sessions = ref(0)
  const minutes = ref(0)

  const totalSessions = computed(() => sessions.value)
  const totalMinutes = computed(() => minutes.value)

  const addSession = () => sessions.value++
  const addMinutes = m => (minutes.value += m)

  return { sessions, minutes, totalSessions, totalMinutes, addSession, addMinutes }
})
