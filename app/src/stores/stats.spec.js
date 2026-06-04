import { describe, it, expect, beforeEach, vi } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useStatsStore } from "./stats"
import { useUserStore } from "./user"
import axios from "axios"

vi.mock("axios")
vi.mock("@/stores/user")

describe("Stats Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it("initializes with default values", () => {
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: 1 },
      profile: { sessions: 0, minutes: 0 }
    })
    const statsStore = useStatsStore()
    expect(statsStore.sessions).toBe(0)
    expect(statsStore.minutes).toBe(0)
  })

  it("computes totalSessions correctly", () => {
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: 1 },
      profile: { sessions: 5, minutes: 30 }
    })
    const statsStore = useStatsStore()
    expect(statsStore.totalSessions).toBe(5)
  })

  it("computes totalMinutes correctly", () => {
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: 1 },
      profile: { sessions: 5, minutes: 30 }
    })
    const statsStore = useStatsStore()
    expect(statsStore.totalMinutes).toBe(30)
  })

  it("adds a session and saves", async () => {
    const userStore = {
      user: { id: 1 },
      profile: { sessions: 5, minutes: 30 }
    }
    vi.mocked(useUserStore).mockReturnValue(userStore)
    axios.put.mockResolvedValue({
      data: {
        success: true,
        profile: { sessions: 6, minutes: 30 }
      }
    })
    localStorage.setItem("session", JSON.stringify({ profile: { sessions: 5, minutes: 30 } }))

    const statsStore = useStatsStore()
    await statsStore.addSession()

    expect(statsStore.sessions).toBe(6)
    expect(axios.put).toHaveBeenCalled()
  })

  it("adds minutes and saves", async () => {
    const userStore = {
      user: { id: 1 },
      profile: { sessions: 5, minutes: 30 }
    }
    vi.mocked(useUserStore).mockReturnValue(userStore)
    axios.put.mockResolvedValue({
      data: {
        success: true,
        profile: { sessions: 5, minutes: 45 }
      }
    })
    localStorage.setItem("session", JSON.stringify({ profile: { sessions: 5, minutes: 30 } }))

    const statsStore = useStatsStore()
    await statsStore.addMinutes(15)

    expect(statsStore.minutes).toBe(45)
    expect(axios.put).toHaveBeenCalled()
  })

  it("resets stats successfully", async () => {
    const userStore = {
      user: { id: 1 },
      profile: { sessions: 5, minutes: 30 }
    }
    vi.mocked(useUserStore).mockReturnValue(userStore)
    axios.delete.mockResolvedValue({
      data: {
        success: true,
        profile: { sessions: 0, minutes: 0 }
      }
    })
    localStorage.setItem("session", JSON.stringify({ profile: { sessions: 5, minutes: 30 } }))

    const statsStore = useStatsStore()
    await statsStore.resetStats()

    expect(statsStore.sessions).toBe(0)
    expect(statsStore.minutes).toBe(0)
    expect(axios.delete).toHaveBeenCalled()
  })

  it("does not save if user is not logged in", async () => {
    const userStore = {
      user: null,
      profile: { sessions: 0, minutes: 0 }
    }
    vi.mocked(useUserStore).mockReturnValue(userStore)

    const statsStore = useStatsStore()
    await statsStore.save()

    expect(axios.put).not.toHaveBeenCalled()
  })
})
