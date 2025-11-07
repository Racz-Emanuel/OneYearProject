<script setup>
import { ref, onMounted } from 'vue'
import BootstrapIcon from '@/components/BootStrapIcons.vue'

const achievements = ref([])

const checkAchievements = () => {
  const stats = JSON.parse(localStorage.getItem('learningStats') || '{}')
  const newAchievements = []

  if (stats.learned >= 5) {
    newAchievements.push({ name: 'Începător', icon: 'award' })
  }
  if (stats.learned >= 10) {
    newAchievements.push({ name: 'Învățător', icon: 'book' })
  }
  if (stats.learned >= 20) {
    newAchievements.push({ name: 'Maestru', icon: 'gem' })
  }

  achievements.value = newAchievements
}

onMounted(() => {
  checkAchievements()
  window.addEventListener('storage', checkAchievements)
})
</script>

<template>
  <div>
    <h3>Insigne obținute</h3>
    <div v-if="achievements.length === 0">
      <p>Începe să înveți semne pentru a debloca insigne!</p>
    </div>
    <div v-else v-for="a in achievements" :key="a.name">
      <p>
        <BootstrapIcon :name="a.icon" />
        <strong>{{ a.name }}</strong>
      </p>
    </div>
  </div>
</template>