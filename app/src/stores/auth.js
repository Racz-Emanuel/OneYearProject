import router from "@/router"
import { defineStore } from "pinia"
import axios from "axios"

export const useAuth = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    token: null,
    refreshToken: null
  }),

  actions: {
    async checkCredentials(username, password) {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          username,
          password
        })

        if (response.data.success) {
          this.token = response.data.token
          this.refreshToken = response.data.refreshToken
          localStorage.setItem("token", this.token)
          localStorage.setItem("refreshToken", this.refreshToken)
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

    async refreshAccessToken() {
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
          this.logout()
          return false
        }

        const response = await axios.post("http://localhost:3000/auth/refresh", {
          refreshToken
        })

        if (response.data.success) {
          this.token = response.data.token
          localStorage.setItem("token", this.token)
          return true
        } else {
          this.logout()
          return false
        }
      } catch (error) {
        console.error("Token refresh error:", error)
        this.logout()
        return false
      }
    },

    async logout() {
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
          await axios.post("http://localhost:3000/auth/logout", {
            refreshToken
          })
        }
      } catch (error) {
        console.error("Logout error:", error)
      }

      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      this.token = null
      this.refreshToken = null
      this.isAuthenticated = false
      router.push("/login")
    },

    initializeAuth() {
      const token = localStorage.getItem("token")
      const refreshToken = localStorage.getItem("refreshToken")
      if (token && refreshToken) {
        this.token = token
        this.refreshToken = refreshToken
        this.isAuthenticated = true
      }
    }
  }
})
