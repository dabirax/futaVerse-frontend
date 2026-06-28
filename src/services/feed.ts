import { PaginatedResponse } from './events'

const getHeaders = (): Record<string, string> => {
  const token = sessionStorage.getItem('access_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

const getBaseUrl = () => import.meta.env.VITE_API_URL || ''

export const FeedService = {
  list: async (params?: { page?: number; size?: number }): Promise<PaginatedResponse<any>> => {
    const baseUrl = getBaseUrl()
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.size) queryParams.append('size', params.size.toString())
    
    const response = await fetch(`${baseUrl}/api/feed?${queryParams.toString()}`, {
      method: 'GET',
      headers: getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to fetch feed')
    }
    return response.json()
  },
}
