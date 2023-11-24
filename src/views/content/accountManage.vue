<template>
  <div>
    <div class="tableSelect" ref="tableSelect">
      <el-form :inline="true" :model="formInline" label-position="left">
        <el-form-item label="用户ID(数字):">
          <el-input size="default" v-model.trim="formInline.searchId" maxlength="100" style="width:120px;" clearable placeholder="用户ID(数字)" @change="search"></el-input>
        </el-form-item>
        <el-form-item label="用户ID(字符):">
          <el-input size="default" v-model.trim="formInline.searchName" maxlength="100" style="width:120px;" clearable placeholder="用户ID(字符)" @change="search"></el-input>
        </el-form-item>
        <el-form-item label="平台:">
          <el-input size="default" v-model.trim="formInline.platform" maxlength="60" style="width:100px;" clearable placeholder="平台" @change="search"></el-input>
        </el-form-item>
        <el-form-item label="采集时间:">
          <el-date-picker
              v-model.trim="timers"
              type="datetimerange"
              @change="timeChange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="search" type="primary" icon="Search">查询</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="handleEdit" icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="grid-container" :height="'calc('+(tableHeight)+'px)'" border :data="tableData" ref="tableref" v-loading="loadingPage" style="width: 100%">
      <div v-for="accountData in tableData" :key="accountData.id">
        <AccountCard v-bind:account-data="accountData"/>
      </div>
    </div>

    <div>
      <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    </div>
  </div>

</template>

<script setup>
import Pagination from "@/components/Pagination";
import AccountCard from "@/components/AccountCard"
import {ref, reactive, onMounted, onUnmounted, nextTick} from 'vue'
import {apiUsers} from '@/utils/api'
import {dateFormats, getTableHeight} from "@/utils/common";

const tableSelect = ref(null)
let tableHeight = ref(500)
let isFull = ref(false)
let loadingPage = ref(false)

const init_page = 1
const init_limit = 20
const init_total = 0


let formInline = reactive({
  page: init_page,
  limit: init_limit,
  searchId: "",
  searchName: "",
  platform: "",
  beginAt: "",
  endAt: "",
})


let pageparm = reactive({
  page: init_page,
  limit: init_limit,
  total: init_total
})

let timers = ref([])
let tableData = reactive([{}])

getData()


onMounted(() => {
      // getTheTableHeight()
      // 监听页面宽度变化搜索框的高度
      window.addEventListener('resize', listenResize);
      nextTick(() => {
        getTheTableHeight()
      })
    }
)

onUnmounted(() => {
      // 页面销毁，去掉监听事件
      window.removeEventListener("resize", listenResize);
    }
)

function listenResize() {
  nextTick(() => {
    getTheTableHeight()
  })
}

function getTheTableHeight() {
  let tabSelectHeight = tableSelect.value ? tableSelect.value.offsetHeight : 0
  tabSelectHeight = isFull.value ? tabSelectHeight : tabSelectHeight - 70
  tableHeight.value = getTableHeight(tabSelectHeight)
}

function callFather(parm) {
  formInline.page = parm.page
  formInline.limit = parm.limit
  getData()
}

function search() {
  formInline.page = init_page
  formInline.limit = init_limit
  getData()
}

function timeChange(val) {
  // console.log(val)
  if (val) {
    formInline.beginAt = dateFormats(val[0], 'yyyy-MM-dd hh:mm:ss');
    formInline.endAt = dateFormats(val[1], 'yyyy-MM-dd hh:mm:ss');
  } else {
    formInline.beginAt = null
    formInline.endAt = null
  }
  search()
}


function handleEdit() {
  formInline.page = init_page
  formInline.limit = init_limit
  formInline.searchId = ""
  formInline.searchName = ""
  formInline.platform = ""
  pageparm.page = init_page
  pageparm.limit = init_limit
  pageparm.total = init_total
  getData()
}

function getData() {
  loadingPage.value = true
  apiUsers(formInline).then(res => {
    loadingPage.value = false
    if (res.data.code === 2000) {
      // tableData = JSON.parse(res.data.data)
      tableData = res.data.data
      // console.log(tableData)
      pageparm.page = res.data.page;
      pageparm.limit = res.data.limit;
      pageparm.total = res.data.total;
    }
  })
}

</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  //height: 728px;
  height: 78vh;
  overflow: auto;
}
</style>