<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue' // 这里的panelaccount相当于一个类, 而下面的使用相当于创建的实例
import PanelPhone from './panel-phone.vue'

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})

const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PanelAccount>>()

const handleLoginAction = () => {
  if (activeName.value === 'phone') {
    console.log('手机登录')
  } else {
    accountRef.value?.loginAction(isRemPwd.value)
  }
}
</script>

<template>
  <div class="login-panel">
    <!-- 顶部区域 -->
    <h1 class="title">Liwenyu-CMS</h1>
    <!-- tabs区域 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane class="pwd-login" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginAction">
      立即登录
    </el-button>
  </div>
</template>

<style lang="less" scoped>
.login-panel {
  width: 333px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 10px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    margin-left: 5px;
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
