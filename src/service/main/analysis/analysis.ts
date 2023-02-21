import lwyRequest from '@/service'

export function getAmountListData() {
  return lwyRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return lwyRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return lwyRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return lwyRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return lwyRequest.get({
    url: '/goods/address/sale'
  })
}
