<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaJson from '../data/china.json'

echarts.registerMap('china', ChinaJson as any)

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

// 下面可抽取为hook
const echartRef = ref<HTMLElement>()
const echartResize = (echartInstance: echarts.ECharts) => {
  echartInstance.resize()
  console.log(11)
}
onMounted(() => {
  // 1. 初始化echarts实例
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })

  // 2. 第一次进行setOption watchEffect监听option变化, 重新执行
  watchEffect(() => echartInstance.setOption(props.option))

  // 3. 监听window变化, 使图适应窗口的变化
  // 优化: Unmounted时销毁监听, 节流
  window.addEventListener('resize', function () {
    echartResize(echartInstance)
  })
})
</script>

<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<style lang="less" scoped>
.base-echart {
  color: red;
}

.echart {
  height: 300px;
}
</style>
