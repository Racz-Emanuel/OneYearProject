import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAchievementsStore = defineStore("achievements", () => {
  const totalLessons = ref(0)

  const achievements = computed(() => {
    const result = []

    if (totalLessons.value >= 5) result.push({ name: "Începător", icon: "award" })

    if (totalLessons.value >= 10) result.push({ name: "Intermediar", icon: "star" })

    if (totalLessons.value >= 20) result.push({ name: "Maestru", icon: "gem" })

    return result
  })

  const setLessons = num => {
    totalLessons.value = num
  }

  const reset = () => {
    totalLessons.value = 0
  }

  return {
    totalLessons,
    achievements,
    setLessons,
    reset
  }
})
