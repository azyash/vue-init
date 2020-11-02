import { request } from './request'

// 登录
export function login(data) {
  return request({
    url: '/api/NewLogin/Login',
    method: 'post',
    params: data,
  })
}
