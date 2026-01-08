<script setup>
import Alphabet from "@/components/Alphabet.vue"
import Acheivements from "@/components/Acheivements.vue"
</script>

<template>
  <div class="beginner-lessons">
    <h1>Beginner Lessons</h1>
  </div>

  <div>
    <Alphabet />
    <Acheivements />
  </div>
</template>

<style scoped>
.beginner-lessons {
  padding: 20px;
  color: #4f46e5;
  font-weight: bold;
  font-size: 32px;
}
</style>
