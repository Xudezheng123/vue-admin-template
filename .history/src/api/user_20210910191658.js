import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  return request({
    url: '/authentication/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function RefreshToken(data){
  return request({
    url:'/authentication/tokenRefresh',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// export function getInfo(token) {
//   return request({
//     url: '/dev-api/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/dev-api/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
