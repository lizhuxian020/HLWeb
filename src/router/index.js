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
                meta: {
                    title: "测试",
                },
                children: [
                    {
                        path: '/test0',
                        name: 'test0',
                        meta: {
                            title: "测试",
                        },
                        component: () => import('@/views/pages/test.vue'),
                    },
                ]
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: "用户",
                },
                redirect: '/user-list',
                children: [
                    {
                        path: '/user-list',
                        name: 'user-list',
                        meta: {
                            title: "用户列表",
                            parentName: "user"
                        },
                        component: () => import('@/views/pages/user/user-page.vue'),
                    },
                    {
                        path: '/user-add-edit',
                        name: 'user-add-edit',
                        meta: {
                            title: "用户新增/编辑",
                            hiddenInMenu: true,
                            parentName: "user-list"
                        },
                        component: () => import('@/views/pages/user/user-add-edit-page.vue'),
                    }
                ]
            },
            {
                path: '/building',
                name: 'building',
                meta: {
                    title: "楼栋",
                },
                redirect: '/building-list',
                children: [
                    {
                        path: '/building-list',
                        name: 'building-list',
                        meta: {
                            title: "楼栋列表",
                            parentName: "building",
                        },
                        component: () => import('@/views/pages/building/building-info-page.vue'),
                    },
                    {
                        path: '/building-info-add',
                        name: 'building-info-add',
                        meta: {
                            hiddenInMenu: true,
                            title: "新增楼栋",
                            parentName: 'building-list',
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