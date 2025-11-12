<script setup>
import { ref, onMounted } from 'vue'

const quote = ref('')
const author = ref('')

const quotes = [
  { text: 'Fiecare semn învățat este o punte către o conversație nouă.', author: 'EchoFree' },
  { text: 'Limbajul semnelor nu vorbește doar cu mâinile, ci și cu inima.', author: 'Anonim' },
  { text: 'Învățarea unui semn durează o clipă. Impactul lui durează o viață.', author: 'EchoFree' },
  { text: 'Nu ești niciodată prea bătrân să înveți un semn nou.', author: 'Proverb' },
  { text: 'Un semn mic poate deschide o lume mare.', author: 'EchoFree' }
]

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  quote.value = quotes[randomIndex].text
  author.value = quotes[randomIndex].author
})
</script>

<template>
  <div>
    <h3>Citat motivațional</h3>
    <blockquote>
      <p><em>"{{ quote }}"</em></p>
      <footer>— {{ author }}</footer>
    </blockquote>
  </div>
</template>