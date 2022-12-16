import http, { Response } from '@/libs/http'

/**
 * 登录
 * @param params
 */
export function apiLogin (
  params: { username: string, password: string }
): Promise<Response<{ token: string }>> {
  return http.post('/user/login', params)
}

/**
 * 注册
 * @param params
 */
export function apiRegister(
  params: { username: string, password: string }
): Promise<Response<{ token: string }>> {
  return http.post('/user/register', params)
}
