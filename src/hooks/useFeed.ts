import { useQuery } from '@tanstack/react-query'
import { FeedService } from '@/services/feed'
import { FeedResponseItem } from '@/types/feed'
import { PaginatedResponse } from '@/services/events'

export const useFeed = (params?: { page?: number; size?: number }) => {
  return useQuery<PaginatedResponse<FeedResponseItem>>({
    queryKey: ['feed', params],
    queryFn: () => FeedService.list(params),
  })
}
