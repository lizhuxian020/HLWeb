<script setup lang="ts">
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import MainNaviBar from "../layouts/main-navi-bar.vue";
import {ArrowLeft, User, ArrowLeftBold, ArrowRightBold} from "@element-plus/icons-vue";

// const store = useStore();
// let token = computed(() => {
//   return store.state.user.token;
// });
//
// let getToken = () => {
//   console.log(token.value);
// }

let loading=ref(true)

onMounted(() => {
  setTimeout(()=>{
    loading.value = false
  }, 1000)
})


let expand = ref(false);
function clickArrow() {
  console.log("click");
  expand.value = !expand.value;
}
</script>

<template>
  <main class="main" element-loading-text="加载中, 请稍后..." v-loading="loading" style="height: 100%">
    <template v-if="!loading">
      <main-navi-bar/>
      <section style="height: 100%; background-color: chartreuse;display: flex">
        <aside style="height: 100%; background-color: gold; display:flex;">
          <nav style="background-color: #4191F1; height: 100%; width: 80px">
            <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 15px" @click="clickArrow">
              <el-icon>
                <ArrowLeftBold v-if="expand"/>
                <ArrowRightBold v-else/>
              </el-icon>
            </div>
            <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 15px">
              <el-icon><User/></el-icon>
              <span>用户</span>
            </div>
            <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 15px">
              <el-icon><User/></el-icon>
              <span>用户</span>
            </div>
            <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 15px">
              <el-icon><User/></el-icon>
              <span>用户</span>
            </div>
          </nav>
          <nav style="background-color: white; height: 100%; width: 180px">
          </nav>
        </aside>
        <div style="height: 100%; background-color: darkgreen; flex: 1">

        </div>
      </section>
    </template>
  </main>
</template>

<style scoped lang="less">

</style>