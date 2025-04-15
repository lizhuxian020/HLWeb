<script setup lang="ts">
import {useStore} from "vuex";
import {computed, onMounted, type Ref, ref, watch} from "vue";
import MainNaviBar from "../layouts/main-navi-bar.vue";
import {ArrowLeft, User, Expand, Fold, House, Setting} from "@element-plus/icons-vue";
import {type RouteRecord, type RouteRecordRaw, useRoute, useRouter} from "vue-router";

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
console.log(router.getRoutes())
let allRoutes = router.getRoutes()
let firMenu = allRoutes.filter((route)=>{
  return route.name == "home";
})[0].children;

let secMenu : Ref = ref([])

watch(expand, (val) => {
  console.log(val);
})

onMounted(() => {
  setTimeout(()=>{
    loading.value = false
  }, 1000)
})


let expand = ref(false);
function clickArrow() {
  expand.value = !expand.value;
}

function onClickFirMenu(item: RouteRecordRaw, index: number) {
  expand.value = true
  secMenu.value = item.children;
}

function onClickSecMenu(item: RouteRecordRaw, index: number) {
  console.log(item)
  router.push({name: item.name, query: {index: index}});
}


</script>

<template>
  <main class="main" element-loading-text="加载中, 请稍后..." v-loading="loading" style="height: 100%">
    <template v-if="!loading">
      <main-navi-bar/>
      <section style="height: 100%; background-color: chartreuse;display: flex">
        <aside style="height: 100%; background-color: gold; display:flex; user-select: none;">
          <nav style="background-color: #4191F1; height: 100%; width: 80px">
            <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 15px" @click="clickArrow">
              <el-icon style="font-size: 40px">
                <Expand v-if="expand"/>
                <Fold v-else/>
              </el-icon>
            </div>
            <ul style="padding: 0; margin: 0;">
              <li v-for="(item,index) in firMenu" :key="index" @click="onClickFirMenu(item, index)" style="list-style: none; flex-direction: column; display: flex; align-items: center; padding-top: 15px">
                <el-icon><User/></el-icon>
                <span>{{item.name}}</span>
              </li>
            </ul>
          </nav>
          <nav style="background-color: #545c64; height: 100%; width: 180px; transition: all 0.3s; overflow: hidden;" :style="[expand ? {width: '180px'} : {width: '0px'}, ]">
            <el-menu
                default-active="0"
                class="el-menu-vertical-demo"
                text-color="#fff"
                active-text-color="#ffd04b"
                background-color="#545c64"
                style="width: 200px"
            >
              <ul style="padding: 0">
                <li v-for="(item,index) in secMenu" :key="index" style="list-style: none" @click="onClickSecMenu(item, index)">
                  <el-menu-item :index="String(index)">
                    <el-icon><House /></el-icon>
                    <span>{{ item.name }}</span>
                  </el-menu-item>
                </li>
              </ul>
            </el-menu>
          </nav>
        </aside>
        <div style="height: 100%; background-color: darkgreen; flex: 1; flex-direction: column;">
          <section style="height: 100%; background-color: gold; display: flex; flex-direction: column">
            <router-view/>
          </section>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped lang="less">

</style>