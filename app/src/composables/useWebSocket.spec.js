import { describe, it, expect, beforeEach, vi } from "vitest"
import { useWebSocket } from "./useWebSocket"
import { wsService } from "../ws-client"

vi.mock("../ws-client")

describe("useWebSocket Composable", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(wsService).onMessage = vi.fn(() => {
      return () => {}
    })
  })

  it("initializes with default state", () => {
    const { isConnected, lastMessage, error } = useWebSocket()
    expect(isConnected.value).toBe(false)
    expect(lastMessage.value).toBeNull()
    expect(error.value).toBeNull()
  })

  it("calls wsService.connect when connect is called", () => {
    const { connect } = useWebSocket()
    vi.mocked(wsService).connect = vi.fn()
    
    connect("ws://localhost:3001")
    
    expect(wsService.connect).toHaveBeenCalledWith("ws://localhost:3001")
  })

  it("calls wsService.send when send is called", () => {
    const { send } = useWebSocket()
    vi.mocked(wsService).send = vi.fn()
    
    const testData = { type: "test", data: "hello" }
    send(testData)
    
    expect(wsService.send).toHaveBeenCalledWith(testData)
  })

  it("calls wsService.disconnect when disconnect is called", () => {
    const { disconnect } = useWebSocket()
    vi.mocked(wsService).disconnect = vi.fn()
    
    disconnect()
    
    expect(wsService.disconnect).toHaveBeenCalled()
  })

  it("updates isConnected on connection event", () => {
    vi.mocked(wsService).onMessage = vi.fn((callback) => {
      callback({ type: "connected" })
      return () => {}
    })
    
    const { isConnected } = useWebSocket()
    expect(isConnected.value).toBe(true)
  })

  it("updates isConnected on disconnection event", () => {
    vi.mocked(wsService).onMessage = vi.fn((callback) => {
      callback({ type: "disconnected" })
      return () => {}
    })
    
    const { isConnected } = useWebSocket()
    expect(isConnected.value).toBe(false)
  })

  it("updates lastMessage on message event", () => {
    const testData = { type: "message", data: "test message" }
    vi.mocked(wsService).onMessage = vi.fn((callback) => {
      callback(testData)
      return () => {}
    })
    
    const { lastMessage } = useWebSocket()
    expect(lastMessage.value).toBe("test message")
  })

  it("updates error on error event", () => {
    const testError = new Error("Connection failed")
    vi.mocked(wsService).onMessage = vi.fn((callback) => {
      callback({ type: "error", error: testError })
      return () => {}
    })
    
    const { error } = useWebSocket()
    expect(error.value).toBe(testError)
  })
})
