<script setup>
import AlphabetCard from '@/components/AlphabetCard.vue'


const letters = [
  { letter: 'Basic Signs1', youtubeUrl: 'https://www.youtube.com/watch?v=fnFWAzd3Kfw3' },
  { letter: 'Basic Signs2', youtubeUrl: 'https://www.youtube.com/watch?v=mLTOgT8He-0' }
]
  </script>

<template>
  <div>
    <h1>Alfabetul în limbajul semnelor</h1>
    <AlphabetCard 
      v-for="l in letters" 
      :key="l.letter"
      :letter="l.letter"
      :youtubeUrl="l.youtubeUrl"
    />
  </div>
</template>