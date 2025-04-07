import {createRouter, createWebHashHistory} from "vue-router";

const layoutRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/common/Login.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: layoutRoutes,
})

export default router