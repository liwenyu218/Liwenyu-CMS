import type { IContentConfig } from '@/components/page-content/type'

const contentConfig: IContentConfig = {
  pageName: 'category',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propList: [
    { type: 'selection', width: '60px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', prop: 'name', label: '商品名称', width: '120px' },
    { type: 'normal', prop: 'oldPrice', label: '原价格', width: '90px' },
    { type: 'normal', prop: 'newPrice', label: '新价格', width: '90px' },
    { type: 'normal', prop: 'status', label: '状态', width: '90px' },
    { type: 'custom', prop: 'imgUrl', label: '图片', slotName: 'picture' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', prop: 'handle', label: '操作', width: '200px' }
  ]
}

export default contentConfig
