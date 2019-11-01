import axios from 'axios'
// 导入session工具
import session from '@/utils/session'
import router from '../router'
// 引入json-bigint处理最大安全数问题
import JSONBIG from 'json-bigint'

// 设置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 处理js中使用JSON.parse转换超出最大数产生偏差的问题
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (error) {
    return data
  }
}]

// 设置默认请求头   一旦登录页刷新，这里直接凉凉   刷新 ===  执行关于Vue的所有代码
// let data = session.getToken() ? session.getToken() : {}

// axios.defaults.headers.Authorization = `Bearer ${data.token}`

// 基于上述问题的bug，所以需要使用 请求拦截器 来解决
// 拦截器axios.interceptors,request.use 参数包含两个参数
axios.interceptors.request.use(config => {
  let data = session.getToken() || {}
  config.headers.Authorization = `Bearer ${data.token}`

  return config
}, error => {
  return Promise.reject(error)
})

// 如果发送的token失效的话，则需要使用 响应拦截器 来解决
axios.interceptors.response.use(config => config, error => {
  //   console.dir(error)
  if (error.response.status === 401) {
    // window.location.hash = '#/login'
    return router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
