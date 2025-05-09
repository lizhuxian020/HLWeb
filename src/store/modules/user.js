const state = () => ({
    userInfo: {},
    token: ''
})

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
    }
}

/*
    Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    因此可以通过context.state, context.getter直接获取当前数据,
    在这里. 可以进行异步操作
     */

const actions = {
    setUserInfo({ commit }, userInfo) {
        commit('SET_USER_INFO', userInfo)
    },
    setToken({ commit }, token) {
        commit('SET_TOKEN', token)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}