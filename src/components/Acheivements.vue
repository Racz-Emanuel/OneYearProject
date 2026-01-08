<script setup>
import { computed, ref } from "vue"
import BootstrapIcon from "@/components/BootStrapIcons.vue"

const inputValue = ref("")
const achievements = computed(() => {
  const total = parseInt(inputValue.value)
  if (isNaN(total) || total <= 0) return []
  const result = []
  if (total >= 5) result.push({ name: "Inceaptor", icon: "award" })
  if (total >= 10) result.push({ name: "Intermediar", icon: "star" })
  if (total >= 20) result.push({ name: "Maestru", icon: "gem" })
  return result
})
</script>

<template>
  <div>
    <h3>Insigne obținute</h3>

    <div>
      <input v-model="inputValue" type="number" placeholder="Ce numar de lecti ai invatat" />
    </div>

    <div v-if="achievements.length === 0">
      <p>Introdu un număr pentru a vedea insignele!</p>
    </div>
    <div v-else v-for="a in achievements" :key="a.name">
      <p>
        <BootstrapIcon :name="a.icon" />
        <strong>{{ a.name }}</strong>
      </p>
    </div>
  </div>
</template>
