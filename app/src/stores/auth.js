import router from "@/router"
import { defineStore } from "pinia"
import axios from "axios"

export const useAuth = defineStore("auth", {
  state: () => ({
    isAuthenticated: false
  }),

  actions: {
    async checkCredentials(username, password) {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          username,
          password
        })

        if (response.data.success) {
          this.isAuthenticated = true
          router.push("/")
        } else {
          this.isAuthenticated = false
        }
      } catch (error) {
        console.error("Login error:", error)
        this.isAuthenticated = false
        return "Please try again"
      }
    },

    logout() {
      this.isAuthenticated = false
      router.push("/login")
    }
  }
})
