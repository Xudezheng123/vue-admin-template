import request from '@/utils/request'

export function getMenus(params){
    return request({
        url: '/menu/getAllMenu',
        method:'get',
        params
    })
}