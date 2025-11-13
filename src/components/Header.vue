<script setup>
import { ref } from 'vue'
import LanguageSelector from './LanguageSelector.vue'
import Navbar from './Navbar.vue'

const currentLang = ref('ro')

const handleLanguageChange = (lang) => {
  console.log("Limba selectată:", lang)
  currentLang.value = lang
}
</script>

<template>
  <header class="flex justify-between items-center p-4 border-b">
    <h1 class="text-3xl font-bold text-blue-500">
      {{ currentLang === 'ro' ? 'EchoFree' : 'EchoFree' }}
    </h1>

    <Navbar :lang="currentLang" />

    
    <LanguageSelector @changeLanguage="handleLanguageChange" />
  </header>
</template>

<style>
@import "tailwindcss";
</style>
