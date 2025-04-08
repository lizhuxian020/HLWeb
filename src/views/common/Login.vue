<script setup lang="ts">
import {ref, reactive} from "vue";
import { ElForm, ElFormItem, ElButton, ElInput  } from "element-plus";
import { User,  Lock} from '@element-plus/icons-vue'

const formRef = ref()
const dataForm = reactive({
  account: '',
  password: '',
  key: '',
  captcha: '',
  wsClient: 'web',
  applicationId: 1, //关联产品时需要，勿删
})
let validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  }
  // else if (!passwordReg(value)) {
  //   callback(new Error('密码由6-16位数字或大小写字母组成'))
  // }
  else {
    callback()
  }
}
const rules = reactive({
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      // validator: validatePass,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
})


function clickLogin() {
  formRef.value.validate((valid: boolean) => {
    if (!valid) {
      return
    }
    let account = dataForm.account;
    let password = dataForm.password;
    console.log(account + password);
  })
}
</script>

<template>
  <div class="login-layout">
    <div class="login-layout-content">
      <div class="login-layout-test">
        <el-form :model="dataForm" :rules="rules" ref="formRef">
          <el-form-item prop="account">
            <el-input class="login-layout-input"
                      placeholder="请输入账号"
                      v-model="dataForm.account"
            >
              <template #prefix>
                <el-icon><User/></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="login-layout-input"
                      placeholder="请输入密码"
                      type="password"
                      v-model="dataForm.password"
            >
              <template #prefix>
                <el-icon><Lock/></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-layout-button"
                       @click="clickLogin"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>

  </div>
</template>

<style scoped lang="less">

.login-layout {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login/login_bg.png") no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  //user-select: none;

  &-content {
    width: 368px;
  }

  &-input {
    height: 40px;
  }

  &-button {
    width: 100%;
    height: 40px;
    font-size: 16px;
  }

}
</style>