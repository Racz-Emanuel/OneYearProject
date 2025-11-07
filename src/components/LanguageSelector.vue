<script setup>
import { ref, onMounted } from 'vue'

const currentLang = ref('ro')
const emit = defineEmits(['changeLanguage'])

onMounted(() => {
  const saved = localStorage.getItem('appLanguage')
  if (saved && ['ro', 'en'].includes(saved)) {
    currentLang.value = saved
  }
})

const switchLanguage = () => {
  currentLang.value = currentLang.value === 'ro' ? 'en' : 'ro'
  localStorage.setItem('appLanguage', currentLang.value)
  emit('changeLanguage', currentLang.value)
}
</script>

<template>
  <button @click="switchLanguage">
    {{ currentLang === 'ro' ? 'EN' : 'RO' }}
  </button>
</template>