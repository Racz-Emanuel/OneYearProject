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
import { onMounted, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useUserStore } from "@/stores/user"

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

userStore.loadSession()

onMounted(() => {
  if (!userStore.loggedIn && route.path !== "/login") {
    router.push("/login")
  }
})

function logout() {
  userStore.logout()
}

const showLayout = computed(() => route.path !== "/login")
</script>
