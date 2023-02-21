<script setup lang="ts">
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  background: url('@/assets/img/login-bg.svg');
}
</style>
