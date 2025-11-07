<script setup>
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Lessons from './components/Lessons.vue'
import Alphabet from './components/Alphabet.vue'
import Numbers from  './components/Numbers.vue'
import Sign from './components/Sign.vue'
import DailyChallange from './components/DailyChallange.vue'
import FeedBack from './components/FeedBack.vue'
import LearningTimer from './components/LearningTimer.vue'
import QuickTip from './components/QuickTip.vue'
</script>

<template>
  <Header />
  
  
  <main>
    <Lessons />
    <Alphabet/>
    <Numbers/>
    <Sign/>
    <DailyChallange/>
    <FeedBack/>
    <LearningTimer/>
    <QuickTip/>
  </main>
  
  <Footer />
</template>