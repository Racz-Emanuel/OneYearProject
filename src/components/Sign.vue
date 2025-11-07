<script setup>
import SignImage from '@/components/SignImage.vue'

const signs = [
  {
    signName: 'Hello in sign language',
    description: 'Hello',
    imageName: 'Hello.jpg',
  
  },
]
</script>

<template>
  <div>
    <h2>Semne de baza</h2>
    <SignImage
      v-for="s in signs" 
      :key="s.signName"
      :signName="s.signName"
      :description="s.description"
      :imageUrl="s.imageUrl"
    
    />
  </div>
</template>