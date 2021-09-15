import Cookies from 'js-cookie'
import { RefreshToken } from '@api/sys.login'  

// const TokenKey = 'vue_admin_template_token'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(TokenKey, token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}

export function refreshToken(interval){
  setInterval(() => {
    RefreshToken({refreshToken: getToken('refreshToken')}).then(res=>{
      setToken('accessToken', res.accessToken) //用户token
      setToken('refreshToken', res.refreshToken) // 刷新token
      setToken('pattern', res.pattern) //
      setToken('expiresIn', res.expiresIn) //刷新时限
    })
  }, interval);
}
