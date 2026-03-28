<script setup>
import AlphabetCard from '@/components/AlphabetCard.vue';

const letters =[
{letter:'Lectia 1: 0-10', youtubeUrl:'https://www.youtube.com/watch?v=R0usORpcyWE'},
{letter:'Lectia 2: 11-20', youtubeUrl:'https://www.youtube.com/watch?v=wNhJt_p3vrA'},
{letter:'Lectia 3: 21-100', youtubeUrl:'https://www.youtube.com/watch?v=2H3qXYvXRiU'}
]
</script>

<template>
  <div>
    <h1>Numerele in limbajul semnelor</h1>
    <AlphabetCard 
      v-for="l in letters" 
      :key="l.letter"
      :letter="l.letter"
      :youtubeUrl="l.youtubeUrl"
    />
  </div>
</template>