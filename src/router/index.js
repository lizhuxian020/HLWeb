import {createRouter, createWebHashHistory} from "vue-router";

const layoutRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/common/login.vue'),
    },
    {
        path: '/',
        name: 'home',
        redirect: '/user',
        component: () => import('@/views/common/home.vue'),
        children: [
            {
                path: '/test',
                name: 'test',
                children: [
                    {
                        path: '/test0',
                        name: 'test0',
                        component: () => import('@/views/pages/test.vue'),
                    },
                    {
                        path: '/test1',
                        name: 'test1',
                        component: () => import('@/views/pages/test.vue'),
                    },
                    {
                        path: '/test2',
                        name: 'test2',
                        component: () => import('@/views/pages/test.vue'),
                    },
                    {
                        path: '/test3',
                        name: 'test3',
                        component: () => import('@/views/pages/test.vue'),
                    },
                    {
                        path: '/test4',
                        name: 'test4',
                        component: () => import('@/views/pages/test.vue'),
                    }
                ]
            },
            {
                path: '/user',
                name: 'user',
                redirect: '/user1',
                children: [
                    {
                        path: '/user1',
                        name: 'user1',
                        component: () => import('@/views/pages/user/user-page.vue'),
                    },
                    {
                        path: '/user2',
                        name: 'user-add-edit',
                        meta: {
                            hidden: true,
                        },
                        component: () => import('@/views/pages/user/user-add-edit-page.vue'),
                    }
                ]
            },
            {
                path: '/building',
                name: 'building',
                redirect: '/building1',
                children: [
                    {
                        path: '/building1',
                        name: 'building1',
                        component: () => import('@/views/pages/building/building-info-page.vue'),
                    },
                    {
                        path: '/building2',
                        name: 'building-info-add',
                        meta: {
                            hidden: true,
                        },
                        component: () => import('@/views/pages/building/building-info-add-page.vue'),
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

router.beforeEach( async (to, from, next) => {
    let whiteList = ['/login', '/404']
    if (whiteList.indexOf(to.path) !== -1) {
        next();
        return;
    }
    // /*
    // 这里需要同步一下localStorage, 保证新开页面, 也能获取
    //  */
    // let localSItem = localStorage.getItem('vuex');
    // if (localSItem) {
    //     await sessionStorage.setItem('vuex', localSItem)
    // }
    let data = localStorage.getItem('vuex')
    if (!data) {
        next(`/login?redirect=${to.path}`);
        return;
    }
    next()
})

export default router