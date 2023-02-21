import type { ISearchConfig } from '@/components/page-search/type'

const searchConfig: ISearchConfig = {
  pageName: 'users',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入查询的用户名'
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入查询的真实姓名'
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '手机号码',
      placeholder: '请输入查询的手机号码'
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请输入查询的状态',
      options: [
        { id: 1, label: '启用' },
        { id: 0, label: '禁用' }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
