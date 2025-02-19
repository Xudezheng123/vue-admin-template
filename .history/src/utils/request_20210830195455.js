import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImZhNjc3ZDUyNWMwZTRlZTQ4NWE2MTU0MzkzNzc5NGFmIn0.eyJqdGkiOiJhekNuM2lwMERYVGU2YVk2NGxUNHRBIiwiaWF0IjoxNjMwMzIyMTEzLCJleHAiOjE2MzA5MjY5MTMsIm5iZiI6MTYzMDMyMjA1Mywic3ViIjoiQVVUSCIsImF1ZCI6IkdDWlgiLCJhY2NvdW50Ijoie1wiYXV0aG9yaXRpZXNcIjpbe1wiY29kZVwiOlwic3VwZXJfYWRtaW5cIn1dLFwidXNlcm5hbWVcIjpcImFkbWluXCIsXCJ1c2VySWRcIjoxfSJ9.ST5vYfGLNWECoL0l9LObCbUVY2aXsFLo45cGZxywgCw8HSGsc2cYNiJWOaXm7wOqNv7G_JxbufZJ3IhZH30aoL0D3aa7m5knUT8-hRL-gBlRZhXsEtu30WMhQUWbciDwpdv8TxQLO-3Hz32YdJh7KnvtYW0LlChEspb-E2Hllue1KzHZYfC3QPdXqQ3hkThCC9aBewf1HXqr3EcpcrEQXLtx7MsCZsJvxLCFwda59kgj2JNAR0RWK4jhEPCEvb6J4gBwjknbjD_GxoYApu6OONh6_bJWURwd4stnMWeeFzjwcRYDfe2TfHGCX9UD0WFcGn6ImPo1BIjCwkGSZmGUGg'
      console.log(config)
    }
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

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
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
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
