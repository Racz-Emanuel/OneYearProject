import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", () => {
  const name = ref("")
  const loggedIn = ref(false)

  const isLoggedIn = computed(() => loggedIn.value)
          const userName = computed(() => name.value)

  const login = username => {
    name.value = username
    loggedIn.value = true
  }

  const logout = () => {
    name.value = ""
    loggedIn.value = false
  }

  return { name, loggedIn, isLoggedIn, userName, login, logout }
})
