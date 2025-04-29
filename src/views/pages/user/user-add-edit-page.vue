<script setup lang="ts">

import HlFormView from "../../components/form/hl-form-view.vue";
import type {FormItem} from "../../../ts/global";
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, ref} from "vue";
import service from "../../../service/http";
import {ElMessage} from "element-plus";

let router = useRouter()
let route = useRoute()
let formData: FormItem[] = [
  {
    label: '账号',
    prop: 'account',
    type: 'input',
    required: true,
    isNumberInput: true
  },
  {
    label: '密码',
    prop: 'password',
    type: 'input',
    required: true,
  },
  {
    label: '姓名',
    prop: 'realName',
    type: 'input',
    required: true,
  },
  {
    type: 'buttons',
    buttonsData: [
      {
        text: "提交",
        validate: true,
        onClick: async (formData) => {
          let url = "/user/register"
          let param: any = formData
          if (route.query.id) {
            //修改
            url = "/user/update"
            param["userId"] = route.query.id;
          }
          let {data: result} = await service.request({
            method: 'post',
            url: url,
            data: param
          })
          if (result.flag) {
            ElMessage.success("提交成功");
            router.back()
          }
        }
      },
      {
        text: '取消',
        plain: true,
        onClick: () => {
          router.back()
        }
      }

    ]
  }
]
if (route.query.id) {
  formData.splice(1, 1)
}
let initData =ref({})
onBeforeMount(async () => {
  if (route.query.id) {
    let {data: user} = await service.request({
      method: 'GET',
      url: `/user/id/${route.query.id}`,
    })
    if (user) {
      initData.value = user
    }
  }
})
</script>

<template>
  <section style="padding: 20px">
    <hl-form-view :form-data="formData" :init-data="initData"/>
  </section>

</template>

<style scoped lang="less">

</style>