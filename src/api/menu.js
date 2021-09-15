import request from '@/utils/request'

export function getMenus(params){
    return request({
        url: '/vue-admin-template/menu/getAllMenu',
        method:'get',
        params
    })
}