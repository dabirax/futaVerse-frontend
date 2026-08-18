import type { PostListResponse, SharePostPayload } from '@/types/posts'
import { fetchWithAuth } from '@/lib/api'

const getBaseUrl = () => import.meta.env.VITE_API_URL || ''

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
    const response = await fetchWithAuth(`${getBaseUrl()}/api/posts/me`, {
      method: 'GET',
    })
    if (!response.ok) {
      await throwApiError(response)
    }
    return response.json()
  },

  getUserPosts: async (sqid: string): Promise<PostListResponse> => {
    const response = await fetchWithAuth(
      `${getBaseUrl()}/api/posts/user/${sqid}`,
      { method: 'GET' },
    )
    if (!response.ok) {
      await throwApiError(response)
    }
    return response.json()
  },

  shareEngagement: async (payload: SharePostPayload) => {
    const response = await fetchWithAuth(
      `${getBaseUrl()}/api/posts/share-engagement`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    )
    if (!response.ok) {
      await throwApiError(response)
    }
    return response.json()
  },

  shareEngagementCompletion: async (payload: SharePostPayload) => {
    const response = await fetchWithAuth(
      `${getBaseUrl()}/api/posts/share-engagement-completion`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    )
    if (!response.ok) {
      await throwApiError(response)
    }
    return response.json()
  },
}
