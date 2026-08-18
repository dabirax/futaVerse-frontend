import { useInfiniteQuery } from '@tanstack/react-query'
import type { FeedResponseItem } from '@/types/feed'
import type { CursorPaginatedResponse } from '@/services/feed'
import { FeedService } from '@/services/feed'
import { mockEvents } from '@/data/mockEvents'

const buildMockFeedItems = (): Array<FeedResponseItem> =>
  mockEvents.map((event) => ({
    sqid: event.sqid,
    event_type: 'event_created',
    data: {
      sqid: event.sqid,
      type: 'event',
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

export const useFeed = () => {
  return useInfiniteQuery<CursorPaginatedResponse<FeedResponseItem>>({
    queryKey: ['feed'],
    queryFn: async ({ pageParam }) => {
      try {
        return await FeedService.list(pageParam as string | null)
      } catch {
        return {
          next: null,
          previous: null,
          results: buildMockFeedItems(),
        }
      }
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  })
}
