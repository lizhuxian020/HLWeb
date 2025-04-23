import {createStore} from "vuex";
import user from './modules/user.js'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    modules: {
        user
    },
    getters: {
        user: (state) => state.user
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            paths: ["user"]
        })
    ]
})

export default store