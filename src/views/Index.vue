<template>
  <el-container class="index-con">
    <el-header class="index-header">
      <navcon></navcon>
    </el-header>
    <el-container class="main-con">
      <el-aside :class="showclass">
        <el-scrollbar>
          <leftnav></leftnav>
        </el-scrollbar>
      </el-aside>
      <div class="container-outer">
        <el-main class="index-main">
          <router-view></router-view>
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>
<script setup>
import navcon from '../components/navcon'
import leftnav from '../components/leftnav'

import {ref, reactive} from 'vue'
import {getCurrentInstance} from 'vue'

const instance = getCurrentInstance()

let showclass = ref('asideshow')
let showtype = ref(false)
let isMultiTabs = ref(true)

instance.appContext.config.globalProperties.$Bus.on('toggle', value => {
  //console.log('value')
  if (value) {
    showclass.value = 'asideshow'
  } else {
    showclass.value = 'aside'
    // setTimeout(() => {
    //   showclass.value = 'aside'
    // }, 300)
  }
})

</script>
<style lang="scss" scoped>
.main-con {
  width: 100%;
  height: 100%;
  /*overflow-y: auto;*/
}

.hg100 {
  height: 100vh !important;
  overflow-y: hidden !important;
}

.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: hidden;
}

.aside {
  width: 64px !important;
  background-color: var(--l-header-bg);
  margin: 0px;
  box-shadow: 0 0 5px #cccccc;
  height: calc(100vh - 60px);
}

.asideshow {
  width: 185px !important;
  height: calc(100vh - 60px);
  background-color: var(--l-header-bg);
  margin: 0px;
  box-shadow: 0 0 5px #cccccc;
}

.index-main {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  overflow: auto;
  padding: 8px 8px 0 8px;
  width: 100%;
}

.index-header {
  padding: 0px;
  width: 100%;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
}

.el-main.noPadding {
  padding: 0px !important;
  border-left: 2px solid #333;
}

.container-outer {
  width: 100%;
  /*height: calc(100vh - 60px);*/
  overflow-y: auto;
  background: var(--l-main-bg);
}</style>
