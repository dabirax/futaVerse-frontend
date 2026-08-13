import { useQuery } from '@tanstack/react-query'
import type { FeedResponseItem } from '@/types/feed'
import type { PaginatedResponse } from '@/services/events'
import { FeedService } from '@/services/feed'
import { mockEvents } from '@/data/mockEvents'

const buildMockFeedItems = (): Array<FeedResponseItem> =>
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
    },
    score: 1,
    created_at: event.created_at,
  }))

export const useFeed = (params?: { page?: number; size?: number }) => {
  return useQuery<PaginatedResponse<FeedResponseItem>>({
    queryKey: ['feed', params],
    queryFn: async () => {
      try {
        return await FeedService.list(params)
      } catch {
        const results = buildMockFeedItems()
        return {
          count: results.length,
          next: null,
          previous: null,
          results,
        }
      }
    },
  })
}
