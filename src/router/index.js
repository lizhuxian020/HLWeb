import {createRouter, createWebHashHistory} from "vue-router";

const layoutRoutes = [
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