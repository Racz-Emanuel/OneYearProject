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
  <header class="flex items-center justify-between border-b bg-gray-900 p-4 text-white">
    <h1 class="text-3xl font-bold text-blue-500">
      {{ currentLang === "ro" ? "EchoFree" : "EchoFree" }}
    </h1>

    <Navbar :lang="currentLang" />

    <div class="flex items-center gap-4">
      <LanguageSelector @changeLanguage="handleLanguageChange" />

      <!-- Buton logout -->
      <button
        class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
