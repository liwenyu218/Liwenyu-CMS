import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对AxiosRequestConfig进行扩展
interface LWYinterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface LWYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LWYinterceptors<T>
}
