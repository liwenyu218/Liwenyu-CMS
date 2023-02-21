<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'

// 1. 定义内部的数据
const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const isNewUser = ref(true)
const editData = ref<any>()

// 2. 获取roles/department数据
const { entireDepartment } = useMainStore()

// 3. 控制model显示
const setModelVisible = (isNew = true, itemData?: any) => {
  dialogVisible.value = true
  isNewUser.value = isNew

  if (!isNew && itemData) {
    for (const key in formData) {
      // 编辑用户
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      // 新建用户
      formData[key] = ''
    }
    editData.value = null
  }
}

// 4. 创建用户
const systemStore = useSystemStore()
const handleConfirmClick = () => {
  dialogVisible.value = false

  if (!isNewUser.value && editData.value) {
    // 编辑用户
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 新建用户
    systemStore.newPageDataAction('department', formData)
  }
}

defineExpose({ setModelVisible })
</script>

<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewUser ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入部门名称" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入部门领导" v-model="formData.leader"></el-input>
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择上级部门"
              style="width: 100%"
            >
              <el-option
                v-for="item in entireDepartment"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.model {
  .form {
    padding: 0 20px;
  }

  :deep(.el-dialog__footer) {
    padding-top: 0px;
  }
}
</style>
