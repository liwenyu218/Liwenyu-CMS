import type { IModelConfig } from '@/components/page-model/type'

const modelConfig: IModelConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    { type: 'input', prop: 'name', label: '角色名称', placeholder: '请输入角色名称' },
    { type: 'input', prop: 'intro', label: '权限介绍', placeholder: '请输入权限介绍' },
    { type: 'custom', prop: 'menuList', label: '', slotName: 'menuList' }
  ]
}

export default modelConfig
