import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VHome from '../views/Home/VHome.vue'
import TestView from '../views/TestView.vue'
import VArticleIndex from '@/views/Article/VArticleIndex.vue'
import VArticleCreate from '@/views/Article/VArticleCreate.vue'
import { useAuthStore } from '@/stores/auth'
import VArticleShow from '@/views/Article/VArticleShow.vue'
import VArticleEdit from '@/views/Article/VArticleEdit.vue'
import VCommentIndex from '@/views/Comment/VCommentIndex.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import LocalStorageService from '@/services/LocalStorageService'
import VMyArticle from '@/views/Article/VMyArticle.vue'
import TabBarMenu from '@/views/User/TabBarMenu.vue'
import VProfile from '@/views/User/VProfile.vue'
import VNotification from '@/views/User/VNotification.vue'
import VSetting from '@/views/User/VSetting.vue'
import VSummary from '@/views/User/VSummary.vue'
import VActivity from '@/views/User/VActivity.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/:pathMatch(.*)*', component: PageNotFound },
        // {
        //     path: '/',
        //     name: 'home',
        //     component: HomeView,
        //     meta: { title: 'Welcome home', permissions: [] }
        // },
        {
            path: '/test',
            name: 'test',
            component: TestView
        },
        {
            path: '/comments',
            name: 'VCommentIndex',
            component: VCommentIndex
        },
        {
            path: '/',
            name: 'VHome',
            component: VHome,
            children: [
                {
                    path: '/article/created/by-me',
                    name: 'VMyArticle',
                    component: VMyArticle,
                    meta: {
                        auth: true,
                        title: 'Your article'
                    }
                },
                {
                    path: '/',
                    name: 'VArticleIndex',
                    component: VArticleIndex
                },
                {
                    path: '/article/create',
                    name: 'VArticleCreate',
                    component: VArticleCreate,
                    meta: {
                        title: 'Create your article',
                        auth: true
                    }
                },
                {
                    path: '/article/:id',
                    name: 'VArticleShow',
                    component: VArticleShow
                },
                {
                    path: '/article/:id/update',
                    name: 'VArticleEdit',
                    component: VArticleEdit
                },
                {
                    path: '/user',
                    name: 'VUser',
                    component: TabBarMenu,
                    meta: {
                        auth: true,
                        title: 'Your article'
                    },
                    children: [
                        {
                            path: '/user/summary',
                            name: 'VSummary',
                            component: VSummary
                        },
                        {
                            path: '/user/profile',
                            name: 'VProfile',
                            component: VProfile
                        },
                        {
                            path: '/user/notification',
                            name: 'VNotification',
                            component: VNotification
                        },
                        {
                            path: '/user/setting',
                            name: 'VSetting',
                            component: VSetting
                        },
                        {
                            path: '/user/activity',
                            name: 'VActivity',
                            component: VActivity
                        }
                    ]
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = LocalStorageService.isLoggedIn()
    authStore.setAuthenticated(isAuthenticated)
    authStore.setProfile(LocalStorageService.getProfile())
    // Check chưa login không thể thực hiện
    if (to.meta.auth && !isAuthenticated) {
        authStore.setShowLoginForm()
        next(false)
    }

    next()
})

export default router
