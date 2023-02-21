import { createPinia } from 'pinia'
import useLoginStore from '@/store/login/login'
import type { App } from 'vue'

function registerStore(app: App<Element>) {
  const pinia = createPinia()
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
