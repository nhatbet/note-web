import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VAuthCallback from '../views/Auth/VAuthCallback.vue'
import VHome from '../views/Home/VHome.vue'
import TestView from '../views/TestView.vue'
import VArticleIndex from '@/views/Article/VArticleIndex.vue'
import VArticleCreate from '@/views/Article/VArticleCreate.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import VArticleShow from '@/views/Article/VArticleShow.vue'
import VArticleEdit from '@/views/Article/VArticleEdit.vue'
// import VCommentIndex from '@/views/Comment/VCommentIndex.vue'

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
      path: '/login/:provider/callback',
      name: 'VAuthCallback',
      component: VAuthCallback
    },
    // {
    //   path: '/comments',
    //   name: 'VCommentIndex',
    //   component: VCommentIndex
    // },
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
        },
        {
          path: '/home/article/:id',
          name: 'VArticleShow',
          component: VArticleShow
        },
        {
          path: '/home/article/:id/update',
          name: 'VArticleEdit',
          component: VArticleEdit
        },
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
