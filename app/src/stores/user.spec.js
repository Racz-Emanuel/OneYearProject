import { describe, it, expect, beforeEach, vi } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useUserStore } from "./user"
import api from "@/services/api"
import router from "@/router"

vi.mock("@/services/api")
vi.mock("@/router", () => ({
  default: {
    push: vi.fn()
  }
}))

describe("User Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it("initializes with default state", () => {
    const userStore = useUserStore()
    expect(userStore.user).toBeNull()
    expect(userStore.profile).toBeNull()
    expect(userStore.progress).toEqual([])
    expect(userStore.loggedIn).toBe(false)
  })

  it("computes isLoggedIn correctly", () => {
    const userStore = useUserStore()
    expect(userStore.isLoggedIn).toBe(false)
    userStore.loggedIn = true
    expect(userStore.isLoggedIn).toBe(true)
  })

  it("computes userName correctly", () => {
    const userStore = useUserStore()
    expect(userStore.userName).toBe("")
    userStore.user = { username: "testuser" }
    expect(userStore.userName).toBe("testuser")
  })

  it("successfully logs in with correct credentials", async () => {
    const userStore = useUserStore()
    api.post.mockResolvedValue({
      data: {
        success: true,
        user: { id: 1, username: "testuser" },
        profile: { id: 1, userId: 1 },
        progress: [],
        token: "test-token"
      }
    })

    await userStore.login("testuser", "password")

    expect(userStore.user).toEqual({ id: 1, username: "testuser" })
    expect(userStore.loggedIn).toBe(true)
    expect(localStorage.getItem("token")).toBe("test-token")
    expect(router.push).toHaveBeenCalledWith("/")
  })

  it("fails login with invalid credentials", async () => {
    const userStore = useUserStore()
    api.post.mockResolvedValue({
      data: {
        success: false,
        message: "Invalid credentials"
      }
    })

    await userStore.login("testuser", "wrong")

    expect(userStore.loggedIn).toBe(false)
  })

  it("handles login errors", async () => {
    const userStore = useUserStore()
    api.post.mockRejectedValue(new Error("Network error"))

    await userStore.login("testuser", "password")

    expect(userStore.loggedIn).toBe(false)
  })

  it("loads session from localStorage", () => {
    const userStore = useUserStore()
    const sessionData = {
      user: { id: 1, username: "testuser" },
      profile: { id: 1 },
      progress: []
    }
    localStorage.setItem("session", JSON.stringify(sessionData))

    userStore.loadSession()

    expect(userStore.user).toEqual(sessionData.user)
    expect(userStore.profile).toEqual(sessionData.profile)
    expect(userStore.progress).toEqual(sessionData.progress)
    expect(userStore.loggedIn).toBe(true)
  })

  it("logs out and clears session", () => {
    const userStore = useUserStore()
    userStore.user = { id: 1, username: "testuser" }
    userStore.loggedIn = true
    localStorage.setItem("session", JSON.stringify({ user: { id: 1 } }))
    localStorage.setItem("token", "test-token")

    userStore.logout()

    expect(userStore.user).toBeNull()
    expect(userStore.loggedIn).toBe(false)
    expect(localStorage.getItem("session")).toBeNull()
    expect(localStorage.getItem("token")).toBeNull()
    expect(router.push).toHaveBeenCalledWith("/login")
  })

  it("successfully registers new user", async () => {
    const userStore = useUserStore()
    api.post.mockResolvedValue({
      data: {
        success: true,
        user: { id: 1, username: "newuser" },
        profile: { id: 1 },
        progress: [],
        token: "test-token"
      }
    })

    await userStore.register("newuser", "password")

    expect(userStore.user).toEqual({ id: 1, username: "newuser" })
    expect(userStore.loggedIn).toBe(true)
    expect(localStorage.getItem("token")).toBe("test-token")
    expect(router.push).toHaveBeenCalledWith("/lessons")
  })

  it("fails registration with existing username", async () => {
    const userStore = useUserStore()
    api.post.mockResolvedValue({
      data: {
        success: false,
        message: "Username already taken"
      }
    })

    await userStore.register("existing", "password")

    expect(userStore.loggedIn).toBe(false)
  })

  it("updates profile successfully", async () => {
    const userStore = useUserStore()
    userStore.profile = { id: 1, name: "Old Name" }
    localStorage.setItem("session", JSON.stringify({ profile: { id: 1, name: "Old Name" } }))
    api.put.mockResolvedValue({
      data: {
        success: true,
        profile: { id: 1, name: "New Name" }
      }
    })

    await userStore.updateProfile({ name: "New Name" })

    expect(userStore.profile.name).toBe("New Name")
  })

  it("deletes account successfully", async () => {
    const userStore = useUserStore()
    userStore.user = { id: 1, username: "testuser" }
    userStore.loggedIn = true
    localStorage.setItem("session", JSON.stringify({ user: { id: 1 } }))
    localStorage.setItem("token", "test-token")
    api.delete.mockResolvedValue({
      data: {
        success: true
      }
    })

    await userStore.deleteAccount()

    expect(userStore.user).toBeNull()
    expect(userStore.loggedIn).toBe(false)
    expect(localStorage.getItem("session")).toBeNull()
    expect(localStorage.getItem("token")).toBeNull()
    expect(router.push).toHaveBeenCalledWith("/login")
  })
})
