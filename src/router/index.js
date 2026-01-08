import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/sites/HomeView.vue"
import LessonsView from "@/sites/LessonsView.vue"
import QuizView from "@/sites/QuizView.vue"
import ContactView from "@/sites/ContactView.vue"
import AboutView from "@/sites/AboutView.vue"
        import DailyChallengeView from "@/sites/DailyChallengeView.vue"
import BeginnerLessons from "@/lessons/BeginnerLessons.vue"
import IntermediateLessons from "@/lessons/IntermediateLessons.vue"
import DifficultLessons from "@/lessons/DifficultLessons.vue"

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/lessons",
    component: LessonsView
  },
  { path: "/beginner", component: BeginnerLessons },
  { path: "/intermediate", component: IntermediateLessons },
  { path: "/difficult", component: DifficultLessons },
  { path: "/quiz", component: QuizView },
  { path: "/contact", component: ContactView },
  { path: "/despre", component: AboutView },
  { path: "/daily-challenge", component: DailyChallengeView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
