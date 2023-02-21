import {
  getAmountListData,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      // 如果得到的数据太复杂,可自己写一个工具函数格式化数据,不要直接渲染到页面上
      getAmountListData().then((res) => {
        this.amountList = res.data
      })
      getGoodsCategoryCount().then((res) => {
        this.goodsCategoryCount = res.data
      })
      getGoodsCategorySale().then((res) => {
        this.goodsCategorySale = res.data
      })
      getGoodsCategoryFavor().then((res) => {
        this.goodsCategoryFavor = res.data
      })
      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data
      })
    }
  }
})

export default useAnalysisStore
