<script setup lang="ts">

import {House, User} from "@element-plus/icons-vue";

</script>

<template>
  <nav style="height: 50px; background-color: rebeccapurple; width: 100%; user-select: none;">
    <div style="display: flex; height: 100%; align-items: center">
      <div style="background-color: darkgoldenrod; width: 80px; height: 100%; display: flex; align-items: center; justify-content: center;">
        <el-icon ><House /></el-icon>
      </div>
      <div style="background-color: #f56c6c; flex: 1; height: 100%">

      </div>
      <div style="background-color: skyblue; height: 100%; display: flex; align-items: center; justify-content: center;">
        <el-icon><User /></el-icon>
        <el-icon><House /></el-icon>
      </div>
    </div>


  </nav>
</template>

<style scoped lang="less">
@import "@/assets/css/variable.less";

:deep(.el-icon) {
  color: @C1;
  font-size: 36px;
}
</style>