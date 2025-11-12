
<script setup>
import { ref } from 'vue'
import BootstrapIcon from '@/components/BootStrapIcons.vue'

const inputValue = ref('')
const achievements = ref([])

const checkAchievements = (total) => {
  const newAchievements = []
  if (total >= 5) newAchievements.push({ name: 'Inceaptor', icon: 'award' })
  if (total >= 10) newAchievements.push({ name: 'Intermediar', icon: 'star' })
  if (total >= 20) newAchievements.push({ name: 'Maestru', icon: 'gem' })
  achievements.value = newAchievements
}

const addLessons = () => {
  const num = parseInt(inputValue.value)
  if (!isNaN(num) && num > 0) {
    checkAchievements(num)
    inputValue.value = ''
  }
}
</script>

<template>
  <div>
    <h3>Insigne obținute</h3>

    
    <div>
      <input 
        v-model="inputValue" 
        type="number" 
        placeholder="Ce numar de lecti ai invatat" 
       
      />
      <button @click="addLessons">Verifică</button>
    </div>

    
    <div v-if="achievements.length === 0">
      <p>Introdu un număr pentru a vedea insignele!</p>
    </div>
    <div v-else v-for="a in achievements" :key="a.name">
      <p>
        <BootstrapIcon :name="a.icon" />
        <strong>{{ a.name }}</strong>
      </p>
    </div>
  </div>
</template>