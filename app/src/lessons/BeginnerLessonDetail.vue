<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import axios from "axios"

const route = useRoute()
const router = useRouter()
const signs = ref([])
const loading = ref(true)
const lessonTitle = route.query.title

onMounted(async () => {
  const lessonId = route.params.id

  const res = await axios.get(`http://localhost:3000/signs/lesson/${lessonId}`)
  signs.value = res.data
  loading.value = false
})
</script>

<template>
  <div class="page">
    <button class="back-btn" @click="router.push('/lessons/beginner')">
      ← Back to Beginner Lessons
    </button>

    <h1>{{ lessonTitle }}</h1>

    <div v-if="loading">Loading signs...</div>

    <div v-else class="signs-list">
      <div v-for="sign in signs" :key="sign.id" class="sign-card">
        <img :src="sign.imageUrl" class="sign-image" />
        <p class="sign-label">{{ sign.label }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* GRID OF SIGNS */
.signs-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;

  width: 100%;
  max-width: 900px;
}

/* SIGN CARD */
.sign-card {
  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 14px;

  padding: 16px;
  text-align: center;

  transition: all 0.15s;
  cursor: pointer;
}

.sign-card:hover {
  background: #ede9fe;
  border-color: #4f46e5;
}

/* SIGN IMAGE */
.sign-image {
  width: 100%;
  height: 140px;
  object-fit: cover;

  border-radius: 10px;
  margin-bottom: 10px;
}

/* SIGN LABEL */
.sign-label {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}
.back-btn {
  align-self: flex-start;

  background: #f3f4f6;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;

  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  color: #4f46e5;

  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: 1rem;
}

.back-btn:hover {
  background: #ede9fe;
  border-color: #4f46e5;
}
</style>
