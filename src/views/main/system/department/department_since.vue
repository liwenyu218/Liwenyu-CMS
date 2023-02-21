<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModel from './c-cpns/page-model.vue'

// 点击search，content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchPageListData(queryInfo)
}
const handleResetClick = () => {
  contentRef.value?.fetchPageListData()
}

// 点击content，model的操作
const modelRef = ref<InstanceType<typeof PageModel>>()
const handleNewClick = () => {
  modelRef.value?.setModelVisible()
}
const handleEditClick = (itemData: any) => {
  modelRef.value?.setModelVisible(false, itemData)
}
</script>

<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-model ref="modelRef" />
  </div>
</template>

<style scoped></style>
