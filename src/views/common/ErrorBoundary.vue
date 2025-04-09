<script setup lang="ts">

import {ref, watchEffect} from "vue";

let hasError = ref(false)
let errorMessage = ref('')
// defineExpose({reset: () => (hasError.value = false)})
defineOptions({
  errorCaptured(err, instance, info) {
    console.error('🛑 ErrorBoundary 捕获组件异常：', err)
    // hasError.value = true
    // errorMessage.value = '未知错误'
    return false // false 允许错误继续冒泡（推荐）
  }
})
const resetError = () => {
  hasError.value = false
  errorMessage.value = ''
}
</script>

<template>
  <div v-if="hasError" class="error-boundary">
    <p>⚠️ 页面加载异常：</p>
    <p style="color: red;">{{ errorMessage }}</p>
    <button @click="resetError">重试</button>
  </div>
  <div v-else style="height: 100%">
    <slot />
  </div>
</template>

<style scoped lang="less">
.error-boundary {
  padding: 2em;
  border: 2px dashed #f56c6c;
  background: #fff0f0;
  border-radius: 8px;
}
</style>