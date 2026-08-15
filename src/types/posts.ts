import type { CursorPaginatedResponse } from '@/services/feed'

export type EngagementKind = 'internship' | 'mentorship'
export type EngagementPostStatus = 'started' | 'completed'

export interface Post {
  sqid: string
  post_type: string
  content: string
  is_public: boolean
  created_at: string
  related_data?: string | null
}

export type PostListResponse = CursorPaginatedResponse<Post>

export interface SharePostPayload {
  engagement_type: 'internship_engagement' | 'mentorship_engagement'
  engagement: string
  content: string
}

export interface NormalizedPostType {
  kind: EngagementKind | null
  status: EngagementPostStatus | null
}

const POST_KIND_MATCHERS: Array<{ kind: EngagementKind; matcher: string }> = [
  { kind: 'internship', matcher: 'internship' },
  { kind: 'mentorship', matcher: 'mentorship' },
]

const POST_STATUS_MATCHERS: Array<{
  status: EngagementPostStatus
  matcher: string
}> = [
  { status: 'started', matcher: 'started' },
  { status: 'completed', matcher: 'completed' },
]

/**
 * Backend `post_type` values are not fully confirmed (engagement share endpoints
 * 500 before we could create a real post). Normalize defensively by matching
 * substrings so the UI keeps working no matter what the backend emits.
 */
export function normalizePostType(post_type?: string): NormalizedPostType {
  const raw = (post_type ?? '').toLowerCase()
  const kind =
    POST_KIND_MATCHERS.find(({ matcher }) => raw.includes(matcher))?.kind ??
    null
  const status =
    POST_STATUS_MATCHERS.find(({ matcher }) => raw.includes(matcher))?.status ??
    null
  return { kind, status }
}

export function parseRelatedData(
  relatedData?: string | null,
): Record<string, unknown> | null {
  if (!relatedData) return null
  try {
    const parsed = JSON.parse(relatedData)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}
