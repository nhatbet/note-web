import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VRegister from '../views/Auth/VRegister.vue'
import VLogin from '../views/Auth/VLogin.vue'
import VAuthCallback from '../views/Auth/VAuthCallback.vue'
import VHome from '../views/Home/VHome.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'VRegister',
      component: VRegister
    },
    {
      path: '/login',
      name: 'VLogin',
      component: VLogin
    },
    {
      path: '/login/:provider/callback',
      name: 'VAuthCallback',
      component: VAuthCallback
    },
    {
      path: '/home',
      name: 'VHome',
      component: VHome,
      children: [
        {
          path: '/home/test',
          name: 'TestView',
          component: TestView
        },
      ]
    }
  ]
})

export default router
