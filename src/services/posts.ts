import type { PostListResponse, SharePostPayload } from '@/types/posts'

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

const redirectToLogin = () => {
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

const throwApiError = async (response: Response): Promise<never> => {
  const data = await response.json().catch(() => ({}))
  const message =
    data?.detail ||
    data?.message ||
    (Array.isArray(data) ? data.join(', ') : '') ||
    'Request failed'
  throw new Error(message)
}

export const PostsService = {
  getMyPosts: async (): Promise<PostListResponse> => {
    const response = await fetch(`${getBaseUrl()}/api/posts/me`, {
      method: 'GET',
      headers: getHeaders(),
    })
    if (response.status === 401) {
      redirectToLogin()
    }
    if (!response.ok) {
      await throwApiError(response)
    }
    return response.json()
  },

  getUserPosts: async (sqid: string): Promise<PostListResponse> => {
    const response = await fetch(`${getBaseUrl()}/api/posts/user/${sqid}`, {
      method: 'GET',
      headers: getHeaders(),
    })
    if (response.status === 401) {
      redirectToLogin()
    }
    if (!response.ok) {
      await throwApiError(response)
    }
    return response.json()
  },

  shareEngagement: async (payload: SharePostPayload) => {
    const response = await fetch(`${getBaseUrl()}/api/posts/share-engagement`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })
    if (response.status === 401) {
      redirectToLogin()
    }
    if (!response.ok) {
      await throwApiError(response)
    }
    return response.json()
  },

  shareEngagementCompletion: async (payload: SharePostPayload) => {
    const response = await fetch(
      `${getBaseUrl()}/api/posts/share-engagement-completion`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      },
    )
    if (response.status === 401) {
      redirectToLogin()
    }
    if (!response.ok) {
      await throwApiError(response)
    }
    return response.json()
  },
}
