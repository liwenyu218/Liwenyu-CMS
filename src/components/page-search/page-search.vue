<script setup lang="ts">
import { reactive, ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'
import type { ElForm } from 'element-plus'
import type { FormItem } from './type'

// 定义自定义属性和接收数据
interface IProps {
  searchConfig: {
    pageName: string
    formItems: FormItem[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

// 定义form的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  if (item.type === 'input') initialForm[item.prop] = item.initial ?? ''
}
const searchForm = reactive(initialForm)

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
  <div class="search" v-if="isQuery">
    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in props.searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
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
            </el-form-item>
          </el-col>
        </template>
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
