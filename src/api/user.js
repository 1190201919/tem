import request from '@/utils/request'

export function login() {
  return request({
    url: '/api/login',
    method: 'get',
  })
}

export function getInfo(token) {
  return request({
    url: '/api/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
