import InternshipFeedCard from './InternshipFeedCard'
import MentorshipFeedCard from './MentorshipFeedCard'
import EventFeedCard from './EventFeedCard'
import EngagementFeedCard from './EngagementFeedCard'
import type { FeedItemData } from '@/types/feed'

export const FEED_CARD_REGISTRY = {
  internship: {
    Card: InternshipFeedCard,
  },
  internship_engagement: {
    Card: EngagementFeedCard,
  },
  mentorship: {
    Card: MentorshipFeedCard,
  },
  mentorship_engagement: {
    Card: EngagementFeedCard,
  },
  event: {
    Card: EventFeedCard,
  },
} as const

export type FeedCardType = keyof typeof FEED_CARD_REGISTRY

export function getFeedCard(type: string) {
  return FEED_CARD_REGISTRY[type as FeedCardType] ?? null
}

export function getActionLabel(action: string, item: FeedItemData): string {
  const typeLabel = item.type.replace(/_/g, ' ')
  if (action === 'created') {
    return `New ${typeLabel} posted`
  }
  if (action === 'started') {
    return `${item.alumni?.full_name ?? 'Someone'} started a ${typeLabel}`
  }
  if (action === 'completed') {
    return `${item.alumni?.full_name ?? 'Someone'} completed a ${typeLabel}`
  }
  return typeLabel
}
