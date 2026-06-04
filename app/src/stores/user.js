import { ref, computed } from "vue"
import { defineStore } from "pinia"
import api from "@/services/api.js" // Switch from raw axios to intercepted api instance
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
      const res = await api.post("/auth/login", { username, password })
      console.log("LOGIN RESPONSE:", res.data)

      if (res.data.success) {
        user.value = res.data.user
        profile.value = res.data.profile
        progress.value = res.data.progress
        loggedIn.value = true

        // This now securely saves the freshly signed JWT token inside the storage string
        localStorage.setItem("session", JSON.stringify(res.data))
        localStorage.setItem("token", res.data.token) // ✅ add this
        router.push("/")
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
    localStorage.removeItem("token")
    router.push("/login")
  }

  const register = async (username, password) => {
    try {
      const res = await api.post("/auth/register", { username, password })
      console.log("REGISTER RESPONSE:", res.data)

      if (res.data.success) {
        user.value = res.data.user
        profile.value = res.data.profile || null
        progress.value = res.data.progress || []
        loggedIn.value = true

        localStorage.setItem("session", JSON.stringify(res.data))
        localStorage.setItem("token", res.data.token) // ✅ add this
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
      const res = await api.put("/auth/profile/update", data)
      if (res.data.success) {
        profile.value = res.data.profile
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
      const res = await api.delete("/auth/delete")
      if (res.data.success) {
        user.value = null
        profile.value = null
        progress.value = []
        loggedIn.value = false
        localStorage.removeItem("session")
        localStorage.removeItem("token") // ✅ add this
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
