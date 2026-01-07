<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import Lessons from "@/components/Lessons.vue"
import Acheivements from "@/components/Acheivements.vue"
import Numbers from "@/components/Numbers.vue"
import Sign from "@/components/Sign.vue"

const route = useRoute()
const showMainCompnents = computed(() => route.path == "/lessons")
</script>

<template>
  <div class="lessons-selector">
    <h2>Selector de dificultate</h2>
    <div class="levels">
      <router-link to="/lessons/beginner" class="level-card">Beginner</router-link>
      <router-link to="/lessons/intermediate" class="level-card">Intermediate</router-link>
      <router-link to="/lessons/difficult" class="level-card">Difficult</router-link>
    </div>

    <div v-if="showMainCompnents">
      <Sign />
      <Lessons />
      <Numbers />
      <Acheivements />
    </div>
    <router-view />
  </div>
</template>
