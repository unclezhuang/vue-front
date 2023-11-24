<template>
  <div>
    <el-dialog v-model="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :title="loadingTitle" width="560px" :before-close="handleClose">
      <el-form :inline="false" :model="formData" :rules="rules" ref="rulesForm" label-position="right" label-width="130px">
        <el-form-item label="任务名称：" prop="name">
          <el-input v-model.trim="formData.name" placeholder="请输入任务名称" style="width: 350px" :disabled="loadingTitle==='详情'"></el-input>
        </el-form-item>
        <el-form-item label="目标平台：" prop="platform">
          <el-radio-group v-model.trim="formData.platform">
            <el-radio v-for="item in platformList" :label="item.key" size="large">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="任务类别：" prop="category">
          <el-select v-model.trim="formData.category" placeholder="请选择" filterable clearable style="width: 350px">
            <el-option
                v-for="item in categoryList.value"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采集目标：">
          <el-select v-model="select" style="width: 120px">
            <el-option label="用户Id" value="users_id"></el-option>
            <el-option label="用户Name" value="users_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="users">
          <el-select v-model="users" multiple filterable allow-create placeholder="请输入" style="width: 350px">
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleClose" :loading="loadingSave">取消</el-button>
        <el-button type="primary" @click="submitData" :loading="loadingSave" :disabled="loadingTitle==='详情'">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// import {mallGoodstypeAdd, mallGoodstypeEdit, platformsettingsUploadPlatformImg} from "@/utils/api";
import {ref, reactive, watch, onMounted, onUnmounted} from 'vue'
import {ElMessage} from 'element-plus'
import {defineExpose} from 'vue'


// 重点！！这里需要使用defineExpose暴露出去
defineExpose({
  addModuleFn
})


const emit = defineEmits(['refreshData'])
const platformList = [{"key": "twitter", "name": "Twitter"},
  {"key": "facebook", "name": "Facebook"},
  {"key": "weibo", "name": "Weibo"}]

let rulesForm = ref(null)
let dialogVisible = ref(false)
let loadingSave = ref(false)
let loadingTitle = ref('')
let categoryList = reactive([{}])
const select = ref('users_id')
const users = ref([])
let formData = reactive({
  name: "",
  category: "",
  platform: "",
  users_id: [],
  users_name: [],
})
let rules = reactive({
  name: [{required: true, message: '请输入任务名称', trigger: 'blur'}],
  platform: [{required: true, message: '请选择目标平台', trigger: 'change'}],
  category: [{required: true, message: '请选择任务类型', trigger: 'change'}],
  users: [{validator: validateOption, trigger: 'blur'}],
})

function validateOption(rule, value, callback) {
  if (users.value.length === 0) {
    callback(new Error('请输入采集目标'))
  } else {
    callback()
  }
}

onMounted(() => {
      window.addEventListener("focusin", onFocusIn, true);
    }
)

onUnmounted(() => {
      window.removeEventListener("focusin", onFocusIn);
    }
)

function onFocusIn(e) {
  e.stopImmediatePropagation()//阻止当前和后面的一系列事件
}

function handleClose() {
  dialogVisible.value = false
  loadingSave.value = false
  formData = {
    id: "",
    name: "",
    category: "",
    platform: "",
    users_id: [],
    users_name: [],
  }
  emit('refreshData')
}

function addModuleFn(item, flag, category_list) {
  loadingTitle.value = flag
  dialogVisible.value = true
  categoryList.value = category_list
  if (item) {
    formData = item
  }
}

function submitData() {
  rulesForm.value.validate(valid => {
    if (valid) {
      loadingSave.value = true
      let param = {
        ...formData
      }
      param["users_id"] = []
      param["users_name"] = []
      param[select.value] = users.value

      console.log(1111,param)

      if (formData.id) {
        mallGoodstypeEdit(param).then(res => {
          loadingSave.value = false
          if (res.code === 2000) {
            ElMessage.success(res.msg)
            handleClose()
            emit('refreshData')
          } else {
            ElMessage.warning(res.msg)
          }
        })
      } else {
        mallGoodstypeAdd(param).then(res => {
          loadingSave.value = false
          if (res.code === 2000) {
            ElMessage.success(res.msg)
            handleClose()
            emit('refreshData')
          } else {
            ElMessage.warning(res.msg)
          }
        })
      }
    }
  })
}
</script>

<style scoped>

</style>

