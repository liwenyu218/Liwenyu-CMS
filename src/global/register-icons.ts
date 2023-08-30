import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App<Element>) {
  // Object.entries() 静态方法返回一个数组，包含给定对象自有的可枚举字符串键属性的键值对。
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons
