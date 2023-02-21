const contentCofig = {
  pageName: 'list',
  header: {
    title: '故事列表',
    btnTitle: '新建菜单'
  },
  propList: [
    { prop: 'index', label: '序号', width: '80px' },
    { type: 'normal', prop: 'title', label: '故事标题', width: '200px' },
    { type: 'normal', prop: 'story', label: '我的故事' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}

export default contentCofig
