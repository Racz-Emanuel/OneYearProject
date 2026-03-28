<script setup>
import { ref, onMounted } from 'vue'

const tip = ref('')
const tips = [
 'Exerseaza in fata oglinzi',
 'Ai grija cum ti mana',
 'Fa expresile in timp ce vorbesti cu cineva'
]

onMounted(() => {
  tip.value = tips[Math.floor(Math.random() * tips.length)]
})
</script>

<template>
  <div>
    <h3>Sfat rapid</h3>
    <p><em>"{{ tip }}"</em></p>
  </div>
</template>