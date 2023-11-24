<template>
  <div :class="{'ly-is-full':isFull}">
    <div class="tableSelect" ref="tableSelect">
      <el-form :inline="true" :model="formInline" label-position="left">
        <el-form-item label="任务ID：">
          <el-input size="default" v-model.trim="formInline.taskId" maxlength="200" style="width:200px;" clearable placeholder="任务ID" @change="search"></el-input>
        </el-form-item>
        <el-form-item label="关键词：">
          <el-input size="default" v-model.trim="formInline.searchKey" maxlength="200" style="width:200px;" clearable placeholder="关键词" @change="search"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-input size="default" v-model.trim="formInline.searchType" maxlength="60" style="width:100px;" clearable placeholder="类型" @change="search"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：">
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
    <el-table :height="'calc('+(tableHeight)+'px)'" border :data="tableData" ref="tableref" v-loading="loadingPage" style="width: 100%">
      <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
      <el-table-column min-width="90" prop="task_id" label="任务ID" show-overflow-tooltip></el-table-column>
      <el-table-column min-width="45" prop="category" label="日志类型" show-overflow-tooltip></el-table-column>
      <el-table-column min-width="500" prop="content" label="日志内容" show-overflow-tooltip></el-table-column>
      <el-table-column min-width="120" prop="created" label="创建时间" show-overflow-tooltip></el-table-column>
    </el-table>
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
  </div>
</template>

<script setup>
import Pagination from "@/components/Pagination";
import {ref, reactive, onMounted, onUnmounted, nextTick} from 'vue'
import {apiLog} from '@/utils/api'
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
  taskId: "",
  searchKey: "",
  searchType: "",
  beginAt: "",
  endAt: "",
})
let pageparm = reactive({
  page: init_page,
  limit: init_limit,
  total: init_total
})

let timers = ref([])
let tableData = ref([])

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
  formInline.taskId = ""
  formInline.searchKey = ""
  formInline.searchType = ""
  pageparm.page = init_page
  pageparm.limit = init_limit
  pageparm.total = init_total
  getData()
}

function getData() {
  loadingPage.value = true
  apiLog(formInline).then(res => {
    loadingPage.value = false
    if (res.data.code === 2000) {
      // tableData = JSON.parse(res.data.data)
      tableData = res.data.data
      pageparm.page = res.data.page;
      pageparm.limit = res.data.limit;
      pageparm.total = res.data.total;
    }
  })
}

</script>
