<script setup>
import Quote from '@/components/Quote.vue';
import logo from '@/assets/asl.jpg'
import image from '@/assets/asi.jpg'

</script>

<template>
  <div class = "header">
    <img :src="logo" alt="logo" class="logo"/>
    <img :src="image" alt="image" class="image"/>
 <h2>Bine ai venit</h2>
    <Quote />



  </div>
</template>

<style scoped>
.header{
position: relative;
}
.logo {
  width: 200px;
  position: relative;
  top: 200px;
  left: 200px;
}
.image {
  position: relative;
  width: 200px;
  top: 200px;
  left: 900px;
}
</style>