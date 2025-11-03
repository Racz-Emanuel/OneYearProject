

<script>
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Header, Navbar, Footer }
}

import { onMounted, onUpdated } from 'vue'
onMounted(() => {
  console.log('App mounted')
})

onUpdated(() => {
  console.log('App updated')
})
</script>


<template>
  <Header />
  <br>
  <Navbar />
  <router-view />
  <br>
  <Footer />
</template>

