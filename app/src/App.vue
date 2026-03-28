<template>
  <div class="flex min-h-screen flex-col bg-gray-400">
    <Header v-if="showLayout" :on-logout="logout" />
    <main class="flex-1 p-6">
      <RouterView />
    </main>
    <Footer v-if="showLayout" />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { useAuth } from "@/stores/auth"
import { onMounted, computed } from "vue"
import { useRouter, useRoute } from "vue-router"

const auth = useAuth()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (!auth.isAuthenticated && route.path !== "/login") {
    router.push("/login")
  }
})

function logout() {
  auth.logout()
}

const showLayout = computed(() => route.path !== "/login")
</script>
