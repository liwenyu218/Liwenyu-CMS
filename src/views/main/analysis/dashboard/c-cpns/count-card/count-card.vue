<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  amount: '',
  titie: '商品总销量',
  tips: '所有商品总销量',
  number1: 810975,
  number2: 810975,
  subtitle: '商品总销量'
})

// 创建countup实例对象,实现数字变化效果
const count1Ref = ref<HTMLSpanElement>()
const count2Ref = ref<HTMLSpanElement>()
const countupConfig = {
  prefix: props.amount === 'saleroom' ? '￥' : ''
}
onMounted(() => {
  // onMounted里确保此时count1Ref已经挂载
  // 参数一: 执行动画的元素; 参数二: 数字增加到
  const countup1 = new CountUp(count1Ref.value!, props.number1, countupConfig)
  const countup2 = new CountUp(count2Ref.value!, props.number2, countupConfig)
  countup1.start()
  countup2.start()
})
</script>

<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><InfoFilled /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 0.5px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;

    span {
      margin-right: 5px;
    }
  }
}
</style>
