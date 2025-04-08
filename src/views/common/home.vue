<script setup lang="ts">
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
let token = computed(() => {
  return store.state.user.token;
});

let getToken = () => {
  console.log(token.value);
}

</script>

<template>
<div class="home">
  <button @click="getToken">token</button>
</div>
</template>

<style scoped lang="less">

</style>