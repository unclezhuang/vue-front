<template>
  <div :class="{'ly-is-full':isFull}">
    <div class="tableSelect" ref="tableSelect">
      <el-form :inline="true" :model="formInline" label-position="left">
        <el-form-item label="任务名称：">
          <el-input v-model.trim="formInline.searchName" maxlength="60" clearable placeholder="任务名称" @change="search" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="任务类别：">
          <el-select v-model="formInline.category" placeholder="请选择" filterable clearable style="width: 150px" @change="search">
            <el-option
                v-for="item in categoryList.value"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态：">
          <el-select v-model="formInline.status" placeholder="请选择" clearable style="width: 150px" @change="search">
            <el-option
                v-for="item in statusList.value"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间:">
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
          <el-button @click="handleEdit('','reset')" icon="Refresh">重置</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="addModule" type="primary" icon="Plus">创建</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="handleDelete" type="danger" :disabled="multiple" icon="Delete">删除</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table">
      <el-table :height="tableHeight" border :data="tableData" v-loading="loadingPage" ref="tableref" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type="index" width="60" align="center" label="序号">
          <template #default="scope">
            <span v-text="getIndex(scope.$index)"></span>
          </template>
        </el-table-column>
        <el-table-column min-width="100" prop="task_name" label="任务名称" show-overflow-tooltip></el-table-column>
        <el-table-column min-width="60" prop="platform" label="平台"></el-table-column>
        <el-table-column min-width="80" prop="action_type" label="爬虫类别"></el-table-column>
        <el-table-column min-width="80" prop="users_id" label="采集目标ID"></el-table-column>
        <el-table-column min-width="80" prop="users_name" label="采集目标name"></el-table-column>
        <el-table-column min-width="60" prop="total" label="采集总数"></el-table-column>
        <el-table-column min-width="60" prop="status" label="任务状态"></el-table-column>
        <el-table-column min-width="60" prop="username" label="创建人"></el-table-column>
        <el-table-column min-width="150" prop="created" label="创建时间"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="150">
          <template #default="scope">
                        <span class="table-operate-btn" @click="handleEdit(scope.row,'status')">
                            <span v-if="scope.row.is_launched">下架</span>
                            <span v-else>上架</span>
                        </span>
            <span class="table-operate-btn" @click="handleEdit(scope.row,'edit')">编辑</span>
            <span class="table-operate-btn" @click="handleEdit(scope.row,'delete')">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <AddSpiderTask ref="addModuleFlag" @refreshData="getData"></AddSpiderTask>
  </div>
</template>

<script setup>
import Pagination from "@/components/Pagination";
import AddSpiderTask from "@/views/spider/AddSpiderTask"
import {ref, reactive, onMounted, onUnmounted, nextTick} from 'vue'
import {apiTaskStatus, apiTaskType, apiSpiderTask} from '@/utils/api'
import {dateFormats, getTableHeight} from "@/utils/common";
import {ElMessageBox, ElMessage} from 'element-plus'

const tableSelect = ref(null)
const addModuleFlag = ref(null)
let tableHeight = ref(500)
let isFull = ref(false)
let loadingPage = ref(false)
// 选项框选中数组
let ids = ref([])
// 选项框非单个禁用
let single = ref(true)
// 非多个禁用
let multiple = ref(true)

const init_page = 1
const init_limit = 20
const init_total = 0


let formInline = reactive({
  page: init_page,
  limit: init_limit,
  searchId: "",
  searchName: "",
  category: "",
  status: "",
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

let categoryList = reactive([{}])
let statusList = reactive([{}])

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

// 表格序列号
function getIndex($index) {
  // (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1
  return (pageparm.page - 1) * pageparm.limit + $index + 1
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


function handleEdit(row, flag) {
  if (flag === "reset") {
    formInline.page = init_page
    formInline.limit = init_limit
    formInline.searchId = ""
    formInline.searchName = ""
    formInline.category = ""
    formInline.status = ""
    formInline.platform = ""
    pageparm.page = init_page
    pageparm.limit = init_limit
    pageparm.total = init_total
    getData()
  } else if (flag === "edit") {

  } else if (flag === "delete") {

  } else if (flag === "status") {

  }

}

//多选项框被选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
}

/** 批量删除按钮操作 */
function handleDelete(row) {
  const ids = ids.value;
  ElMessageBox.confirm('是否确认删除选中的数据项?', "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(function () {
    return mallGoodsspuDelete({id: ids}).then(res => {
      if (res.code === 2000) {
        ElMessage.success(res.msg)
        vm.search()
      } else {
        ElMessage.warning(res.msg)
      }
    })
  })
}

function getData() {
  loadingPage.value = true
  apiSpiderTask(formInline).then(res => {
    loadingPage.value = false
    if (res.data.code === 2000) {
      tableData = res.data.data
      // console.log(tableData)
      pageparm.page = res.data.page;
      pageparm.limit = res.data.limit;
      pageparm.total = res.data.total;
    }
  })
  getCategoryList()
  getStstusList()
}

function getCategoryList() {
  apiTaskType().then(res => {
    if (res.data.code === 2000) {
      categoryList.value = res.data.data
    }
  })
}

function getStstusList() {
  apiTaskStatus().then(res => {
    if (res.data.code === 2000) {
      statusList.value = res.data.data
    }
  })
}

function addModule() {
  addModuleFlag.value.addModuleFn(null, '创建任务', categoryList.value)
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