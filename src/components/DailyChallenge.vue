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
    <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold text-green-700 mb-3">Provocarea Zilei</h2>
    <p class="text-gray-700">Învață semnul de astăzi!</p>
  </div>
    
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

