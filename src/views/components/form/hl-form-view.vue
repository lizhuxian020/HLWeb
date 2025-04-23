<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "hl-form-view"
})
</script>

<script setup lang="ts">
import type {FormItem, FormSelectItem, FormButton} from "../../../ts/global";
import {ref, reactive} from "vue";
import type {FormInstance} from "element-plus";
import type { RuleItem } from 'async-validator'

let formRef = ref<FormInstance>();

const props = defineProps({
  formData: {
    type: Array<FormItem>,
    default: {}
  },
})

function placeHolder(formItem: FormItem) {
  if (formItem.placeHolder) {
    return formItem.placeHolder
  }
  if (formItem.type === 'select') {
    return `请选择${formItem.label}`
  }
  return `请输入${formItem.label}`
}

function generateModel() {
  let result: any = {};
  for (let item of props.formData) {
    if (item.prop) {
      result[item.prop] = item.defaultValue || null
    }
  }
  return ref(result)
}
let model = generateModel()

function isFormSelectItem(obj: any): obj is FormSelectItem {
  return obj && typeof obj === 'object' && 'label' in obj && 'value' in obj
}

function getRule(formItem: FormItem) {
  var rules = [];
  if (formItem.required) {
    rules.push({required: formItem.required, message: `${formItem.label}必填`})
  }
  if (formItem.isNumberInput) {
    // rules.push({type: 'number', message: `${formItem.label}只能填数字`})
    rules.push({
      validator: decimalNumber,
      trigger: 'blur'
    })
  }
  return rules
}

function onClick(btnData: FormButton) {
  if (!formRef.value) {
    console.log("no")
    return
  }
  formRef.value.validate(valid => {
    if (valid && btnData.onClick) {
      console.log('submit!')
      btnData.onClick(model.value)
    } else {
      console.log('error submit!')
    }
  })
}


// 两位小数
const decimalNumber = (rule: RuleItem, value: any, callback: (error?: Error) => void) => {
  if (!value) {
    return callback()
  }
  const regExpRule = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  // console.log('进入验证', value, regExpRule.test(value))
  if (!regExpRule.test(value)) {
    return callback(new Error('只能是数字且小数点后最多两位'))
  }
  callback()
}

</script>

<template>
  <el-form :model="model" style="max-width: 300px" label-width="auto" ref="formRef">
    <template v-for="item in formData" :key="item.prop">
      <el-form-item v-if="item.type !== 'buttons'"
                    :label="item.label"
                    :prop="item.prop"
                    :rules="getRule(item)"
      >
        <el-input v-if="item.type === 'input'"
                  v-model="model[item.prop || 'unknown']"
                  type="text"
                  autocomplete="off"
                  :placeholder="placeHolder(item)"
                  />
        <el-select v-if="item.type === 'select'" v-model="model[item.prop || 'unknown']" :placeholder="placeHolder(item)">
          <template v-for="(option, index) of item.selectData" :key="String(index)">
            <el-option
                v-if="isFormSelectItem(option)"
                :label="option.label"
                :value="option.value"
            />
            <el-option
                v-else
                :label="option"
                :value="option"
            />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item v-else>
        <template v-for="data in item.buttonsData" :key="String(data.text)">
          <el-button v-if="data.onClick" :type="data.type || 'primary'" :plain="data.plain" @click="onClick(data)">{{data.text}}</el-button>
        </template>
      </el-form-item>
    </template>

  </el-form>
</template>

<style scoped lang="less">

</style>