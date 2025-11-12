<script setup>
import LanguageSelector from './LanguageSelector.vue'
import Navbar from './Navbar.vue'
const handleLanguageChange = (lang) => {
  console.log("Limba selectată:", lang)
}
</script>

<template>
  <header>
    <h1>EchoFree</h1>
    <h1 class="text-3xl font-bold text-blue-500">Hello Tailwind!</h1>

 
    <Navbar/>
      <LanguageSelector @changeLanguage="handleLanguageChange" />
    
  </header>
</template>