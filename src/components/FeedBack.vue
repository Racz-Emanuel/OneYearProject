<script setup>
import { ref } from 'vue'

const feedback = ref('')

const submit = () => {
  console.log('Feedback:', feedback.value)
  feedback.value = ''
  alert('Mulțumim pentru feedback!')
}
</script>

<template>
  <div>
    <h3>Spune-ne părerea ta</h3>
    <textarea v-model="feedback" placeholder="Cum ti se pare?"></textarea>
    <button @click="submit">Trimite</button>
  </div>
</template>