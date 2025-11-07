<!-- src/components/DailyChallenge.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import SignImage from '@/components/SignImage.vue'
import VideoCard from '@/components/VideoCard.vue'

const todaySign = ref(null)

const beginnerSigns = [
  {
    signName: 'Hello',
    description: 'Cum se face semnul Hello?',
    imageName: 'Hello.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=fnFWAzd3Kfw'
  }
]

onMounted(() => {
  const today = new Date().getDate()
  todaySign.value = beginnerSigns[today % beginnerSigns.length]
})
</script>

<template>
  <div>
    <h2>Provocarea zilei</h2>
    
    <p><strong>Învață semnul de astăzi:</strong></p>
    
    <SignImage 
      v-if="todaySign"
      :signName="todaySign.signName"
      :description="todaySign.description"
      :imageName="todaySign.imageName"
    />
    
    <VideoCard 
      v-if="todaySign"
      :title="todaySign.signName"
      :youtubeUrl="todaySign.youtubeUrl"
    />
  </div>
</template>