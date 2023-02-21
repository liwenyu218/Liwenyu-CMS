<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modelRef, handleEditClick, handleNewClick } = usePageModel()
</script>

<template>
  <div class="category">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    />
    <page-model ref="modelRef" :model-config="modelConfig" />
  </div>
</template>

<style lang="less" scoped></style>
