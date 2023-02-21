<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<template>
  <div class="header-crumb">
    <!-- 图标已经全局注册过, 所以写法与官方不同 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped></style>
