import lwyRequest from '@/service'

export function postUserListData(queryInfo: any) {
  return lwyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return lwyRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return lwyRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return lwyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

/**针对页面的网络请求：增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return lwyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return lwyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return lwyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return lwyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
