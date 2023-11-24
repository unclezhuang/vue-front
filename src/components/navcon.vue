/**
* 头部菜单
*/
<template>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="var(--l-header-bg2)" text-color="#ffffff"
           active-text-color="#ffffff" :ellipsis="false">
    <el-menu-item :style="collapsed ? 'width:90px;margin-left:0' : 'width:210px'" class="logo-outer">
      <p class="login-inner">
        <img class="logoimg" src="../assets/img/logo.png" alt=""
             :style="collapsed ?'width:24px;height:24px;margin-left:0' : 'width:40px'">
      </p>
      <img class="showimg" :src="collapsed?imgshow:imgsq" @click="toggle(collapsed)">
    </el-menu-item>
    <!--      <el-row class="buttonimg" type="info">-->
    <!--      </el-row>-->
    <el-row class="ly-header-right">
      <span>
        <el-dropdown trigger="click" class="right-dropdown-center">
          <span class="el-dropdown-link">
            你好,{{ userName }}
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </el-row>
  </el-menu>
</template>
<script setup>

import {ref, reactive} from 'vue'

import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

const router = useRouter()
const store = useStore()

import {defineEmits, onMounted, onUnmounted} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus'

import {getCurrentInstance} from 'vue'

const instance = getCurrentInstance()


let collapsed = ref(false)
let imgshow = require('../assets/img/show.png')
let imgsq = require('../assets/img/sq.png')
let mobileWidth = 992
let userName = store.getters.getName

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize()
})
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
})

// 退出登录
function exit(e) {
  ElMessageBox.confirm('退出登录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.dispatch('logout')
    router.push({path: '/login'})
    sessionStorage.clear()
    localStorage.clear()
    ElMessage.success('已退出登录!')
  }).catch((e) => {
    console.log('error:', e)
  })
}

// 切换显示
function toggle(showtype) {
  collapsed.value = !showtype
  instance.appContext.config.globalProperties.$Bus.emit('toggle', showtype)
}


//解决table 表格缩放错位问题
function handleResize() {
  collapsed.value = isMobile()
  toggle(collapsed)
}

function isMobile() {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

  if (htmlWidth > mobileWidth) {
    return true
  }
  return false
}

</script>
<style lang="scss" scoped>

.right-dropdown-center {
  color: #ffffff;
  display: flex;
  align-items: center;
}

::v-deep(.el-dropdown--default) {
  height: 18px !important;
}

::v-deep(.el-dropdown) {
  line-height: unset !important;
}

::v-deep(.el-icon--right) {
  margin-left: 0 !important;
}

.ly-header-right {
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  padding-right: 15px;
  background-color: var(--l-header-bg2) !important;
}

.ly-header-right:hover {
  background: var(--l-header-bg2) !important;
}

::v-deep(.el-sub-menu__title) {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}

.is-console {
  float: right;
  margin: 14px;
}

.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
  position: relative;
  float: left;
  cursor: pointer;
}

.showimg {
  width: 26px;
  height: 26px;
  /*position: absolute;*/
  /*top: 17px;*/
  /*left: 0;*/
}

.showimg:active {
  border: none;
}

.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  /*color: #FFFFFF;*/
  font-size: 20px;
  text-align: center;
  /*margin-left: 20px;*/
  display: inline-block;
  outline: none;
  float: left;
}

.logoimg {
  height: 40px;
}

.el-menu-demo {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-menu-item.is-active {
    position: relative;
    background-color: var(--l-header-bg2) !important;

  }

  li {
    height: 100%;

    &.logo-outer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: none !important;
      margin: 0;
      padding: 0;

      .login-inner {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

      }
    }
  }
}

.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>
