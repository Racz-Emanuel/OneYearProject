import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/sites/HomeView.vue"
import LessonsView from "@/sites/LessonsView.vue"
import QuizView from "@/sites/QuizView.vue"
import ContactView from "@/sites/ContactView.vue"
import AboutView from "@/sites/AboutView.vue"
import DailyChallengeView from "@/sites/DailyChallengeView.vue"

import BeginnerLessons from "@/lessons/BeginnerLessons.vue"
import IntermediateLessons from "@/lessons/IntermediateLessons.vue"
import AdvancedLessons from "@/lessons/DifficultLessons.vue"

import LoginPage from "@/sites/LoginPage.vue"

const routes = [
  { path: "/login", component: LoginPage },

  { path: "/", component: HomeView, meta: { requiresAuth: true } },
  { path: "/lessons", component: LessonsView, meta: { requiresAuth: true } },
  { path: "/lessons/beginner", component: BeginnerLessons, meta: { requiresAuth: true } },
  { path: "/lessons/intermediate", component: IntermediateLessons, meta: { requiresAuth: true } },
  { path: "/lessons/advanced", component: AdvancedLessons, meta: { requiresAuth: true } },
  { path: "/quiz", component: QuizView, meta: { requiresAuth: true } },
  { path: "/contact", component: ContactView, meta: { requiresAuth: true } },
  { path: "/despre", component: AboutView, meta: { requiresAuth: true } },
  { path: "/daily-challenge", component: DailyChallengeView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "btn-primary border"
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("session")
  const isLoggedIn = !!session

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login")
  } else if (to.path === "/login" && isLoggedIn) {
    next("/") // already logged in, redirect away from login
  } else {
    next()
  }
})

export default router
