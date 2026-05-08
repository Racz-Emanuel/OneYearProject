<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/user.js"

const userStore = useUserStore()

const loginName = ref("")
const password = ref("")
</script>

<template>
  <div class="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
    <!-- TITLE -->
    <h2 class="mb-1 text-center text-xl font-bold text-indigo-600">
      <i class="bi bi-person-circle"></i> Account
    </h2>
    <p class="mb-4 text-center text-sm text-gray-500">Login or create a new account</p>

    <!-- INPUTS -->
    <div class="flex flex-col gap-3">
      <input
        v-model="loginName"
        type="text"
        placeholder="Username"
        class="rounded-lg border border-gray-300 p-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="rounded-lg border border-gray-300 p-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />

      <!-- BUTTONS -->
      <button
        class="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 p-2 font-semibold text-white transition hover:bg-indigo-700"
        @click="userStore.login(loginName, password)"
      >
        <i class="bi bi-box-arrow-in-right"></i>
        Login
      </button>

      <button
        class="flex items-center justify-center gap-2 rounded-lg bg-green-600 p-2 font-semibold text-white transition hover:bg-green-700"
        @click="userStore.register(loginName, password)"
      >
        <i class="bi bi-person-plus"></i>
        Register
      </button>
    </div>
  </div>
</template>
