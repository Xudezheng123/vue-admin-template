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
