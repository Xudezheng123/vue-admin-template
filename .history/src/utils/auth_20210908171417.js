// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

export function getToken(TokenKey) {
  return localStorage.getItem(TokenKey)
}

export function setToken(TokenKey, token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken(TokenKey) {
  return localStorage.removeItem(TokenKey)
}

// export function getToken(TokenKey) {
//   return Cookies.get(TokenKey)
// }

// export function setToken(TokenKey, token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken(TokenKey) {
//   return Cookies.remove(TokenKey)
// }
