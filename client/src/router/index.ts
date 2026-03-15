import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import PostPage from '@/views/PostPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/post',
      name: 'post',
      component: PostPage
    }
  ],
})

export default router
