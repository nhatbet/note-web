import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VRegister from '../views/Auth/VRegister.vue'
import VLogin from '../views/Auth/VLogin.vue'
import VAuthCallback from '../views/Auth/VAuthCallback.vue'
import VHome from '../views/Home/VHome.vue'
import TestView from '../views/TestView.vue'
import VArticleIndex from '@/views/Article/VArticleIndex.vue'
import VArticleCreate from '@/views/Article/VArticleCreate.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
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
          path: '/home',
          name: 'VArticleIndex',
          component: VArticleIndex
        },
        {
          path: '/home/article/create',
          name: 'VArticleCreate',
          component: VArticleCreate
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)
  // handle router
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else next()
  next()
})

export default router
