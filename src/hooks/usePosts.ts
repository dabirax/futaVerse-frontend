import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { SharePostPayload } from '@/types/posts'
import { PostsService } from '@/services/posts'

export const useMyPosts = () => {
  return useQuery({
    queryKey: ['my-posts'],
    queryFn: PostsService.getMyPosts,
  })
}

export const useUserPosts = (sqid: string) => {
  return useQuery({
    queryKey: ['user-posts', sqid],
    queryFn: () => PostsService.getUserPosts(sqid),
    enabled: !!sqid,
  })
}

const invalidatePostQueries = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ['my-posts'] })
  qc.invalidateQueries({ queryKey: ['user-posts'] })
  qc.invalidateQueries({ queryKey: ['feed'] })
}

export const useShareEngagement = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: SharePostPayload) =>
      PostsService.shareEngagement(payload),
    onSuccess: () => {
      invalidatePostQueries(qc)
    },
  })
}

export const useShareEngagementCompletion = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: SharePostPayload) =>
      PostsService.shareEngagementCompletion(payload),
    onSuccess: () => {
      invalidatePostQueries(qc)
    },
  })
}
