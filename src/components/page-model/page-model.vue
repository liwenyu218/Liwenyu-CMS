<script setup lang="ts">
import { reactive, ref } from 'vue'
// import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import type { IModelConfig } from './type'

interface IModelProps {
  modelConfig: IModelConfig
  otherInfo?: any
}

const props = defineProps<IModelProps>()

// 1. 定义内部的数据
const initialData: any = {}
for (const item of props.modelConfig.formItems) {
  if (item.type === 'input') initialData[item.prop] = item.initial ?? ''
}
const formData = reactive(initialData)
const dialogVisible = ref(false)
const isNewUser = ref(true)
const editData = ref<any>()

// 2. 获取roles/department数据
// const { entireDepartment } = useMainStore()

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
      // model的初始化只能在这里完成
      const item = props.modelConfig.formItems.find((item) => item.prop === key)
      if (item?.type === 'input') formData[key] = item.initial ?? ''
    }
    editData.value = null
  }
}

// 4. 创建用户
const systemStore = useSystemStore()
const handleConfirmClick = () => {
  dialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  console.log(infoData)
  if (!isNewUser.value && editData.value) {
    // 编辑用户
    systemStore.editPageDataAction(
      props.modelConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    // 新建用户
    systemStore.newPageDataAction(props.modelConfig.pageName, infoData)
  }
}

defineExpose({ setModelVisible })
</script>

<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewUser ? modelConfig.header.newTitle : modelConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <template v-for="item in props.modelConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.id"
                    :label="option.label"
                    :value="option.id"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
