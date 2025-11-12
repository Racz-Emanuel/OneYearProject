<script setup>
import {RouterLink} from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Acasă</RouterLink>|
    <RouterLink to="/lessons">Lecții</RouterLink>|
    <RouterLink to="/quiz">Teste</RouterLink>|
    <RouterLink to="/contact">Contact</RouterLink>|
    <RouterLink to="/despre">Despre</RouterLink>|
    <RouterLink to="/daily-challenge">Provocarea Zilei</RouterLink>

  </nav>
</template>

<style scoped>
</style>