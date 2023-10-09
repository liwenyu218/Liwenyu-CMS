<!--
 * @Author: Liwenyu
 * @Date: 2023-10-09 11:05:03
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-10-09 11:40:47
 * @FilePath: \Liwenyu-CMS\src\views\main\system\department\department.vue
 * @Description:
 *
 * Copyright (c) 2023 by Liwenyu, All Rights Reserved.
-->
<script setup lang="ts" name="department">
import { computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

// 0. 对modelConfig进行操作, 获取select数据
const modelConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => ({
    label: item.name,
    id: item.id
  }))
  modelConfig.formItems.forEach((item) => {
    if (item.type === 'select' && item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modelConfig
})

// 1. 点击search，content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 2. 点击content，model的操作
const { modelRef, handleEditClick, handleNewClick } = usePageModel()
</script>

<template>
  <div class="department">
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
      <template #leader="scope">
        <span class="leader">{{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>

    <page-model :model-config="modelConfigRef" ref="modelRef" />
  </div>
</template>

<style scoped>
.leader {
  color: red;
}
</style>
