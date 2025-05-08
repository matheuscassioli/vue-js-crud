import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import MainContent from '../components/MainContent.vue'

const routes = [
    {
        path: '/',
        redirect: () =>
            localStorage.getItem('auth') === 'true' ? '/lista' : '/login',
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/lista',
        component: MainContent,
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('auth') === 'true'
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
        return
    }
    next()
})

export default router
