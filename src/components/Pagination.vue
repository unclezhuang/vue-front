/**
* 分页组件
*/
<template>
  <el-row class="lyPagination-page" >
    <el-pagination class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="childMsg.page" :page-sizes="[20,50,100]" :page-size="childMsg.limit" layout="total, sizes, prev, pager, next, jumper" :total="childMsg.total">
    </el-pagination>
  </el-row>
</template>
<script setup>
import {ref, reactive} from 'vue'

const props = defineProps({
  childMsg: {
    page: Number,
    limit: Number,
    total: Number,

  }
})

const emit = defineEmits(['callFather'])

let pageparm = reactive({
  page: props.childMsg.page,
  limit: props.childMsg.limit
})


function handleSizeChange(val) {
  pageparm.limit = val
  pageparm.page = 1
  emit('callFather', pageparm)
}

function handleCurrentChange(val) {
  pageparm.page = val
  emit('callFather', pageparm)
}

</script>

<style lang="scss">
.lyPagination-page {
  display: flex;
  align-items: center;
  background: var(--el-fill-color-blank);
  border-bottom: 1px solid var(--el-border-color-light);
  border-left: 1px solid var(--el-border-color-light);
  border-right: 1px solid var(--el-border-color-light);
}

.page-box {
  margin: 10px auto;
  text-align: center;

  .el-pagination__editor.el-input {
    width: 70px !important;

    .el-input__inner {
      text-indent: 0 !important;
    }
  }
}
</style>
