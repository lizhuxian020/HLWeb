<script setup lang="ts">
import {useStore} from "vuex";
import {computed, onMounted, type Ref, ref, watch} from "vue";
import MainNaviBar from "../layouts/main-navi-bar.vue";
import {ArrowLeft, User, Expand, Fold, House, Setting} from "@element-plus/icons-vue";
import {type RouteLocationRaw, type RouteRecord, type RouteRecordRaw, useRoute, useRouter} from "vue-router";

// const store = useStore();
// let token = computed(() => {
//   return store.state.user.token;
// });
//
// let getToken = () => {
//   console.log(token.value);
// }

let loading=ref(true)
let route= useRoute()

// watch(route,(val)=>{
//   console.log(val);
// })
let router = useRouter()
console.log("allRoute = ")
console.log(router.getRoutes())
let allRoutes = router.getRoutes()
let firMenu = allRoutes.filter((route)=>{
  return route.name == "home";
})[0].children;

let secMenu : Ref<RouteRecordRaw[]> = ref([])

onMounted(() => {
  setTimeout(()=>{
    loading.value = false
  }, 1000)
})


let expand = ref(false);
function clickArrow() {
  expand.value = !expand.value;
}
 async function onClickFirMenu(item: RouteRecordRaw, index: number) {
  menuActive.value = String(item.name)
  expand.value = true
  secMenu.value = item.children || [];
  onClickSecMenu(secMenu.value[0], 0)
}

function onClickSecMenu(item: RouteRecordRaw, index: number) {
  router.push({name: item.name, query: {index: index}});
}

let menuActive = ref("")

onMounted(() => {
})

let store = useStore();
watch(() => route.name, (newValue) => {
  /*
  清空路由, 找到路由, 找到父路由
   */
  store.dispatch("basic/pushNewRoute", newValue)
})

</script>

<template>
  <main class="main" element-loading-text="加载中, 请稍后..." v-loading="loading" style="height: 100%; display: flex; flex-direction: column;">
    <template v-if="!loading">
      <main-navi-bar/>
      <section style="height: 100%; background-color: chartreuse;display: flex; flex: 1">
        <aside style="height: 100%; background-color: gold; display:flex; user-select: none;">
          <nav style="background-color: #4191F1; height: 100%; width: 80px">
            <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 15px; cursor: pointer;"
                 @click="clickArrow">
              <el-icon style="font-size: 40px">
                <Expand v-if="expand"/>
                <Fold v-else/>
              </el-icon>
            </div>
            <ul style="padding: 0; margin: 0;">
              <li v-for="(item,index) in firMenu" :key="index" @click="onClickFirMenu(item, index)"
                  style="list-style: none; flex-direction: column; display: flex; align-items: center; padding-top: 15px; cursor: pointer;"
                  :style="item.name === menuActive ? {backgroundColor: '#1f62b2'} : {}"
              >
                <el-icon><User/></el-icon>
                <span>{{item.meta.title || item.name}}</span>
              </li>
            </ul>
          </nav>
          <nav style="background-color: white; height: 100%; width: 180px; transition: all 0.3s; overflow: hidden;" :style="[expand ? {width: '180px'} : {width: '0px'}, ]">
            <el-menu
                default-active="0"
                text-color="#666666"
                style="width: 200px"
            >
              <ul style="padding: 0">
                <li v-for="(item,index) in secMenu" :key="index" style="list-style: none" @click="onClickSecMenu(item, index)">
                  <el-menu-item :index="String(index)" v-if="!item.meta || !item.meta.hiddenInMenu">
                    <el-icon><House /></el-icon>
                    <span>{{ item.meta.title || item.name  }}</span>
                  </el-menu-item>
                </li>
              </ul>
            </el-menu>
          </nav>
        </aside>
        <div style="height: 100%; background-color: darkgreen; flex: 1; flex-direction: column;overflow: auto;">
          <section style="height: 100%; background-color: #eeeeee; display: flex; flex-direction: column">
            <div style="background-color: white; margin-top: 20px; margin-left: 20px; padding: 15px">
              <el-breadcrumb separator="/">
                <template v-for="route in store.getters.basic.routePathList">
                  <el-breadcrumb-item :to="{name: route.name} as RouteLocationRaw">
                    {{route.meta.title || route.name}}
                  </el-breadcrumb-item>
                </template>
              </el-breadcrumb>
            </div>
            <router-view/>
          </section>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped lang="less">
@import "@/assets/css/variable.less";

:deep(.el-menu-item.is-active) {
  background-color: @primary-color !important;
  color: #fff !important;
}
:deep(.el-menu-item:hover) {
  background-color: #ffe58f;
}
</style>