<script setup>
import Quote from "@/components/Quote.vue"
import logo from "@/assets/asl.jpg"
import image from "@/assets/asi.jpg"
import happy from "@/assets/happy.jpg"
</script>

<template>
  <div class="home-page">
    <!-- QUOTE -->
    <div class="quote-card">
      <Quote />
    </div>

    <!-- MAIN SECTION -->
    <div class="content">
      <!-- LEFT IMAGE -->
      <img :src="logo" alt="logo" class="side-img left" />

      <!-- CENTER TEXT -->
      <div class="text-block">
        <h1>Welcome</h1>

        <p>
          Communication is one of the most powerful tools we have as human beings. It allows us to
          connect, understand each other, and build meaningful relationships. But for millions of
          people around the world, communication is not always easy.
        </p>

        <p>
          People who are deaf or unable to speak often face barriers in everyday life. Simple
          interactions can become difficult, and opportunities can be limited not because of
          ability, but because of accessibility.
        </p>

        <p>
          This platform exists to change that. Our goal is to make sign language learning
          accessible, simple, and engaging for everyone — whether you are a complete beginner or
          someone looking to improve.
        </p>

        <p>
          By learning sign language, you are not just gaining a skill — you are opening the door to
          inclusion, empathy, and real human connection.
        </p>

        <p class="highlight">
          Together, we can build a world where no one is left out of the conversation.
        </p>

        <!-- HAPPY IMAGE UNDER TEXT -->
        <img :src="happy" alt="happy people" class="happy-img" />
      </div>

      <!-- RIGHT IMAGE -->
      <img :src="image" alt="image" class="side-img right" />
    </div>
  </div>
</template>

<style scoped>
/* IMPORT FONT */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap");

.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  font-family: "Poppins", sans-serif;
}

/* QUOTE */
.quote-card {
  margin-bottom: 3rem;
  max-width: 650px;
  width: 100%;

  background: #f9fafb;
  padding: 25px;
  border-radius: 18px;
  border: 1px solid #e5e7eb;

  text-align: center;
}

/* MAIN CONTENT */
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1200px;
  gap: 40px;
}

/* IMAGES */
.side-img {
  width: 280px;
  height: 380px;
  object-fit: cover;

  border-radius: 20px;

  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

/* push images outward */
.left {
  margin-left: -40px;
}

.right {
  margin-right: -40px;
}

/* TEXT */
.text-block {
  max-width: 500px;
  text-align: center;

  padding: 30px;
  border-radius: 20px;
}

.text-block h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: #4f46e5;
  margin-bottom: 1.5rem;
}

.text-block p {
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 14px;
  line-height: 1.7;
}

/* FINAL LINE */
.highlight {
  font-weight: 600;
  color: #4f46e5;
  margin-top: 10px;
}

/* HAPPY IMAGE */
.happy-img {
  margin-top: 25px;
  width: 100%;
  max-width: 1660px;

  border-radius: 16px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
