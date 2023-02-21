import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoByID,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenustoPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 指定state类型：1. 泛型 2. 指定state函数返回值
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1. 账号登录，获取token等信息
      const loginRes = await accountLoginRequest(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2. 获取登录用户的详细信息(role角色)
      const userInfoResult = await getUserInfoByID(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3. 根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4. 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 重要: 获取按钮权限
      const permissions = mapMenustoPermissions(userMenus)
      this.permissions = permissions

      // 重要：动态路由添加
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 5. 路由跳转
      router.push('/main')
    },

    loadLocalCacheAction() {
      // 用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo') // 修改为常量
      const userMenus = localCache.getCache('userMenus')

      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        // 1. 请求所有的roles/department数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 重要: 获取按钮权限
        const permissions = mapMenustoPermissions(userMenus)
        this.permissions = permissions

        // 2. 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
      }
    }
  }
})

export default useLoginStore
