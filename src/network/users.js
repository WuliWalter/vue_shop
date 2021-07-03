import { request } from './request'

export function getUsersData(params) {
  return request({
    url: 'users',
    type: 'get',
    params
  })
}

// export function changeState(userInfo) {
//   var a = `users/${userInfo.id}/state/${userInfo.mg_state}`
//   console.log(a)
//   return request({
//     url: a,
//     type: 'PUT'
//   })
// }
