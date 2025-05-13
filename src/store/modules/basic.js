import router from '../../router'

const state = () => ({
    allRoutes: router.getRoutes(),
    routePathList: []
})

const mutations = {
    UPDATE_ROUTE_PATH(state, routePathList) {
        state.routePathList = routePathList
    }
}

const actions = {
    async pushNewRoute({ commit, state }, routeName) {

        let getRoute = (routeName, routeList) => {
            for (const route of routeList) {
                if (routeName === route.name) {
                    return route
                }
            }
            return null;
        }


        let routePathList = []
        let fun = (routeName, routeList) => {
            let currentRoute = getRoute(routeName, routeList);
            if (currentRoute) {
                routePathList.unshift(currentRoute)
                if (currentRoute.meta && currentRoute.meta.parentName) {
                    fun(currentRoute.meta.parentName, routeList)
                }
            }
        }

        fun(routeName, state.allRoutes)
        commit("UPDATE_ROUTE_PATH", routePathList)

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}