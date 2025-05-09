<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import service from "../../../service/http";
import NormalTableView from "../../components/table/normal-table-view.vue";
import type {TableActionButton, TableColumn, User} from "../../../ts/global";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

let router = useRouter()
let store = useStore()
const tableData = ref<User[]>([
])

function deleteItem(row: User) {
  console.log(row)
  store.dispatch("basic/setRoute", "嘿嘿")
  store.commit("changeRoute", "qwe")
}

function cancelDelete(row: User) {
  console.log(row)
  store.dispatch("basic/setRoute", "呵呵呵")
  store.commit("changeRoute", "zxc")
}

const columns: TableColumn<User>[] = [
  {
    prop: "userId",
    label: "用户id",
  },
  {
    prop: "account",
    label: "账号",
  },
  {
    prop: "realName",
    label: "姓名",
  },
  {
    label: "操作",
    prop: "btn",
    fixed: 'right',
    // width: '300px',
    btnTexts: ["编辑", "删除"],
    clickBtn: (row, idx) => {
      if (idx == 0) {
        router.push({name: "user-add-edit", query: {id: row.userId}})
      }
      if (idx == 1) {
        ElMessageBox.confirm('确定是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem(row)
        }).catch(() => {
          cancelDelete(row)
        })
      }
    }
  }
]
const params = reactive({
  current: 1,
  size: 10,
})
const total = ref(0)
let addAction: TableActionButton = {
  text: "新增",
  onClick: () => {
    router.push({name: "user-add-edit"})
  }
}
function handleSizeChange(size: number) {
  params.size = size;
  getData()
}

function handleCurrentChange(current: number) {
  params.current = current;
  getData()
}


async function getData() {
  let {data: userData} = await service.request({
    method: 'POST',
    url: '/user/list',
    data: params
  })
  if (userData) {
    tableData.value = userData.records;
    total.value = userData.total || 0
  }
}

onMounted( async () => {
  await getData()
})
</script>

<template>
  <section style="flex:1;display: flex;flex-direction: column; margin: 20px; padding:20px; background-color: white">
    <NormalTableView :data-source="tableData"
                     :columns="columns"
                     :total="total"
                     :size="params.size"
                     :current-page="params.current"
                     :handleSizeChange="handleSizeChange"
                     :handle-current-change="handleCurrentChange"
                     :addAction="addAction"
    />
  </section>
</template>

<style scoped lang="less">

</style>