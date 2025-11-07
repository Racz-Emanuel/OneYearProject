<script setup>
defineProps({
  letter: String,
  youtubeUrl: String
})
</script>

<template>
  <div>
    <h2>{{ letter }}</h2>
    <a :href="youtubeUrl" target="_blank">Video</a>
  </div>
</template>