import { createRouter, createWebHistory } from 'vue-router'
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
import SearchDetail from '@/views/Search/SearchDetail.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/:pathMatch(.*)*', component: PageNotFound },
        {
            path: '/test',
            name: 'test',
            component: TestView,
            meta: {
                breadcrumb: 'Test',
                icon: 'test'
            }
        },
        {
            path: '/comments',
            name: 'VCommentIndex',
            component: VCommentIndex,
            meta: {
                breadcrumb: 'Comment',
                icon: 'chat'
            }
        },
        {
            path: '/',
            name: 'VHome',
            component: VHome,
            meta: {
                title: 'Home',
                breadcrumb: 'Home',
                icon: 'home'
            },
            children: [
                {
                    path: '/article/created/by-me',
                    name: 'VMyArticle',
                    component: VMyArticle,
                    meta: {
                        auth: true,
                        title: 'Your article',
                        breadcrumb: 'My article',
                        icon: 'article'
                    }
                },
                {
                    path: '/',
                    name: 'VArticleIndex',
                    component: VArticleIndex,
                    meta: {
                        title: 'Article List',
                        // breadcrumb: 'Article',
                        // icon: 'article'
                    }
                },
                {
                    path: '/article/create',
                    name: 'VArticleCreate',
                    component: VArticleCreate,
                    meta: {
                        title: 'Create your article',
                        auth: true,
                        breadcrumb: 'Create Article',
                        icon: 'new-window'
                    }
                },
                {
                    path: '/article/:id',
                    name: 'VArticleShow',
                    component: VArticleShow,
                    meta: {
                        title: 'Article Detail',
                        breadcrumb: 'Detail article',
                        icon: 'article'
                    }
                },
                {
                    path: '/article/:id/update',
                    name: 'VArticleEdit',
                    component: VArticleEdit,
                    meta: {
                        title: 'Update article',
                        breadcrumb: 'Update Article',
                        icon: 'edit-square'
                    }
                },
                {
                    path: '/search',
                    name: 'SearchDetail',
                    component: SearchDetail,
                    meta: {
                        title: 'Search',
                        breadcrumb: 'Search',
                        icon: 'search'
                    }
                },
                {
                    path: '/user',
                    name: 'VUser',
                    component: TabBarMenu,
                    meta: {
                        auth: true,
                        title: 'User',
                        breadcrumb: 'User',
                        icon: 'user'

                    },
                    children: [
                        {
                            path: '/user/summary',
                            name: 'VSummary',
                            component: VSummary,
                            meta: {
                                title: 'Summary',
                                breadcrumb: 'Summary',
                                icon: 'summary'
                            },
                        },
                        {
                            path: '/user/profile',
                            name: 'VProfile',
                            component: VProfile,
                            meta: {
                                title: 'Profile',
                                breadcrumb: 'Profile',
                                icon: 'badge'
                            },
                        },
                        {
                            path: '/user/notification',
                            name: 'VNotification',
                            component: VNotification,
                            meta: {
                                title: 'Notification',
                                breadcrumb: 'Notification',
                                icon: 'bell'
                            },
                        },
                        {
                            path: '/user/setting',
                            name: 'VSetting',
                            component: VSetting,
                            meta: {
                                title: 'Setting',
                                breadcrumb: 'Setting',
                                icon: 'setting'
                            },
                        },
                        {
                            path: '/user/activity',
                            name: 'VActivity',
                            component: VActivity,
                            meta: {
                                title: 'Activity',
                                breadcrumb: 'Activity',
                                icon: 'activity'
                            },
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
