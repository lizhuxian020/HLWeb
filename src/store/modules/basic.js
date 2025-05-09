const state = () => ({
    // userInfo: {},
    // token: ''
    routes: []
})

const mutations = {
    ADD_ROUTE(state, route) {
        state.routes.push(route)
    },
    CLEAR_ROUTE(state) {
        state.routes = [];
    }
}

const actions = {
    addRoute({ commit, getter }, route) {
        commit('ADD_ROUTE', route);
    },
    clearRoute({ commit }) {
        commit('CLEAR_ROUTE')
    }
    // setToken({ commit }, token) {
    //     commit('SET_TOKEN', token)
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}