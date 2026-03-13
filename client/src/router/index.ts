import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ],
})

export default router
