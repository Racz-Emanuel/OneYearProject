<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import Acheivements from "@/components/Acheivements.vue"

const lessons = ref([])
const selected = ref(null)
const router = useRouter()

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/lessons?level=Beginner")
  lessons.value = res.data
})
function goToLesson(lesson) {
  router.push({
    path: `/lessons/beginner/${lesson.id}`,
    query: { title: lesson.title }
  })
}
</script>

<template>
  <div class="page">
    <h1>Beginner Lessons</h1>

    <div class="lessons-list">
      <button
        v-for="(lesson, i) in lessons"
        :key="lesson.id"
        class="lesson-btn"
        :class="{ active: selected === lesson.id }"
        @click="goToLesson(lesson)"
      >
        <div class="num">{{ String(i + 1).padStart(2, "0") }}</div>
        <div class="lesson-info">
          <span class="lesson-title">{{ lesson.title }}</span>
          <span class="lesson-level">{{ lesson.level }}</span>
        </div>
        <span class="arrow">›</span>
      </button>
    </div>

    <Acheivements />
  </div>
</template>

<style scoped>
.page {
  padding: 2rem;

  /* 🔥 CENTER EVERYTHING */
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

/* LIST WRAPPER */
.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  max-width: 480px; /* keeps nice card width */

  margin-bottom: 2rem;
}

/* BUTTON */
.lesson-btn {
  display: flex;
  align-items: center;
  gap: 16px;

  width: 100%; /* 🔥 full width inside container */
  padding: 16px 20px;

  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 14px;

  cursor: pointer;
  text-align: left;

  transition: all 0.15s;
}

.lesson-btn:hover,
.lesson-btn.active {
  background: #ede9fe;
  border-color: #4f46e5;
}

/* NUMBER */
.num {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #e0e7ff;
  color: #4f46e5;

  font-size: 13px;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
}

.lesson-btn:hover .num,
.lesson-btn.active .num {
  background: #4f46e5;
  color: #fff;
}

/* TEXT */
.lesson-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lesson-title {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}

.lesson-level {
  font-size: 12px;
  color: #9ca3af;
}

/* ARROW */
.arrow {
  margin-left: auto;
  color: #c4b5fd;
  font-size: 20px;
  transition: color 0.15s;
}

.lesson-btn:hover .arrow,
.lesson-btn.active .arrow {
  color: #4f46e5;
}
</style>
