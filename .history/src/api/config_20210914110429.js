import request from '@/utils/request'

export function articleCategory(params) {
  return request({
    url: request('/config/article/category'),
    method: 'get',
    params
  })
}

export function natureCategory(params) {
  return request({
    url: request('/config/nature/category'),
    method: 'get',
    params
  })
}
