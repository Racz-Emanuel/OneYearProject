<script setup>
defineProps({
  signName: String,
  description: String,
  imageName: String
})
</script>

<template>
  <div>
    <h2>{{ signName }}</h2>
    <img :src="`/images/${imageName}`" :alt="signName" />
    <p>{{ description }}</p>
  </div>
</template>