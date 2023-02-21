import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1. 动态获取所有路由对象，放在数组中
  // - 路由对象都在独立文件中
  // - 先从文件中获取路由对象存入数组
  const localRoutes: RouteRecordRaw[] = []
  // 1.1 读取route/main里面所有的ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const modules = files[key].default
    localRoutes.push(modules)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1. 动态获取所有路由对象
  const localRoutes = loadLocalRoutes()

  // 2. 根据菜单去匹配路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 给route的顶层菜单添加重定向功能
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: submenu.url })
        }
        // 将二级菜单路由加入
        routes.push(route)
      }

      // 记录第一个被匹配的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }

  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 用户菜单
 * @returns 对应的菜单
 */
export function mapPathToMenu(path: string, userMenus: any) {
  for (const menus of userMenus) {
    for (const submenus of menus.children) {
      if (path === submenus.url) {
        return submenus
      }
    }
  }
}

interface IBreadcrumb {
  name: string
  path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any) {
  const breadcrumbs: IBreadcrumb[] = []

  for (const menus of userMenus) {
    for (const submenus of menus.children) {
      if (path === submenus.url) {
        breadcrumbs.push({ name: menus.name, path: menus.url })
        breadcrumbs.push({ name: submenus.name, path: submenus.url })
      }
    }
  }

  return breadcrumbs
}

export function mapMenuListToIds(menuList: any) {
  const idList: number[] = []

  function recurseGetId(menus: any) {
    for (const item of menus) {
      if (item.children) {
        // 父级id会导致子级也被选中
        recurseGetId(item.children)
      } else {
        idList.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return idList
}

export function mapMenustoPermissions(menuList: any) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else if (item.children) {
        recurseGetPermission(item.children)
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
