<script setup lang="ts">
import { computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'
import useMainStore from '@/store/main/main'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modelRef, handleEditClick, handleNewClick } = usePageModel()

// 获取modelConfig中的select数据
const modelConfigRef = computed(() => {
  const mainStore = useMainStore()
  const { entireDepartments, entireRoles } = mainStore

  modelConfig.formItems.forEach((item) => {
    if (item.type === 'select' && item.prop === 'roleId') {
      const rolesList = entireRoles.map((item) => ({
        id: item.id,
        label: item.name
      }))
      item.options.push(...rolesList)
    }
    if (item.type === 'select' && item.prop === 'departmentId') {
      const rolesList = entireDepartments.map((item) => ({
        id: item.id,
        label: item.name
      }))
      item.options.push(...rolesList)
    }
  })

  return modelConfig
})
</script>

<template>
  <div class="user">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #enable="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" disabled size="small">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
    <page-model ref="modelRef" :model-config="modelConfigRef" />
  </div>
</template>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
