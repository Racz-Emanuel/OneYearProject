<script setup>
import { ref } from "vue"
import { useAchievementsStore } from "@/stores/achievements"
import BootstrapIcon from "@/components/BootStrapIcons.vue"

const store = useAchievementsStore()
const inputValue = ref("")
</script>

<template>
  <div>
    <h3>Insigne obținute</h3>

    <input v-model="inputValue" type="number" placeholder="Ce număr de lecții ai învățat" />

    <button @click="store.setLessons(Number(inputValue))">Verifică</button>

    <button @click="store.reset">Reset</button>

    <div v-if="store.achievements.length === 0">
      <p>Nu ai încă insigne</p>
    </div>

    <div v-else v-for="a in store.achievements" :key="a.name">
      <p>
        <BootstrapIcon :name="a.icon" />
        <strong>{{ a.name }}</strong>
      </p>
    </div>
  </div>
</template>
