import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListRes = await postUserListData(queryInfo)
      const { list, totalCount } = userListRes.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },

    async deleteUserByIdAction(id: number) {
      // 1. 发送删除网络请求
      const deleteRes = await deleteUserById(id)
      console.log(deleteRes)

      // 2. 重新请求数据
      this.postUserListAction({ offset: 0, size: 10 })
    },

    async newUserDataAction(userInfo: any) {
      const newUserRes = await newUserData(userInfo)
      console.log(newUserRes)

      this.postUserListAction({ offset: 0, size: 10 })
    },

    async editUserDataAction(id: number, userInfo: any) {
      const editUserRes = await editUserData(id, userInfo)
      console.log(editUserRes)

      this.postUserListAction({ offset: 0, size: 10 })
    },

    /** 针对页面的数据，增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListRes = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListRes.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },

    async deletePageByIdAction(pageName: string, id: number) {
      const deletePageRes = await deletePageById(pageName, id)
      console.log(deletePageRes)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },

    async newPageDataAction(pageName: string, pageInfo: any) {
      const newPageRes = await newPageData(pageName, pageInfo)
      console.log(newPageRes)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },

    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editPageRes = await editPageData(pageName, id, pageInfo)
      console.log(editPageRes)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
