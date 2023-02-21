<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus' // ts逻辑中的组件需要手动引入
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PWD = 'password'

// 账号信息
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PWD) ?? ''
})

// 账号信息校验
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入账号信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须为6~20个数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须为3个以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 执行账号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (isRemPwd: boolean) => {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      // 获取用户的账号密码
      const name = account.name
      const password = account.password

      // 发送网络请求(直接在store中进行请求更好)
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          // 记录账号密码
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PWD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PWD)
        }
      })
    } else {
      ElMessage.error('Oops, 请输入正确的账号与密码.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<template>
  <div class="panel-account">
    <el-form
      :model="account"
      label-width="60px"
      :rules="accountRules"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.panel-account {
  color: red;
}
</style>
