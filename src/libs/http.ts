import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'

const http = axios.create({
  baseURL: '/api',
  timeout: 5 * 1000
})

const beforeRequest = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers!.Authorization = token
  }
  return config
}

const responseSuccess = (res: AxiosResponse) => {
  return Promise.resolve(res.data)
}

const responseFailure = (err: AxiosError) => {
  return Promise.reject(err)
}

http.interceptors.request.use(beforeRequest)
http.interceptors.response.use(res => {
  return res.data
}, responseFailure)

export interface Response<T> {
  code: number;
  msg: string;
  data: T;
}

export default http
