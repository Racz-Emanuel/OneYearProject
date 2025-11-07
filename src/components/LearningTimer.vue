<!-- src/components/LearningTimer.vue -->
<script setup>
import { ref } from 'vue'

const startTime = ref(null)
const endTime = ref(null)
const isLearning = ref(false)
const duration = ref(0)

const startLearning = () => {
  startTime.value = Date.now()
  endTime.value = null
  duration.value = 0
  isLearning.value = true
}

const stopLearning = () => {
  if (!isLearning.value) return
  endTime.value = Date.now()
  isLearning.value = false
  duration.value = Math.round((endTime.value - startTime.value) / 1000) // în secunde
}
</script>

<template>
  <div>
    <h3>Timer pentru învățarea unui semn</h3>
    
    <p v-if="isLearning">
      Înveți acum (a început la {{ new Date(startTime).toLocaleTimeString() }})
    </p>
    
    <p v-else-if="duration > 0">
      Ai învățat semnul în <strong>{{ duration }} secunde</strong>!
    </p>
    
    <p v-else>
      Apasă "Start" când începi să înveți un semn.
    </p>
    
    <button @click="startLearning" :disabled="isLearning">
      Start
    </button>
    
    <button @click="stopLearning" :disabled="!isLearning">
      Stop
    </button>
  </div>
</template>