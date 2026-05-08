<script setup>
import { ref, onMounted } from "vue"

const quote = ref("")
const author = ref("")
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/quotes")
    if (!response.ok) throw new Error("Failed to fetch quotes")

    const quotes = await response.json()

    if (quotes.length === 0) {
      quote.value = "No quotes available."
      author.value = ""
      return
    }

    const randomIndex = Math.floor(Math.random() * quotes.length)
    quote.value = quotes[randomIndex].text
    author.value = quotes[randomIndex].author
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h3>Motivational Quote</h3>

    <p v-if="loading">Se încarcă...</p>
    <p v-else-if="error">Eroare: {{ error }}</p>

    <blockquote v-else>
      <p>
        <em>"{{ quote }}"</em>
      </p>
      <footer>{{ author }}</footer>
    </blockquote>
  </div>
</template>
