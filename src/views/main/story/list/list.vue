<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'

import contentConfig from './config/content.config'
</script>

<template>
  <div class="list">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<style lang="less" scoped></style>
