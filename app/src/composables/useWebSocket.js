import { ref, onMounted, onUnmounted } from "vue"
import { wsService } from "../ws-client"

export function useWebSocket() {
  const isConnected = ref(false)
  const lastMessage = ref(null)
  const error = ref(null)

  const connect = (url) => {
    wsService.connect(url)
  }

  const send = (data) => {
    wsService.send(data)
  }

  const disconnect = () => {
    wsService.disconnect()
  }

  onMounted(() => {
    const unsubscribe = wsService.onMessage((event) => {
      if (event.type === "connected") {
        isConnected.value = true
        error.value = null
      } else if (event.type === "disconnected") {
        isConnected.value = false
      } else if (event.type === "message") {
        lastMessage.value = event.data
      } else if (event.type === "error") {
        error.value = event.error
      }
    })

    onUnmounted(() => {
      unsubscribe()
    })
  })

  return {
    isConnected,
    lastMessage,
    error,
    connect,
    send,
    disconnect
  }
}
