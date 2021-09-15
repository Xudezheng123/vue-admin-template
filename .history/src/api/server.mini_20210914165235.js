/* eslint-disable no-unused-vars */
import request from '@/utils/request'
/*global qs */
import qs from 'qs'

export function getMiniList(params) {
  return request({
    url: request.otherUrl('/article/mini/query'),
    method: 'get',
    params
  })
}
export function pullList(params) {
  return request({
    url: request.otherUrl('/article/gzh/pull'),
    method: 'get',
    params
  })
}

export function Listmini(params) {
  return request({
    url: request.otherUrl('/article/history/list'),
    method: 'get',
    params
  })
}

