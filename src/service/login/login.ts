import lwyRequest from '..'
import type { IAccount } from '@/types'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return lwyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoByID(id: number) {
  return lwyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenusByRoleId(id: number) {
  return lwyRequest.get({
    url: `/role/${id}/menu`
  })
}
