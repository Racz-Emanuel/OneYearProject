import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router'
import './assets/main.css'  // <- aici importi Tailwind

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).mount('#app')