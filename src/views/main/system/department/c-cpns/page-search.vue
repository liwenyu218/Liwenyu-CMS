<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})

// 重置表单内容
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}

// 表单查询
const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="search">
    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              placeholder="请输入待查询的部门名称"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="领导部门" prop="leader">
            <el-input
              placeholder="请输入待查询的领导部门"
              v-model="searchForm.leader"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"> 查询 </el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  background: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    margin: 10px 30px 0 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
