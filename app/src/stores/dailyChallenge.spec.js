import { describe, it, expect, beforeEach } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useDailyChallengeStore } from "./dailyChallenge"

describe("Daily Challenge Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("initializes with default state", () => {
    const store = useDailyChallengeStore()
    expect(store.difficulty).toBe("beginner")
    expect(store.completedDate).toBeNull()
    expect(store.challenges.beginner).toHaveLength(1)
    expect(store.challenges.intermediate).toHaveLength(1)
    expect(store.challenges.difficult).toHaveLength(1)
  })

  it("returns today's challenge based on difficulty", () => {
    const store = useDailyChallengeStore()
    const challenge = store.todayChallenge
    expect(challenge).toHaveProperty("signName")
    expect(challenge).toHaveProperty("description")
    expect(challenge).toHaveProperty("imageName")
  })

  it("changes difficulty and resets completion", () => {
    const store = useDailyChallengeStore()
    store.completedDate = new Date().toDateString()
    
    store.setDifficulty("intermediate")
    
    expect(store.difficulty).toBe("intermediate")
    expect(store.completedDate).toBeNull()
  })

  it("marks challenge as completed for today", () => {
    const store = useDailyChallengeStore()
    const today = new Date().toDateString()
    
    store.markCompleted()
    
    expect(store.completedDate).toBe(today)
  })

  it("checks if challenge is completed today", () => {
    const store = useDailyChallengeStore()
    const today = new Date().toDateString()
    
    expect(store.isCompletedToday).toBe(false)
    
    store.completedDate = today
    expect(store.isCompletedToday).toBe(true)
  })

  it("returns false for completion on different date", () => {
    const store = useDailyChallengeStore()
    store.completedDate = "2024-01-01"
    
    expect(store.isCompletedToday).toBe(false)
  })
})
