import { defineStore } from "pinia"

export const useDifficultyStore = defineStore("difficulty", {
  state: () => ({
    level: "beginner"
  }),
  actions: {
    setlevel(level) {
      this.level = level
    }
  }
})
