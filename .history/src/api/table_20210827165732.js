import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getMenus(params){
  return request({
      url: '/vue-admin-template/menu/getAllMenu',
      method:'get',
      params
  })
}
