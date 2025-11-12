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
 
    <Navbar/>
      <LanguageSelector @changeLanguage="handleLanguageChange" />
    
  </header>
</template>