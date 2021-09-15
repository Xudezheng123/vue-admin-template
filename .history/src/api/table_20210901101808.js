import request from '@/utils/request'
/* eslint-disable */

export function getList(params) {
  return request({
    url: '/dev-api/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getAllMenu(params){
  return request({
    url: '/api/menu/getAllMenu',
    method:'get',
    params
  })
}

export function getMenuDetail(id){
  return request({
    url:'/api/menu/getMenuDetail?id='+id,
    method:'get'
  })
}

export function deleteMenus(params){
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
    data:JSON.stringify(params),
    headers:{
      'Content-Type':'application/json'
    }
  })
}
