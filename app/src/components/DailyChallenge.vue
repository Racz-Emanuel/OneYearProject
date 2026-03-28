<script setup>
import SignImage from "@/components/SignImage.vue"
import VideoCard from "@/components/VideoCard.vue"
import { useDailyChallengeStore } from "@/stores/dailyChallenge"

const store = useDailyChallengeStore()
</script>

<template>
  <div>
    <div class="rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 p-6 shadow-lg">
      <h2 class="mb-3 text-2xl font-bold text-green-700">Provocarea Zilei</h2>
      <p class="text-gray-700">Învață semnul de astăzi!</p>
    </div>

    <SignImage
      v-if="store.todayChallenge"
      :signName="store.todayChallenge.signName"
      :description="store.todayChallenge.description"
      :imageName="store.todayChallenge.imageName"
    />

    <VideoCard
      v-if="store.todayChallenge"
      :title="store.todayChallenge.signName"
      :youtubeUrl="store.todayChallenge.youtubeUrl"
    />

    <button
      @click="store.markCompleted"
      :disabled="store.isCompletedToday"
      class="mt-4 rounded bg-green-600 px-4 py-2 text-white"
    >
      {{ store.isCompletedToday ? "Completat " : "Am învățat semnul" }}
    </button>
  </div>
</template>
