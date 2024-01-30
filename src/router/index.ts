import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VRegister from '../views/Auth/VRegister.vue'
import VLogin from '../views/Auth/VLogin.vue'
import VAuthCallback from '../views/Auth/VAuthCallback.vue'
import VHome from '../views/Home/VHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
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
      component: VHome
    }
  ]
})

export default router
