import { defineStore } from "pinia"

export const useAuth = defineStore("auth", {
  state: () => ({
    isLoggedIn: false
  }),

  actions: {
    checkCredentials(username, password) {
      if (username === "admin" && password === "1234") {
        this.isLoggedIn = true
        return true
      }
      return false
    },

    logout() {
      this.isLoggedIn = false
    }
  }
})
