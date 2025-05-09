import {createStore} from "vuex";
import user from './modules/user.js'
import basic from './modules/basic.js'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    /*
    这里的state是响应式的, 在页面上使用, 然后使用Commit修改. 是随时变化的,
     但刷新页面, 会回到初始值
     */
    state () {
        return {
            lastRoute: "asd"
        }
    },
    mutations: {
        changeRoute (state, newRoute) {
            state.lastRoute = newRoute
        }
    },
    /*
    这里的state, 也是响应式, 是持久化的,
    刷新页面, 也是保留最新的值, 不会初始化
     */
    modules: {

        user,
        basic
    },
    getters: {
        user: (state) => state.user,
        basic: state => state.basic
    },
    plugins: [
        createPersistedState({
            /*
            这里需要注意, 如果使用sessionStorage, 则关闭页面时候会清空
            使用localStorage, 则关闭页面也不会清空
             */
            storage: window.localStorage,
            paths: ["user", "basic"]
        })
    ]
})

export default store