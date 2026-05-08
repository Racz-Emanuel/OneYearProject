import { ref, computed } from "vue"
import { defineStore } from "pinia"
import axios from "axios"
import router from "@/router"

export const useUserStore = defineStore("user", () => {
  const user = ref(null)
  const profile = ref(null)
  const progress = ref([])
  const loggedIn = ref(false)

  const isLoggedIn = computed(() => loggedIn.value)
  const userName = computed(() => user.value?.username || "")
  const login = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        username,
        password
      })

      console.log("LOGIN RESPONSE:", res.data)

      if (res.data.success) {
        user.value = res.data.user
        profile.value = res.data.profile
        progress.value = res.data.progress
        loggedIn.value = true

        localStorage.setItem("session", JSON.stringify(res.data))

        router.push("/lessons")
      } else {
        alert(res.data.message || "Invalid credentials")
      }
    } catch (err) {
      console.log("Login error:", err)
      alert("Server error")
    }
  }

  const loadSession = () => {
    const saved = localStorage.getItem("session")

    if (saved) {
      const data = JSON.parse(saved)

      user.value = data.user
      profile.value = data.profile
      progress.value = data.progress
      loggedIn.value = true
    }
  }

  const logout = () => {
    user.value = null
    profile.value = null
    progress.value = []
    loggedIn.value = false
    localStorage.removeItem("session")
    router.push("/login") // ✅ was "/"
  }

  const register = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        username,
        password
      })

      console.log("REGISTER RESPONSE:", res.data)

      if (res.data.success) {
        user.value = res.data.user
        profile.value = res.data.profile || null
        progress.value = res.data.progress || []
        loggedIn.value = true

        localStorage.setItem("session", JSON.stringify(res.data))

        router.push("/lessons")
      } else {
        alert(res.data.message || "Register failed")
      }
    } catch (err) {
      console.log("Register error:", err)
      alert("Server error")
    }
  }
  const updateProfile = async data => {
    try {
      const res = await axios.put(`http://localhost:3000/auth/profile/${user.value.id}`, data)
      if (res.data.success) {
        profile.value = res.data.profile
        // update session in localStorage
        const session = JSON.parse(localStorage.getItem("session"))
        session.profile = res.data.profile
        localStorage.setItem("session", JSON.stringify(session))
      }
    } catch (err) {
      console.log("Update profile error:", err)
    }
  }
  const deleteAccount = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/auth/delete/${user.value.id}`)
      if (res.data.success) {
        user.value = null
        profile.value = null
        progress.value = []
        loggedIn.value = false
        localStorage.removeItem("session")
        router.push("/login")
      } else {
        alert(res.data.message || "Could not delete account")
      }
    } catch (err) {
      console.log("DELETE ERROR:", err)
      alert("Server error")
    }
  }

  return {
    user,
    profile,
    progress,
    loggedIn,
    isLoggedIn,
    userName,
    login,
    register,
    logout,
    loadSession,
    updateProfile,
    deleteAccount
  }
})
