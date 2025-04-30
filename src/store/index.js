import {createStore} from "vuex";
import user from './modules/user.js'
import basic from './modules/basic.js'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
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
            storage: window.sessionStorage,
            paths: ["user", "basic"]
        })
    ]
})

export default store