<script setup>
import LanguageSelector from './LanguageSelector.vue'

const handleLanguageChange = (lang) => {
  console.log("Limba selectată:", lang)
}
</script>

<template>
  <header>
    <h1>EchoFree</h1>
    <div>
      <router-link to="/">Acasă</router-link>
      <router-link to="/lessons">Lecții</router-link>
      <router-link to="/quiz">Teste</router-link>
      <router-link to="/contact">Contact</router-link>
      <LanguageSelector @changeLanguage="handleLanguageChange" />
    </div>
  </header>
</template>