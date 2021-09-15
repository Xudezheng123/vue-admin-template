/* eslint-disable no-unused-vars */
import request from '@/plugin/axios'
/*global qs */
import qs from 'qs'
console.log(qs, 'qs')
export function getMiniList(params) {
  return request({
    url: request.adornUrl('/article/mini/query'),
    method: 'get',
    params
  })
}
export function pullList(params) {
  return request({
    url: request.adornUrl('/article/gzh/pull'),
    method: 'get',
    params
  })
}

export function Listmini(params) {
  return request({
    url: request.adornUrl('/article/history/list'),
    method: 'get',
    params
  })
}

