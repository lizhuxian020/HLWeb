<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import service from "../../../service/http";
import type {TableColumn, Building, TableActionButton} from '../../../ts/global'
import NormalTableView from "../../components/table/normal-table-view.vue";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";


const tableData = ref<Building[]>([
])

const columns: TableColumn<Building>[] = [
  {
    prop: 'buildingId',
    label: '楼栋id',
    fixed: 'left'
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
    prop: 'description',
    label: "描述"
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
    prop: "elevator",

  },
  {
    label: "操作",
    prop: "btn",
    fixed: 'right',
    // width: '300px',
    btnTexts: ["编辑", "删除"],
    clickBtn: (row, idx) => {
      if (idx == 0) {
        router.push({name: "building-info-add", query: {id: row.buildingId}})
      }
      if (idx == 1) {
        ElMessageBox.confirm('确定是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem(row)
        }).catch(() => {
          console.log("c")
        })
      }
    }
  }
]

let router = useRouter()

async function getData() {
  let {data: buildingData} = await service.request({
    method: 'POST',
    url: '/buildingInfo/list',
    data: params
  })
  if (buildingData) {
    tableData.value = buildingData.records;
    total.value = buildingData.total || 0;
  }
}

async function deleteItem(row: Building) {
  let {data: result} = await service.request({
    method: 'DELETE',
    url: '/buildingInfo/delete',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      "buildingId": row.buildingId
    }
  })
  if (result.flag) {
    ElMessage.success("提交成功")
  } else {
    ElMessage.error("提交失败")
  }
}

onMounted( async () => {
  await getData()
})

let addAction: TableActionButton = {
  text: "新增",
  onClick: () => {
    router.push({name: "building-info-add"})
  }
}

const params = reactive({
  current: 1,
  size: 10,
})
const total = ref(0)

function handleSizeChange(size: number) {
  params.size = size;
  getData()
}

function handleCurrentChange(current: number) {
  params.current = current;
  getData()
}
</script>

<template>
  <section style="flex:1;display: flex;flex-direction: column; margin: 20px; padding:20px; background-color: white">
    <NormalTableView
        :data-source="tableData"
        :columns="columns"
        :add-action="addAction"
        :total="total"
        :currentPage="params.current"
        :size="params.size"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
    />
  </section>
</template>

<style scoped lang="less">

</style>