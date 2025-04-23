<script setup lang="ts">
import {onMounted, ref} from 'vue'
import service from "../../service/http";

const tableData = ref([
  {
    account: "",
    realName: "",
    userId: ""
  },
])


async function getData() {
  let userList = await service.request({
    method: 'GET',
    url: '/user/list'
  })
  if (userList.data) {
    tableData.value = userList.data;
  }
}

onMounted( async () => {
  await getData()
})
</script>

<template>
  <section style="flex: 1;">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userId" label="id" width="180" />
      <el-table-column prop="account" label="账号" width="180" />
      <el-table-column prop="realName" label="姓名" />
    </el-table>
    <button @click="getData">asd</button>
  </section>
</template>

<style scoped lang="less">

</style>