import { describe, it, expect, beforeEach, vi } from "vitest"

vi.mock("axios", () => {
  const mockAxios = {
    create: vi.fn(() => ({
      interceptors: {
        request: {
          use: vi.fn((onFulfilled) => {
            // Store the interceptor so we can test it
            mockAxios._requestInterceptor = onFulfilled
          })
        }
      }
    }))
  }
  return { default: mockAxios }
})

describe("API Service", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it("creates axios instance with correct baseURL", async () => {
    const axios = await import("axios").then(m => m.default)
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "http://localhost:3000"
    })
  })

  it("adds Authorization header when token exists", async () => {
    localStorage.setItem("token", "test-token-123")

    await import("./api")
    const axios = await import("axios").then(m => m.default)

    const config = { headers: {} }
    const result = axios._requestInterceptor(config)

    expect(result.headers.Authorization).toBe("Bearer test-token-123")
  })

  it("does not add Authorization header when token missing", async () => {
    await import("./api")
    const axios = await import("axios").then(m => m.default)

    const config = { headers: {} }
    const result = axios._requestInterceptor(config)

    expect(result.headers.Authorization).toBeUndefined()
  })
})
