<script setup>
import { ref } from 'vue'

const searchTerm = ref('')
const emit = defineEmits(['search'])
</script>

<template>
  <input
    v-model="searchTerm"
    @input="emit('search', searchTerm)"
    type="text"
    placeholder="Cauta lectia"
  />
</template>