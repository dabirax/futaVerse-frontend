import { useRouter } from '@tanstack/react-router'
import { UserCheck } from 'lucide-react'
import type { FeedItemData } from '@/types/feed'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getActionLabel } from './registry'

interface EngagementFeedCardProps {
  item: FeedItemData
}

const colorClasses = {
  maroon: {
    bar: 'bg-maroon',
    avatar: 'bg-maroon-soft text-maroon-on-soft',
  },
  gold: {
    bar: 'bg-gold',
    avatar: 'bg-gold-soft text-gold-on-soft',
  },
} as const

type ColorKey = keyof typeof colorClasses

export default function EngagementFeedCard({ item }: EngagementFeedCardProps) {
  const router = useRouter()
  const actionLabel = getActionLabel(item.action, item)
  const colorKey: ColorKey =
    item.type === 'internship_engagement' ? 'maroon' : 'gold'
  const colorClass = colorClasses[colorKey]

  return (
    <div
      className="group bg-surface rounded-md border border-line shadow-xs p-6 cursor-pointer transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-sm hover:border-line-strong"
      onClick={() =>
        router.navigate({
          to: '/feed/details/$sqid/$type',
          params: { sqid: item.sqid, type: item.type },
        })
      }
    >
      <div className="mb-4">
        <span className="text-overline text-ink-faint">{actionLabel}</span>
        <div className={`mt-1.5 h-px ${colorClass.bar} w-12`} />
      </div>

      <h3 className="font-display text-[1.1875rem] text-ink leading-snug mb-1.5">
        {item.title}
      </h3>

      {item.company && (
        <p className="text-sm text-ink-soft mb-3">at {item.company}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback
              className={`${colorClass.avatar} text-[10px] font-semibold rounded-full`}
            >
              {item.alumni ? (
                item.alumni.full_name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              ) : (
                <UserCheck className="h-3 w-3" />
              )}
            </AvatarFallback>
          </Avatar>
          <span className="text-caption text-ink-soft">
            {item.alumni?.full_name || 'Unknown'}
          </span>
        </div>
        <span className="text-caption text-indigo font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View →
        </span>
      </div>
    </div>
  )
}
