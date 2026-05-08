<script setup>
import AuthBox from "@/components/AuthBox.vue"
</script>

<template>
  <div class="login-wrapper">
    <AuthBox />
  </div>
</template>

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #eef2ff, #e0e7ff);
}
</style>
