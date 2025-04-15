<script setup lang="ts">
import {useRoute} from "vue-router";
import {onBeforeUpdate, reactive, ref, watch} from "vue";

let route = useRoute()
let index = ref(route.query.index || "")
console.log("index" + index)
watch(
    () => route.query.index,
    (newValue) => {
      console.log(newValue)
      index.value = newValue || ""
    }
)
function click() {
  index.value = "11";
}
</script>

<template>
asdasdasd{{String(index)}}
  <button @click="click">change</button>
</template>

<style scoped lang="less">

</style>