import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/sites/HomeView.vue'
import LessonsView from '@/sites/LessonsView.vue'
import QuizView from '@/sites/QuizView.vue'
import ContactView from '@/sites/ContactView.vue'
import AboutView from '@/sites/AboutView.vue'
import DailyChallengeView from '@/sites/DailyChallengeView.vue'  

const routes = [
  { path: '/', component: HomeView },
  { path: '/lessons', component: LessonsView },
  { path: '/quiz', component: QuizView },
  { path: '/contact', component: ContactView },
  { path: '/despre', component: AboutView },
  { path: '/daily-challenge', component: DailyChallengeView }  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router