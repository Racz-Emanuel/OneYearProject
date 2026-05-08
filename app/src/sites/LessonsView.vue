<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const showMainComponents = computed(() => {
  return (
    route.path == "/lessons" ||
    route.path == "/lessons/beginner" ||
    route.path == "/lessons/intermediate" ||
    route.path == "/lessons/advanced"
  )
})
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <!-- TITLE -->
      <h1 class="title">Choose Your Level</h1>
      <p class="subtitle">Select a difficulty to start learning</p>

      <!-- BUTTONS -->
      <div class="levels">
        <router-link to="/lessons/beginner" class="level beginner"> Beginner </router-link>

        <router-link to="/lessons/intermediate" class="level intermediate">
          Intermediate
        </router-link>

        <router-link to="/lessons/advanced" class="level advanced"> Advanced </router-link>
      </div>
    </div>

    <router-view />
  </div>
</template>

<style scoped>
/* BACKGROUND */
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, #eef2ff, #e0e7ff);
  padding: 20px;
}

/* CARD */
.card {
  width: 100%;
  max-width: 420px;

  background: white;
  padding: 2.2rem;

  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);

  text-align: center;
}

/* TITLE */
.title {
  font-size: 28px;
  font-weight: 800;
  color: #4f46e5;
  margin-bottom: 6px;
}

/* SUBTITLE */
.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 20px;
}

/* BUTTON CONTAINER */
.levels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* BASE BUTTON */
.level {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 14px;

  border-radius: 12px;
  text-decoration: none;

  font-size: 16px;
  font-weight: 700;

  transition: 0.2s;
  border: 1px solid #e5e7eb;
}

/* COLORS */
.beginner {
  background: #ecfdf5;
  color: #059669;
}

.intermediate {
  background: #eff6ff;
  color: #2563eb;
}

.advanced {
  background: #fef2f2;
  color: #dc2626;
}

/* HOVER EFFECT */
.level:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

/* ACTIVE CLICK */
.level:active {
  transform: scale(0.98);
}
</style>
