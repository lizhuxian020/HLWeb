<template>
  <ErrorBoundary>
    <router-view />
  </ErrorBoundary>
</template>

<script lang="ts" setup>
import ErrorBoundary from '@/views/common/ErrorBoundary.vue'
</script>

<style scoped>
</style>
<style lang="less">
body {
  margin: 0;
  height: 100vh;
  width: 100%;
}
</style>
