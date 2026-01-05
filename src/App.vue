<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
   <div class="min-h-screen flex flex-col bg-gray-400 ">
  <Header />
  <main class="flex-1 p-6">
    <router-view />
  </main>
  <Footer />
  </div>
</template>