<script setup lang="ts"></script>

<template>
  <div class="about">
    <el-card shadow="always">
      <template #header>
        <div class="card-header">
          <span>关于</span>
        </div>
      </template>
      <div class="item">
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus 、TypeScript、Echart5
        等后台系统解决方案。
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.about {
  margin-bottom: 20px;

  .card-header {
    font-weight: bold;
  }
}
</style>
