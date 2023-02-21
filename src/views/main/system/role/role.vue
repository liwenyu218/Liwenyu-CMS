<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'
import useMainStore from '@/store/main/main'
import { mapMenuListToIds } from '@/utils/map-menus'
import type { ElTree } from 'element-plus'

const { modelRef, handleEditClick, handleNewClick } = usePageModel(
  editCallback,
  newCallback
)
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 获取部门数据
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

// 获取取得数据
const otherInfo = ref({})
const handleElTreeCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// 回显Tree数据
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData: any) {
  nextTick(() => {
    const idList = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(idList)
  })
}
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>

<template>
  <div class="role">
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
    <page-model ref="modelRef" :model-config="modelConfig" :other-info="otherInfo">
      <template #menuList>
        <span class="text">权限选择</span>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          :default-expand-all="false"
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-model>
  </div>
</template>

<style lang="less" scoped>
.text {
  margin-left: -68px;
  margin-right: 10px;
}
</style>
