import { mockEvents } from '@/data/mockEvents'

export interface CursorPaginatedResponse<T> {
  next: string | null
  previous: string | null
  results: Array<T>
}

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

const buildMockFeedItems = (): Array<any> =>
  mockEvents.map((event) => ({
    sqid: event.sqid,
    event_type: 'event_created',
    data: {
      title: event.title,
      category: event.category,
      date: event.date,
      mode: event.mode,
      venue: event.venue,
      description: event.description,
      virtual_meeting: event.virtual_meeting?.join_url ?? '',
      alumni: event.creator,
    },
    score: 1,
    created_at: event.created_at,
  }))

export const FeedService = {
  list: async (
    nextUrl?: string | null,
  ): Promise<CursorPaginatedResponse<any>> => {
    const baseUrl = getBaseUrl()
    if (!baseUrl) {
      return {
        next: null,
        previous: null,
        results: buildMockFeedItems(),
      }
    }

    // Cursor pagination: after the first page, fetch the backend's absolute
    // `next` URL verbatim (it carries the pre-encoded cursor param).
    const url = nextUrl ?? `${baseUrl}/api/feed`

    const response = await fetch(url, {
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
