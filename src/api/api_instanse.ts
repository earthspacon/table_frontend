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
    if (error.response.status === 500 || 502) {
      localStorage.clear()
      window.location = '/login' as any
    } else {
      throw error
    }
  }
)
