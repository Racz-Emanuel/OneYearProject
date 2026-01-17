<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import Sign from "@/components/Sign.vue"

const route = useRoute()

const showMainComponents = computed(() => {
  return (
    route.path == "/lessons" ||
    route.path == "/beginner" ||
    route.path == "/intermediate" ||
    route.path == "/difficult"
  )
})
</script>

<template>
  <div class="lessons-selector">
    <h2 class="selector-title">Selector de dificultate</h2>
  </div>

  <div class="level-block">
    <div class="levels-container">
      <router-link to="/beginner" class="level-card">Beginner</router-link>
      <router-link to="/intermediate" class="level-card">Intermediate</router-link>
      <router-link to="/difficult" class="level-card">Difficult</router-link>
    </div>
  </div>

  <div v-if="showMainComponents">
    <Sign />
  </div>

  <router-view />
</template>

<style scoped>
.lessons-selector {
  text-align: center;
  margin-bottom: 20px;
}

.selector-block {
  background-color: #4f46e5;
  text-align: center;
  padding: 20px 0;
  border-radius: 12px;
  margin-bottom: 20px;
}

.selector-title {
  display: inline-block;
  background-color: #4f46e5;
  color: white;
  padding: 15px 40px;
  border-radius: 12px;
  font-size: 24px;
  font-weight: bold;
}

.level-block {
  background-color: #e0e7ff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 30px;
}

.levels-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.level-card {
  padding: 15px 25px;
  background-color: #6366f1;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
}

.level-card:hover {
  background-color: #4f46e5;
  transform: scale(1.05);
}
</style>
