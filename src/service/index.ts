import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import LWYRequest from './request'

const lwyRequest = new LWYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // Axios1.2.2的header上没有Authorization
        ;(config.headers as any).Authorization =
          'Bearer ' + localCache.getCache(LOGIN_TOKEN)
      }
      return config
    }
  }
})

export default lwyRequest
