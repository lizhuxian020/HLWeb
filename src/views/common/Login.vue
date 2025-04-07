<script setup lang="ts">
import {ref, reactive} from "vue";
import { ElForm, ElFormItem, ElButton, ElInput  } from "element-plus";

const dataForms = ref()
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
      validator: validatePass,
      trigger: 'blur',
    },
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ],
})


function clickLogin() {
  console.log('clickLogin')
}
</script>

<template>
  <div class="login-layout">
    <div class="login-layout-content">
      <div class="login-layout-test">
        <el-form>
          <el-form-item>
            <el-input style="width: 100%; height: 40px " placeholder="请输入账号"/>
          </el-form-item>
          <el-form-item>
            <el-button>登录</el-button>
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
  user-select: none;

  &-content {
    width: 368px;
    background-color: red;
  }

  &-test {

  }
}
</style>