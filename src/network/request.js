import axios from 'axios'
import Router from '../router'

export function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 10000,
  })

  instance.interceptors.request.use(
    //统一添加token
    (config) => {
      if (sessionStorage.userInfo) {
        // config.params['token'] = 1212
        config.params['token'] = JSON.parse(sessionStorage.userInfo).Token
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    },
  )
  instance.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      if (err.response.data.Message == 'Token已经失效，请重新登录') {
        localStorage.clear()
        sessionStorage.clear()
        Router.push('/login')
      }
      return Promise.reject(err)
    },
  )

  return instance(config)
}
