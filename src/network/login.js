import { request } from './request'

export function getLoginResponse(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}
