import axios from 'axios'

export function request(config) {
  const Instance = new axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
  })

  Instance.interceptors.request.use(
    config => {
      return config
    },
    error => {
      console.log(error)
    }
  )

  Instance.interceptors.response.use(
    res => {
      return res
    },
    error => {
      console.log(error)
    }
  )

  return Instance(config)
}
