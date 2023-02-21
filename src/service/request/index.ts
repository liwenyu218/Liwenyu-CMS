import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LWYRequestConfig } from './type'

// 拦截器: 蒙版loading/token/修改配置

/**
 * 两个难点:
 * 1. 拦截进行精细控制
 *  > 全局拦截器
 *  > 实例拦截器
 *  > 单次请求拦截器
 * 2. 响应结果的类型处理(泛型)
 */

class LWYRequest {
  instance: AxiosInstance

  // request实例 => axios实例
  constructor(config: LWYRequestConfig) {
    this.instance = axios.create(config)

    // 每个实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 这样调用的网络请求中,不需要再写res.data了, 相当于这里进行了解包
        // 但是解包后类型不再是AxiosResponces了
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的LWYRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求方法
  request<T = any>(config: LWYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors?.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors?.responseSuccessFn(res)
          }

          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: LWYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: LWYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: LWYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: LWYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default LWYRequest
