<script setup lang="ts">
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import MainNaviBar from "../layouts/main-navi-bar.vue";

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

</script>

<template>
  <main class="main" element-loading-text="加载中, 请稍后..." v-loading="loading" style="height: 100%">
    <div v-if="!loading">
      <main-navi-bar/>
    </div>
  </main>
</template>

<style scoped lang="less">

</style>