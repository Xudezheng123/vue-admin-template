import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import { RefreshToken } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  mounted() {
    if (getToken('refreshToken') === null) {
      return
    }else{
      RefreshToken({refreshToken: getToken('refreshToken')}).then(res => {
        const { data } = res;
        setToken('accessToken',data.accessToken);
        setToken('refreshToken',data.refreshToken);
        setToken('pattern',data.pattern);
        setToken('expiresIn',data.expiresIn);
        setInterval(() => {
          RefreshToken({refreshToken: getToken('refreshToken')}).then(respone=>{
            const { data } = respone;
            setToken('uuid', data.userId);
            setToken('username', data.username);
            setToken('accessToken', data.accessToken) //用户token
            setToken('refreshToken', data.refreshToken) // 刷新token
            setToken('pattern', data.pattern) //
            setToken('expiresIn', data.expiresIn) //刷新时限
          })
        }, (getToken('expiresIn')-300) * 1000);
      }).catch(error=>{
      })
    }
  },
  render: h => h(App),
})
