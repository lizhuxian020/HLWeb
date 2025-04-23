<script setup lang="ts">
import {onMounted, ref} from 'vue'
import service from "../../../service/http";
import type {TableColumn, Building, TableActionButton} from '../../../ts/global'
import NormalTableView from "../../components/table/normal-table-view.vue";
import {useRouter} from "vue-router";


const tableData = ref<Building[]>([
])

const columns: TableColumn<Building>[] = [
  {
    prop: 'buildingId',
    label: '楼栋id',
  },
  {
    prop: 'name',
    label: '楼栋名',
    compute: (row: Building) => {
      return row.name && row.name.length ?  row.name : "---";
    }
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'ownerName',
    label: "楼主"
  },
  {
    label: '水费(平方)',
    prop: 'waterBill',
  },
  {
    label: '电费(度)',
    prop: "electricBill"
  },
  {
    label: '管理费(平方)',
    prop: 'propertyFee',
  },
  {
    prop: '描述',
    label: "description"
  },
  {
    label: '村',
    prop: 'villageName',
  },
  {
    label: '区',
    prop: "regionName"
  },
  {
    label: '总楼层',
    prop: 'totalFloor',
  },
  {
    label: '是否带电梯',
    prop: "elevator"
  },
]

let router = useRouter()

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
  // await getData()
})

let addAction: TableActionButton = {
  text: "新增",
  onClick: () => {
    router.push({name: "building-info-add"})
  }
}
</script>

<template>
  <section style="flex:1;display: flex;flex-direction: column; margin: 20px; padding:20px; background-color: white">
    <NormalTableView :data-source="tableData" :columns="columns" :add-action="addAction" >
    </NormalTableView>

    <button @click="getData">add</button>
  </section>
</template>

<style scoped lang="less">

</style>