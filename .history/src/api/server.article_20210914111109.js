/* eslint-disable no-unused-vars */
import request from '@/plugin/axios'
/*global qs */
import qs from 'qs'
console.log(qs, 'qs')
export function getArticleMessage(params) {
  return request({
    url: request.adornUrl('/article/query'),
    method: 'get',
    params
  })
}
// 图文下拉选项
export function articleListSelector(params) {
  return request({
    url: request.adornUrl('/article/select'),
    method: 'get',
    params
  })
}
export function saveArticleMessage(data) {
  // const formData = new FormData()
  // for (let key in data) {
  //   formData.append(key,data[key])
  // }
  return request({
    url: request.adornUrl('/article/add'),
    method: 'post',
    // headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data
  })
}

export function deleteArticleMessage(data) {
  return request({
	url:request.adornUrl('/article/publish/del'),
    // url: request.adornUrl('/article/del'),
	// url: request.adornUrl('/media/delete'),
    method: 'post',
    data: qs.stringify(data)
  })
}

// 小编图文详情
export function articleSave(data) {
  const formData = new FormData()

  for (const key in data) {
    console.log(key)
    formData.append(key, data[key])
  }
  return request({
    url: request.adornUrl('/article/addOrUpdate'),
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formData
  })
}

// 小编图文详情
export function articleDetail(params) {
  return request({
    url: request.adornUrl('/article/get'),
    method: 'get',
    params
  })
}

export function articleCategory(params) {
  return request({
    url: request.adornUrl('/config/article/category'),
    method: 'get',
    params
  })
}

//拉取素材
export function pullSuCai(params) {
  return request({
    url: request.adornUrl('/article/gzh/article/pull'),
    method: 'get',
    params
  })
}
