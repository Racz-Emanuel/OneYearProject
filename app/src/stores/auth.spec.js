import { describe, it, expect, beforeEach, vi } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useAuth } from "./auth"
import axios from "axios"
import router from "@/router"

vi.mock("axios")
vi.mock("@/router", () => ({
  default: {
    push: vi.fn()
  }
}))

describe("Auth Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it("initializes with isAuthenticated as false", () => {
    const auth = useAuth()
    expect(auth.isAuthenticated).toBe(false)
  })

  it("successfully logs in with correct credentials", async () => {
    const auth = useAuth()
    axios.post.mockResolvedValue({
      data: {
        success: true,
        token: "test-token-123"
      }
    })

    await auth.checkCredentials("user", "password")

    expect(auth.isAuthenticated).toBe(true)
    expect(localStorage.getItem("token")).toBe("test-token-123")
    expect(router.push).toHaveBeenCalledWith("/")
  })

  it("fails login with incorrect credentials", async () => {
    const auth = useAuth()
    axios.post.mockResolvedValue({
      data: {
        success: false
      }
    })

    await auth.checkCredentials("user", "wrong")

    expect(auth.isAuthenticated).toBe(false)
    expect(localStorage.getItem("token")).toBeNull()
  })

  it("handles login errors", async () => {
    const auth = useAuth()
    axios.post.mockRejectedValue(new Error("Network error"))

    const result = await auth.checkCredentials("user", "pass")

    expect(auth.isAuthenticated).toBe(false)
    expect(result).toBe("Please try again")
  })

  it("clears token and redirects on logout", () => {
    const auth = useAuth()
    localStorage.setItem("token", "test-token")
    localStorage.setItem("refreshToken", "refresh-token")
    auth.isAuthenticated = true

    auth.logout()

    expect(auth.isAuthenticated).toBe(false)
    expect(localStorage.getItem("token")).toBeNull()
    expect(localStorage.getItem("refreshToken")).toBeNull()
    expect(router.push).toHaveBeenCalledWith("/login")
  })

  it("successfully refreshes access token", async () => {
    const auth = useAuth()
    localStorage.setItem("refreshToken", "valid-refresh-token")
    axios.post.mockResolvedValue({
      data: {
        success: true,
        token: "new-access-token"
      }
    })

    const result = await auth.refreshAccessToken()

    expect(result).toBe(true)
    expect(localStorage.getItem("token")).toBe("new-access-token")
  })

  it("fails to refresh with invalid refresh token", async () => {
    const auth = useAuth()
    localStorage.setItem("refreshToken", "invalid-token")
    axios.post.mockResolvedValue({
      data: {
        success: false
      }
    })

    const result = await auth.refreshAccessToken()

    expect(result).toBe(false)
    expect(localStorage.getItem("token")).toBeNull()
  })

  it("handles refresh token errors", async () => {
    const auth = useAuth()
    localStorage.setItem("refreshToken", "test-token")
    axios.post.mockRejectedValue(new Error("Network error"))

    const result = await auth.refreshAccessToken()

    expect(result).toBe(false)
  })

  it("initializes auth from localStorage", () => {
    const auth = useAuth()
    localStorage.setItem("token", "stored-token")
    localStorage.setItem("refreshToken", "stored-refresh-token")

    auth.initializeAuth()

    expect(auth.token).toBe("stored-token")
    expect(auth.refreshToken).toBe("stored-refresh-token")
    expect(auth.isAuthenticated).toBe(true)
  })

  it("does not initialize auth without tokens", () => {
    const auth = useAuth()

    auth.initializeAuth()

    expect(auth.token).toBeNull()
    expect(auth.refreshToken).toBeNull()
    expect(auth.isAuthenticated).toBe(false)
  })
})
