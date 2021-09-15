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
    url: '/menu/getAllMenu',
    method:'get',
    params
  })
}

export function getMenuDetail(id){
  return request({
    url:'/menu/getMenuDetail?id='+id,
    method:'get'
  })
}

export function deleteMenus(ids){
  return request({
    url:'/menu/deleteMenu?id='+ids,
    method:'post',
  })
}

export function addMenu(params){
  return request({
    url:'/menu/editMenu',
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    data:params
  })
}

export function moveMenu(params){
  return request({
    url:'/menu/moveMenu',
    method:'post',
    params
  })
}

export function getAllPermissions(params){
  return request({
    url:'/authorization/getAllPermissions',
    method:'get',
    params
  })
}
//权限管理
export function addPermission(params){
  return request({
    url:'/authorization/savePermission',
    method:'post',
    params
  })
}

export function editPermission(params){
  return request({
    url:'/authorization/updatePermissionInfo',
    method:'post',
    params
  })
}

export function deletePermission(ids){
  return request({
    url:'/authorization/deletePermission?id='+ids,
    method:'post'
  })
}

export function getPermissionList(params){
  return request({
    url:'/authorization/getPermissionList',
    method:'get',
    params
  })
}

//部门管理
export function addDept(params){
  return request({
    url:'/user/saveDept',
    method:'post',
    params
  })
}

export function editDept(params){
  return request({
    url:'/user/updateDept',
    method:'post',
    params
  })
}

export function deleteDept(id){
  return request({
    url:'/user/deleteDept?id='+id,
    method:'post'
  })
}

export function getAllDepartmentList(params){
  return request({
    url:'/user/getAllDepartment',
    method:'get',
    params
  })
}

//角色管理
export function addRole(params){
  return request({
    url:'/authorization/saveRole',
    method:'post',
    params
  })
}

export function editRole(params){
  return request({
    url:'/authorization/updateRole',
    method:'post',
    params
  })
}

export function deleteRole(id){
  return request({
    url:'/authorization/deleteRole?id='+id,
    method:'post'
  })
}

export function getRoleList(params){
  return request({
    url:'/authorization/getRoleList',
    method:'get',
    params
  })
}

//用户管理
export function getManagerList(params){
  return request({
    url:'/user/getManagerList',
    method:'get',
    params
  })
}

export function addManager(params){
  return request({
    url:'/user/saveManager',
    method:'post',
    params
  })
}

export function editManager(params){
  return request({
    url:'/user/updateManager',
    method:'post',
    params
  })
}

export function deleteManager(id){
  return request({
    url:'/user/deleteManager?id='+id,
    method:'post'
  })
}

export function resetPassword(id){
  return request({
    url:'/user/resetPassword?id='+id,
    method:'post'
  })
}

export function bindRole(params){
  return request({
    url:'/user/bindRole',
    method:'post',
    params
  })
}

export function getUserRole(id){
  return request({
    url:'/authorization/getUserRole?userId='+id,
    method:'get',
  })
}
