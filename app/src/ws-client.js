class WebSocketService {
  constructor() {
    this.ws = null
    this.listeners = []
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 3000
  }

  connect(url = "ws://localhost:3001") {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return
    }

    this.ws = new WebSocket(url)

    this.ws.onopen = () => {
      console.log("WebSocket connected")
      this.reconnectAttempts = 0
      this.notifyListeners({ type: "connected" })
    }

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.notifyListeners({ type: "message", data })
      } catch {
        this.notifyListeners({ type: "message", data: event.data })
      }
    }

    this.ws.onclose = () => {
      console.log("WebSocket disconnected")
      this.notifyListeners({ type: "disconnected" })
      this.attemptReconnect(url)
    }

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      this.notifyListeners({ type: "error", error })
    }
  }

  attemptReconnect(url) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      setTimeout(() => this.connect(url), this.reconnectDelay)
    }
  }

  send(data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.warn("WebSocket is not connected")
    }
  }

  onMessage(callback) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback)
    }
  }

  notifyListeners(event) {
    this.listeners.forEach(callback => callback(event))
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const wsService = new WebSocketService()
