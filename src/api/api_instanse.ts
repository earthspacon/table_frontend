import axios from 'axios'

export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://chinovovirus-api.herokuapp.com/',
})

api.interceptors.request.use((config) => {
  config.headers.authorization = localStorage.getItem('token')
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let status = (error.response && error.response.status) || 0

    if (status === 401) {
      localStorage.clear()
      window.location = '/login' as any
    } else {
      throw error
    }
  }
)
