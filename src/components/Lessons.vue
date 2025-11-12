<script setup>
import SearchBar from '@/components/SearchBar.vue'
import VideoCard from '@/components/VideoCard.vue'
import { ref } from 'vue'

const searchTerm = ref('')

const lessons = [
  { title: 'Lectia 1 semne pe care trb sa le cunosti ', youtubeUrl: 'https://www.youtube.com/watch?v=0FcwzMq4iWg&list=PLMN7QCuj6dfYD8DfG1rN6rEo1b1RyvgKF' },
  { title: 'Lectia 2 incepi limbajul semnelor', youtubeUrl: 'https://www.youtube.com/watch?v=6w1ZDaE-whc&list=PLMN7QCuj6dfYD8DfG1rN6rEo1b1RyvgKF&index=2' },
  { title: 'Lectia 3 literele din alfabet', youtubeUrl: 'https://www.youtube.com/watch?v=bFv_mLwBvHc&list=PLMN7QCuj6dfYD8DfG1rN6rEo1b1RyvgKF&index=3' }
]

const filteredLessons = () => {
  if (!searchTerm.value.trim()) return lessons
  return lessons.filter(l => 
    l.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
}
</script>

<template>
  <div>
    <h1>Toate lecțiile</h1>
    <SearchBar @search="(term) => searchTerm = term" />
    <div v-for="lesson in filteredLessons()" :key="lesson.title">
      <VideoCard 
        :title="lesson.title"
        :youtubeUrl="lesson.youtubeUrl"
      />
    </div>
  </div>
</template>