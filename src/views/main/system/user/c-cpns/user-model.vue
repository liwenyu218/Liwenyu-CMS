<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'

// 1. 定义数据
const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isNewUser = ref(true)
const editData = ref<any>()

// 2. 获取roles/department数据
const { entireDepartments, entireRoles } = useMainStore()

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
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 新建用户
    systemStore.newUserDataAction(formData)
  }
}

defineExpose({ setModelVisible })
</script>

<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewUser ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="formData.realname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-show="isNewUser">
            <el-input
              placeholder="请输入密码"
              v-model="formData.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              placeholder="请输入手机号码"
              v-model="formData.cellphone"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <el-option
                v-for="item in entireRoles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <el-option
                v-for="item in entireDepartments"
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
