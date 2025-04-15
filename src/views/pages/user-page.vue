<script setup lang="ts">
import {onMounted, ref} from 'vue'
import service from "../../service/http";

const tableData = ref([
  {
    date: '2024-04-10',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-04-11',
    name: '李四',
    address: '上海市浦东新区'
  },
  {
    date: '2024-04-12',
    name: '王五',
    address: '广州市天河区'
  }
])

onMounted( async () => {
  await service.request({
    method: 'GET',
    url: '/user'
  })
})
</script>

<template>
  <section style="flex: 1;">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </section>
</template>

<style scoped lang="less">

</style>