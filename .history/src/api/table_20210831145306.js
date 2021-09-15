import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/dev-api/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getMenus(params){
  return request({
    url: '/api/menu/getAllMenu',
    method:'get',
    params
  })
}

export function deleteMenu(params){
  return request({
    url:'/api/menu/deleteMenu',
    method:'post',
    params
  })
}

export function addMenu(params){
  return request({
    url:'/api/menu/editMenu',
    method:'post',
    params
  })
}
