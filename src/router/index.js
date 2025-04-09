import {createRouter, createWebHashHistory} from "vue-router";

const layoutRoutes = [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/common/login.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/common/home.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: layoutRoutes,
})

export default router