import { mockEvents } from '@/data/mockEvents'
import { fetchWithAuth } from '@/lib/api'

export interface CursorPaginatedResponse<T> {
  next: string | null
  previous: string | null
  results: Array<T>
}

const getBaseUrl = () => import.meta.env.VITE_API_URL || ''

const getAction = (eventType: string) => eventType.split('_')[1]

const buildMockFeedItems = (): Array<any> =>
  mockEvents.map((event) => ({
    sqid: event.sqid,
    event_type: 'event_created',
    data: {
      sqid: event.sqid,
      type: 'event',
      action: getAction('event_created'),
      title: event.title,
      category: event.category,
      date: event.date,
      mode: event.mode,
      venue: event.venue,
      description: event.description,
      virtual_meeting: event.virtual_meeting?.join_url ?? '',
      alumni: { sqid: String(event.creator), full_name: 'FUTA Alumni' },
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

    const url = nextUrl ?? `${baseUrl}/api/feed`

    const response = await fetchWithAuth(url, { method: 'GET' })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to fetch feed')
    }
    return response.json()
  },
}
