import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import { get } from 'https';
/* eslint-disable */
// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV !== "production"? "/server" : process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
service.otherUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截! production
  const proxyApi = '/api'
  console.log('address:',process.env.NODE_ENV !== 'production' ? proxyApi : process.env.VUE_APP_API)
  return (process.env.NODE_ENV !== 'production' ? proxyApi : process.env.VUE_APP_API) + actionName
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getToken('accessToken')) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = getToken('pattern')+' '+getToken('accessToken')
    }
    // console.log("config:",config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 403 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已经登出, 您可以取消停留在当前页面或者再次登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
