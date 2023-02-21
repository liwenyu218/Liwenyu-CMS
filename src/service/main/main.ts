import lwyRequest from '..'

export function getEntireRoles() {
  return lwyRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return lwyRequest.post({
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return lwyRequest.post({
    url: '/menu/list'
  })
}
