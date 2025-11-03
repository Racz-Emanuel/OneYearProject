<script setup>
import LanguageSelector from './LanguageSelector.vue'

const handleLanguageChange = (lang) => {
  console.log("Limba selectată:", lang)
}
</script>

<template>
  <header>
    <h1>EchoFree</h1>
    <LanguageSelector @changeLanguage="handleLanguageChange" />
  </header>
</template>

<style scoped>
</style>