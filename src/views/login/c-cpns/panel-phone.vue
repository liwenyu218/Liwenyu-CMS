<script setup lang="ts">
import { ElMessage } from 'element-plus'

const getCodeClick = () => {
  ElMessage({
    message: '尴尬！此功能尚未开发...',
    type: 'warning'
  })
}
</script>

<template>
  <div class="panel-phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input />
          <el-button class="get-code" type="primary" @click="getCodeClick">
            获取验证码
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.verify-code {
  display: flex;

  .get-code {
    margin-left: 10px;
  }
}
</style>
