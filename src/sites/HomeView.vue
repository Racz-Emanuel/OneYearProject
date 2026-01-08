<script setup>
import Quote from "@/components/Quote.vue"
import logo from "@/assets/asl.jpg"
import image from "@/assets/asi.jpg"
</script>

<template>
  <div class="header">
    <img :src="logo" alt="logo" class="logo" />
    <img :src="image" alt="image" class="image" />
    <h2 class="center">Bine ai venit !</h2>

    <Quote />
  </div>
</template>

<style scoped>
.header {
  padding: 20px;
}

.center {
  position: absolute;
  top: 190px;
  left: 690px;
  font-weight: bold;
  font-size: 150%;
  color: #4076db;
}

.logo {
  position: absolute;
  top: 280px;
  left: 90px;
  width: 290px;
  height: auto;
}

.image {
  position: absolute;
  top: 280px;
  right: 80px;
  width: 310px;
  height: auto;
}
</style>
