<script setup>
import { ref, watch, onMounted } from "vue"

const feedback = ref("")

onMounted(() => {
  const draft = localStorage.getItem("feedbackDraft")
  if (draft) feedback.value = draft
})

watch(feedback, newVal => {
  localStorage.setItem("feedbackDraft", newVal)
})

const submit = () => {
  console.log("Feedback:", feedback.value)
  feedback.value = ""
  localStorage.removeItem("feedbackDraft")
  alert("Mulțumim pentru feedback!")
}
</script>

<template>
  <div>
    <h3>Spune-ne părerea ta</h3>
    <textarea v-model="feedback" placeholder="Cum ti se pare?"></textarea>
    <button @click="submit">Trimite</button>
  </div>
</template>
