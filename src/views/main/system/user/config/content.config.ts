const contentConfig = {
  pageName: 'users',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propList: [
    { type: 'selection', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },

    { type: 'normal', prop: 'name', label: '用户名', width: '150px' },
    { type: 'normal', prop: 'realname', label: '真实姓名', width: '150px' },
    { type: 'normal', prop: 'cellphone', label: '电话号码', width: '220px' },
    { type: 'custom', prop: 'enbale', label: '状态', width: '150px', slotName: 'enable' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
