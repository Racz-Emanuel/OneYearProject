<script setup>
import AlphabetCard from '@/components/AlphabetCard.vue'


const letters = [
  { letter: 'Lectia1', youtubeUrl: 'https://www.youtube.com/watch?v=fnFWAzd3Kfw3' },
  { letter: 'Lectia2', youtubeUrl: 'https://www.youtube.com/watch?v=mLTOgT8He-0' }
]
  </script>

<template>
  <div>
    <h2>Nivel incepator semne basic</h2>
    <AlphabetCard 
      v-for="l in letters" 
      :key="l.letter"
      :letter="l.letter"
      :youtubeUrl="l.youtubeUrl"
    />
  </div>
</template>