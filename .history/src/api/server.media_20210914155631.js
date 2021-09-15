/* eslint-disable no-unused-vars */
import request from '@/plugin/axios'
/*global qs */
import qs from 'qs'
// 查找图文素材列表
export function getMediaPagelist(params = {
  pageNum: 1,
  pageSize: 10,
  title: ''
}) {
  return request({
    url: request.adornUrl('/media/list'),
    method: 'get',
    params
  })
}

// 图文素材预览
export function previewMedia(data = {
  id: '',
  wxName: ''
}) {
  return request({
    url: request.adornUrl('/media/preview'),
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取单个图文素材信息
export function getMediaDetail(params = {
  id: ''
}) {
  return request({
    url: request.adornUrl('/media/get'),
    method: 'get',
    params
  })
}
// 保存图文素材至公众号
export function saveMedia(data) {
  console.log(request.adornUrl('/media/addupt'))
  return request({
    url: request.adornUrl('/media/addupt'),
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除图文素材
export function deleteMedia(data = { id: '' }) {
  return request({
    url: request.adornUrl('/media/delete'),
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 保存并群发图文素材
export function mediaSaveAndSend(data) {
  return request({
    url: request.adornUrl('/media/savesend'),
    method: 'post',
    data: qs.stringify(data, { arrayFormat: 'indices' })
  })
}

// 单独群发图文素材
export function mediaSendall(data) {
  return request({
    url: request.adornUrl('/media/sendall'),
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取素材群发剩余次数
export function mediaSendCount(data) {
  return request({
    url: request.adornUrl('/media/month/count'),
    method: 'get'
  })
}
