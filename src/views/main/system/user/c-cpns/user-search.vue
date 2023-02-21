<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
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
          <el-form-item label="用户名" prop="name">
            <el-input
              placeholder="请输入待查询的用户名"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入待查询的姓名"
              v-model="searchForm.realname"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              placeholder="请输入待查询的电话"
              v-model="searchForm.cellphone"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 当span达到24, 下面的会自动换行 -->
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              placeholder="请选择查询的状态"
              v-model="searchForm.enable"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
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
    margin: 0 33px 8px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
