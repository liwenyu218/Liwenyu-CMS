interface IUsersList {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISystemState {
  usersList: IUsersList[]
  usersTotalCount: number

  pageList: any[]
  pageTotalCount: number
}
