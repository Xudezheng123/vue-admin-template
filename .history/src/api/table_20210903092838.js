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

export function getAllPermissions(params){
  return request({
    url:'/api/authorization/getAllPermissions',
    method:'get',
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

export function deletePermission(ids){
  return request({
    url:'/api/authorization/deletePermission?id='+ids,
    method:'post'
  })
}

export function getPermissionList(params){
  return request({
    url:'/api/authorization/getPermissionList',
    method:'get',
    params
  })
}

//部门管理
export function addDept(params){
  return request({
    url:'/api/authorization/saveDept',
    method:'post',
    params
  })
}

export function editDept(params){
  return request({
    url:'/api/authorization/updateDept',
    method:'post',
    params
  })
}

export function deleteDept(ids){
  return request({
    url:'/api/authorization/deleteDept?id='+ids,
    method:'post'
  })
}

export function getAllDepartmentList(params){
  return request({
    url:'/api/authorization/getAllDepartment',
    method:'get',
    params
  })
}