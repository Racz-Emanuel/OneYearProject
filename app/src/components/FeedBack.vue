<script setup>
import { ref, watch, onMounted } from "vue"
import axios from "axios"
const feedback = ref("")

onMounted(() => {
  const draft = localStorage.getItem("feedbackDraft")
  if (draft) feedback.value = draft
})

watch(feedback, newVal => {
  localStorage.setItem("feedbackDraft", newVal)
})

const submit = async () => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    alert("You must be logged in")
    return
  }

  await axios.post("http://localhost:3000/feedback", {
    userId: user.id,
    message: feedback.value
  })

  feedback.value = ""
  alert("Thank you for feedback!")
}
</script>

<template>
  <div
    class="mx-auto mt-10 w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
  >
    <!-- TITLE -->
    <h3 class="mb-2 text-lg font-bold text-indigo-600">💬 Spune-ne părerea ta</h3>

    <p class="mb-4 text-sm text-gray-500">Feedback-ul tău ne ajută să îmbunătățim platforma</p>

    <!-- TEXTAREA -->
    <textarea
      v-model="feedback"
      placeholder="Cum ți se pare?"
      class="h-28 w-full resize-none rounded-xl border border-gray-300 p-3 text-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    ></textarea>

    <!-- BUTTON -->
    <button
      @click="submit"
      class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
    >
      Trimite
    </button>
  </div>
</template>
