<script setup lang="ts">

import HlFormView from "../../components/form/hl-form-view.vue";
import type {FormItem, FormSelectItem} from "../../../ts/global";
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, onBeforeUpdate, onMounted, onUpdated, reactive, ref} from "vue";
import service from "../../../service/http";
import {ElMessage} from "element-plus";

let router = useRouter()
let route = useRoute()

let ownerList = reactive([] as FormSelectItem[])
let formData: FormItem[] = [
  {
    label: '楼名',
    prop: 'name',
    type: 'input',
    required: true
  },
  {
    label: '地址',
    prop: 'address',
    type: 'input',
    required: true
  },
  {
    label: '楼主',
    prop: 'ownerId',
    type: 'select',
    selectData: ownerList,
    required: true
  },
  {
    label: '水费(平方)',
    prop: 'waterBill',
    type: 'input',
    isNumberInput: true,
    defaultValue: 7
  },
  {
    label: '电费(度)',
    prop: 'electricBill',
    type: 'input',
    isNumberInput: true,
    defaultValue: 1.5
  },
  {
    label: '物业费(平方)',
    prop: 'propertyFee',
    type: 'input',
    isNumberInput: true,
    defaultValue: 5
  },
  {
    label: '描述',
    prop: 'description',
    type: 'input',
  },
  {
    label: '村',
    prop: 'villageName',
    type: 'select',
    selectData: ["横岭村"],
    defaultValue: "横岭村"
  },
  {
    label: '区',
    prop: 'regionName',
    type: 'select',
    selectData: ['一区', '二区', '三区', '四区'],
    defaultValue: '一区'
  },
  {
    label: '总楼层',
    prop: 'totalFloor',
    type: 'input',
    defaultValue: 8
  },
  {
    label: '是否带电梯',
    prop: 'elevator',
    type: 'select',
    selectData: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 0
      },
    ],
    defaultValue: 1
  },
  {
    type: 'buttons',
    buttonsData: [
      {
        text: '提交',
        validate: true,
        onClick: clickSubmit,
      },
      {
        text: '取消',
        plain: true,
        onClick: clickCancel
      }
    ]
  },
]
let initData =ref({})

async function clickSubmit(formData: any) {
  console.log(formData)

  let url = "/buildingInfo/save";
  let param = formData;
  if (route.query.id) {
    url = "/buildingInfo/update"
    param["buildingId"] = route.query.id
  }

  let {data: result} = await service.request({
    method: "post",
    url: url,
    data: param
  })
  if (result.flag) {
    router.replace('/home/building/building1')
  } else {
    ElMessage.error("提交失败")
  }
}

function clickCancel() {
  router.back()
}

onBeforeMount(async () => {
  let {data: userList} = await service.request({
    method: 'GET',
    url: '/user/list',
  })
  if (userList instanceof Array) {
    let selectData = userList.map(item => ({
      label: item.realName,
      value: item.userId
    }))
    ownerList.push(...selectData)
  }
  if (route.query.id) {
    let {data: buildingInfo} = await service.request({
      method: 'GET',
      url: `/buildingInfo/id/${route.query.id}`,
    })
    if (buildingInfo) {
      initData.value = buildingInfo
    }
  }
})

</script>

<template>
  <div style="padding: 20px">
    <hl-form-view :form-data="formData" :initData="initData"/>
  </div>
</template>

<style scoped lang="less">

</style>