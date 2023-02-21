import type { IContentConfig } from '@/components/page-content/type'

const contentConfig: IContentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新建类别'
  },
  propList: [
    { type: 'selection', width: '80px' },
    { type: 'index', label: '序号', width: '100px' },
    { type: 'normal', prop: 'name', label: '类别名称', width: '200px' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', prop: 'handle', label: '操作', width: '200px' }
  ]
}

export default contentConfig
