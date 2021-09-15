import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
/* eslint-disable */
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
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
      config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = 'bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJjM2E3NTY1Yy0zMDZjLTQ0YjktYjg0YS01OGRiYWYwY2Q3MGMiLCJhY2NvdW50Ijoie1wiYXV0aG9yaXRpZXNcIjpbe1wiY29kZVwiOlwic3VwZXJfYWRtaW5cIn1dLFwidXNlcm5hbWVcIjpcImFkbWluXCIsXCJ1c2VySWRcIjoxfSIsImlhdCI6MTYzMDMzMTIzNywiZXhwIjoxNjMwOTM2MDM3LCJuYmYiOjE2MzAzMzExNzcsImlzcyI6IkNlbnRlci1vZi1EaWdpdGFsLUNpdHktRW5naW5lZXJpbmciLCJzdWIiOiJTZWN1cml0eS1DbGllbnQiLCJhdWQiOiJBdXRoZW50aWNhdGlvbiJ9.SV4dtPPSoBggaPJ4avGX__72wl7Bxv9w9KjXvXXSOTW7I305F3MzDs0_zQ2d0FUj7OknK8YIusCR1bUM10rKWzCT-QrH8IO2zwk-2PzR3bNU3RnpD9-8Q-FSQb0qnytozyprZNbf9ptISrbDo_jJ-fIiQe9hujtxlrIIGfxhYLWvcybet33ka1cS8rGBmkJ8D2-6xk94Alph4q7wvC5L6OI8AKIFRqRv__6u1ycP4NR1GUf0m5pMPNhL_o_4RfOxH65SSIgDWHSkP4APvOlnI_L5VFjGC-6sE9R3weA5K2GVdbwGKmuX2rZeevozawOXUZ9CKUvQknVQh7eslInZEA';
      // console.log(config)
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
