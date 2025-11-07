<!-- src/components/BootstrapIcon.vue -->
<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <i :class="`bi bi-${name}`"></i>
</template>