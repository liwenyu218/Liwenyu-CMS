<script setup lang="ts">
import About from './c-cpns/about.vue'
import TechList from './c-cpns/tech-sta.vue'
</script>

<template>
  <div class="overview">
    <about />
    <tech-list />
  </div>
</template>

<style lang="less" scoped>
.overview {
  background-color: #fff;
  border-radius: 8px;
  :deep(.el-card__header span) {
    font-weight: 700;
  }
}
</style>
