<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
    <el-tab-pane label="密码设置" name="passwrod">
      <el-form ref="userPasswordForm" :model="userPasswordInfo" required-asterisk :label-position="position" :rules="passwordRules" center label-width="120px" style="margin: 50px auto">
        <el-form-item label="原密码：" required prop="oldPassword">
          <el-input size="large" v-model="userPasswordInfo.oldPassword" clearable style="width: 360px"></el-input>
        </el-form-item>
        <el-form-item required prop="newPassword" label="新密码：">
          <el-input size="large" type="password" v-model="userPasswordInfo.newPassword" clearable style="width: 360px"></el-input>
        </el-form-item>
        <el-form-item required prop="newPassword2" label="确认密码：">
          <el-input size="large" type="password" v-model="userPasswordInfo.newPassword2" clearable style="width: 360px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="settingPassword">
            <i class="fa fa-check"></i>提交
          </el-button>
          <el-button @click="resetForm('passwordForm')" type="info">
            <i class="fa fa-reply-all"></i>重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import {systemUserChangePassword} from '@/utils/api'
import store from '@/store/index'
import {ref, reactive, onMounted} from 'vue'
import {ElMessage} from 'element-plus'


const userPasswordForm = ref(null)

var validatePass = (rule, value, callback) => {
  const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value === userPasswordInfo.oldPassword) {
    callback(new Error('原密码与新密码一致'))
  } else if (!pwdRegex.test(value)) {
    callback(new Error('您的密码复杂度太低(密码中必须包含字母、数字)'))
  } else {
    if (userPasswordInfo.newPassword2 !== '') {
      userPasswordForm.value.validateField('newPassword2')
    }
    callback()
  }
}
var validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== userPasswordInfo.newPassword) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}


let position = ref('right')
let activeName = ref('passwrod')

let userPasswordInfo = reactive({
  oldPassword: '',
  newPassword: '',
  newPassword2: ''
})

let passwordRules = reactive({
  oldPassword: [
    {
      required: true,
      message: '请输入原密码',
      trigger: 'blur'
    }
  ],
  newPassword: [{validator: validatePass, trigger: 'blur'}],
  newPassword2: [{validator: validatePass2, trigger: 'blur'}]
})

onMounted(() => {

    }
)


// 重置
function resetForm(name) {
  userPasswordInfo.oldPassword = ""
  userPasswordInfo.newPassword = ""
  userPasswordInfo.newPassword2 = ""
}

// tab切换,默认切换清除原字符
function handleClick(tab, event) {
  // const _self = this
  // if (tab.paneName === 'userInfo') {
  //   _self.$refs.userPasswordForm.resetFields()
  // } else {
  //   _self.$refs.userInfoForm.resetFields()
  // }
}

/**
 * 重新设置密码
 */
function settingPassword() {
  userPasswordForm.value.validate((valid) => {
    if (valid) {
      const userId = store.getters.getUserId
      if (userId) {
        const params = JSON.parse(JSON.stringify(_self.userPasswordInfo))
        params.id = userId
        systemUserChangePassword(params).then(res => {
          if (res.data.code === 2000) {
            // _self.activeName = 'userInfo'
            ElMessage.success(res.data.msg)
          } else {
            ElMessage.warning(res.data.msg)
          }
        })
      }
    } else {
      // 校验失败
      // 登录表单校验失败
      ElMessage.error('表单校验失败，请检查')
    }
  })
}
</script>

<style scoped>
.el-tabs .el-tabs__content {
  background-color: var(--el-bg-color) !important;
}

.el-tabs {
  background-color: var(--el-bg-color) !important;
}

::v-deep(.el-tabs__header) {
  margin-top: 20px !important;
}
</style>
