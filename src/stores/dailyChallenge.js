import { defineStore } from "pinia"

export const useDailyChallengeStore = defineStore("dailyChallenge", {
  state: () => ({
    difficulty: "beginner",
    completedDate: null,
    challenges: {
      beginner: [
        {
          signName: "Hello",
          description: "Cum se face semnul Hello?",
          imageName: "Hello.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=fnFWAzd3Kfw"
        }
      ],
      intermediate: [
        {
          signName: "Please",
          description: "Cum se face semnul Please?",
          imageName: "Please.jpg",
          youtubeUrl: ""
        }
      ],
      difficult: [
        {
          signName: "Complex",
          description: "Semn complex",
          imageName: "Complex.jpg",
          youtubeUrl: ""
        }
      ]
    }
  }),

  getters: {
    todayChallenge(state) {
      const today = new Date().getDate()
      const list = state.challenges[state.difficulty]
      return list[today % list.length]
    },

    isCompletedToday(state) {
      const today = new Date().toDateString()
      return state.completedDate === today
    }
  },

  actions: {
    setDifficulty(level) {
      this.difficulty = level
      this.completedDate = null
    },

    markCompleted() {
      this.completedDate = new Date().toDateString()
    }
  }
})
