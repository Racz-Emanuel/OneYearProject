<script setup>
import { ref, defineProps } from "vue"
import LanguageSelector from "./LanguageSelector.vue"
import Navbar from "./Navbar.vue"

const props = defineProps({
  onLogout: Function
})

const currentLang = ref("ro")

const handleLanguageChange = lang => {
  console.log("Limba selectată:", lang)
  currentLang.value = lang
}
</script>

<template>
  <header
    class="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-8 py-5 text-white"
  >
    <h1 class="text-3xl font-extrabold tracking-tight text-blue-500">EchoFree</h1>

    <Navbar :lang="currentLang" />

    <div class="flex items-center gap-4">
      <LanguageSelector @changeLanguage="handleLanguageChange" />

      <button
        class="rounded-lg border border-red-500 px-5 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
        @click="props.onLogout"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<style>
@import "tailwindcss";
</style>
