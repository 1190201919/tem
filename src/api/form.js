import request from '@/utils/request'

export function addIn(form) {
  return request({
    url: '/api/intickets',
    method: 'post',
    data:form
  })
}

export function check(form,itid) {
  return request({
    url: '/api/intickets/'+itid,
    method: 'patch',
    data:form
  })
}

export function goodin(form) {
  return request({
    url: '/api/goods/',
    method: 'post',
    data:form
  })
}

export function getIT(itid) {
  return request({
    url: '/api/intickets/'+itid,
    method: 'get',
  })
}

export function getGood(gid) {
  return request({
    url: '/api/goods/'+gid,
    method: 'get',
  })
}

export function inware(form) {
  return request({
    url: '/api/goodstickets/',
    method: 'post',
    data:form
  })
}

export function getGT(gtid) {
  return request({
    url: '/api/goodstickets/'+gtid,
    method: 'get',
  })
}

export function getITA() {
  return request({
    url: '/api/intickets/',
    method: 'get',
  })
}

export function checkG(form,gtid) {
  return request({
    url: '/api/goodstickets/'+gtid,
    method: 'patch',
    data:form
  })
}

export function getGTA() {
  return request({
    url: '/api/goodstickets/',
    method: 'get',
  })
}