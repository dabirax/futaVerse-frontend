import axios from 'axios'
import { showSessionExpiredToast } from '@/lib/session-expiry'

const baseURL = `${import.meta.env.VITE_API_URL}`

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

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
      showSessionExpiredToast()
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
      showSessionExpiredToast()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

const BASE_URL = import.meta.env.VITE_API_URL || ''

let isFetching = false
let fetchQueue: Array<(token: string) => void> = []

async function refreshAccessToken(): Promise<string> {
  const refreshToken = sessionStorage.getItem('refresh_token')
  if (!refreshToken) throw new Error('No refresh token')

  const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, {
    refresh: refreshToken,
  })

  const newAccess = data.access ?? data.access_token
  const newRefresh = data.refresh ?? data.refresh_token

  sessionStorage.setItem('access_token', newAccess)
  if (newRefresh) sessionStorage.setItem('refresh_token', newRefresh)
  api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`

  return newAccess
}

export async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const token = sessionStorage.getItem('access_token')
  const headers = new Headers(init?.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Content-Type') && !(init?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  let response = await fetch(input, { ...init, headers })

  if (response.status === 401) {
    const refreshToken = sessionStorage.getItem('refresh_token')
    if (!refreshToken) {
      showSessionExpiredToast()
      throw new Error('Session expired')
    }

    if (isFetching) {
      const newToken = await new Promise<string>((resolve) => {
        fetchQueue.push(resolve)
      })
      const retryHeaders = new Headers(init?.headers)
      retryHeaders.set('Authorization', `Bearer ${newToken}`)
      if (
        !retryHeaders.has('Content-Type') &&
        !(init?.body instanceof FormData)
      ) {
        retryHeaders.set('Content-Type', 'application/json')
      }
      return fetch(input, { ...init, headers: retryHeaders })
    }

    isFetching = true
    try {
      const newToken = await refreshAccessToken()
      fetchQueue.forEach((cb) => cb(newToken))
      fetchQueue = []

      const retryHeaders = new Headers(init?.headers)
      retryHeaders.set('Authorization', `Bearer ${newToken}`)
      if (
        !retryHeaders.has('Content-Type') &&
        !(init?.body instanceof FormData)
      ) {
        retryHeaders.set('Content-Type', 'application/json')
      }
      response = await fetch(input, { ...init, headers: retryHeaders })
    } catch {
      fetchQueue = []
      showSessionExpiredToast()
      throw new Error('Session expired')
    } finally {
      isFetching = false
    }
  }

  return response
}
