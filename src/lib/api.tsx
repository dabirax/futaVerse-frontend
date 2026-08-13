import axios from 'axios'

const baseURL = `${import.meta.env.VITE_API_URL}`

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

//  attach access token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

const redirectToLogin = () => {
  sessionStorage.clear()
  window.location.href = '/login'
}

//  silently refresh the access token on 401, then replay the request
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const isAuthEndpoint = original?.url?.includes('/api/auth/')

    if (error.response?.status !== 401 || isAuthEndpoint || original?._retry) {
      return Promise.reject(error)
    }

    const refreshToken = sessionStorage.getItem('refresh_token')
    if (!refreshToken) {
      redirectToLogin()
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push((newToken: string) => {
          original.headers.Authorization = `Bearer ${newToken}`
          resolve(api(original))
        })
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post(`${baseURL}/api/auth/refresh`, {
        refresh: refreshToken,
      })

      const newAccess = data.access ?? data.access_token
      const newRefresh = data.refresh ?? data.refresh_token

      sessionStorage.setItem('access_token', newAccess)
      if (newRefresh) sessionStorage.setItem('refresh_token', newRefresh)
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`

      refreshQueue.forEach((cb) => cb(newAccess))
      refreshQueue = []

      original.headers.Authorization = `Bearer ${newAccess}`
      return api(original)
    } catch (refreshError) {
      refreshQueue = []
      redirectToLogin()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)
