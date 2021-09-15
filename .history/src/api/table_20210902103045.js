import request from '@/utils/request'
/* eslint-disable */

export function getList(params) {
  return request({
    url: '/dev-api/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
//菜单管理
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

export function deleteMenus(ids){
  return request({
    url:'/api/menu/deleteMenu?id='+ids,
    method:'post',
  })
}

export function addMenu(params){
  return request({
    url:'/api/menu/editMenu',
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    data:params
  })
}

export function moveMenu(params){
  return request({
    url:'/api/menu/moveMenu',
    method:'post',
    params
  })
}

//权限管理
export function addPermission(params){
  return request({
    url:'/api/authorization/savePermission',
    method:'post',
    params
  })
}

export function editPermission(params){
  return request({
    url:'/api/authorization/updatePermissionInfo',
    method:'post',
    params
  })
}

export function deletePermission(params){
  return request({
    url:'/api/authorization/deletePermission',
    method:'post',
    params
  })
}

export function getPermissionList(params){
  return request({
    url:'/api/authorization/getPermissionList',
    method:'post',
    params
  })
}