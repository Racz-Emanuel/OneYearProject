<script setup>
import { ref } from "vue"
import { useAchievementsStore } from "@/stores/achievements"

const store = useAchievementsStore()
const inputValue = ref("")
</script>

<template>
  <div class="ach-wrap">
    <h3 class="ach-title">Insigne obținute</h3>

    <div class="ach-input-row">
      <input
        v-model="inputValue"
        type="number"
        class="ach-input"
        placeholder="Câte lecții ai învățat?"
      />
      <button class="btn-check" @click="store.setLessons(Number(inputValue))">Verifică</button>
      <button class="btn-reset" @click="store.reset">Reset</button>
    </div>

    <div v-if="store.achievements.length === 0" class="empty-state">
      <i class="bi bi-award"></i>
      <p>Nu ai încă insigne</p>
    </div>

    <div v-else class="badges-list">
      <div v-for="a in store.achievements" :key="a.name" class="badge-card">
        <i :class="`bi bi-${a.icon}`"></i>
        <strong>{{ a.name }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ach-wrap {
  max-width: 420px;
  padding: 1.5rem 0;
}

.ach-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #4f46e5;
  margin: 0 0 1.2rem;
}

.ach-input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
}

.ach-input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1.5px solid #e5e7eb;
  background: #f9fafb;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}

.ach-input:focus {
  border-color: #4f46e5;
  background: #fff;
}

.btn-check {
  padding: 10px 18px;
  border-radius: 10px;
  background: #4f46e5;
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-check:hover {
  background: #4338ca;
}

.btn-reset {
  padding: 10px 14px;
  border-radius: 10px;
  background: #f3f4f6;
  color: #6b7280;
  border: 1.5px solid #e5e7eb;
  font-size: 13px;
  cursor: pointer;
}

.btn-reset:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #ef4444;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 14px;
  border: 1.5px dashed #e5e7eb;
  color: #9ca3af;
}

.empty-state i {
  font-size: 2rem;
  display: block;
  margin-bottom: 8px;
}

.empty-state p {
  margin: 0;
  font-size: 13px;
}

.badges-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.badge-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  background: #ede9fe;
  border: 1.5px solid #a5b4fc;
  color: #3730a3;
}

.badge-card i {
  font-size: 1.3rem;
  color: #4f46e5;
}
</style>
