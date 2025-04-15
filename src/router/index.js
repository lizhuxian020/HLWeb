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
        children: [
            {
                path: 'test',
                name: 'test',
                children: [
                    {
                        path: 'test0',
                        name: 'test0',
                        component: () => import('@/views/pages/test.vue'),
                    },
                    {
                        path: 'test1',
                        name: 'test1',
                        component: () => import('@/views/pages/test.vue'),
                    },
                    {
                        path: 'test2',
                        name: 'test2',
                        component: () => import('@/views/pages/test.vue'),
                    },
                    {
                        path: 'test3',
                        name: 'test3',
                        component: () => import('@/views/pages/test.vue'),
                    },
                    {
                        path: 'test4',
                        name: 'test4',
                        component: () => import('@/views/pages/test.vue'),
                    }
                ]
            },
            {
                path: 'user',
                name: 'user',
                redirect: '/home/user/user1',
                children: [
                    {
                        path: 'user1',
                        name: 'user1',
                        component: () => import('@/views/pages/user-page.vue'),
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: layoutRoutes,
})

export default router