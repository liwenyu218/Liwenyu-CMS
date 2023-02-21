<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import chartCard from './c-cpns/chart-card/chart-card.vue'
import CountCard from './c-cpns/count-card/count-card.vue'
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts/'
import useAnalysisStore from '@/store/main/analysis/analysis'

// 发起数据请求并获得数据
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore)

// format data
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<template>
  <div class="dashboard">
    <!-- 1. 顶部数字显示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <!-- 2. 中间部分的图标 -->
    <el-row :gutter="10">
      <el-col :span="7" :xs="24">
        <chart-card header="分类商品数量">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10" :xs="24">
        <chart-card>
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7" :xs="24">
        <chart-card>
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>
    <!-- 3. 底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12" :xs="24">
        <chart-card>
          <line-echart v-bind="showGoodsCategorySale" />
        </chart-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <chart-card>
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.dashboard {
  color: red;

  .el-col {
    margin-bottom: 10px;
  }
}
</style>
