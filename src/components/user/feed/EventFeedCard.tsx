import { useRouter } from '@tanstack/react-router'
import { Calendar, MapPin, Video } from 'lucide-react'
import { format } from 'date-fns'
import { getActionLabel } from './registry'
import type { FeedItemData } from '@/types/feed'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const categoryLabels: Record<string, string> = {
  workshop: 'Workshop',
  seminar: 'Seminar',
  networking: 'Networking',
  career_fair: 'Career Fair',
  webinar: 'Webinar',
  conference: 'Conference',
}

export default function EventFeedCard({ item }: { item: FeedItemData }) {
  const router = useRouter()

  const formattedDate = item.date
    ? format(new Date(item.date), 'MMM d, yyyy')
    : ''
  const actionLabel = getActionLabel(item.action, item)

  return (
    <div
      className="group bg-surface rounded-md border border-line shadow-xs p-6 cursor-pointer transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-sm hover:border-line-strong"
      onClick={() =>
        router.navigate({
          to: '/student/events/$sqid',
          params: { sqid: item.sqid },
        })
      }
    >
      <div className="mb-4">
        <span className="text-overline text-ink-faint">{actionLabel}</span>
        <div className="mt-1.5 h-px bg-green w-12" />
      </div>

      <h3 className="font-display text-[1.1875rem] text-ink leading-snug mb-1.5">
        {item.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-ink-faint mb-4">
        {item.category && (
          <span>{categoryLabels[item.category] || item.category}</span>
        )}
        {formattedDate && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
        )}
        {item.mode && (
          <span className="flex items-center gap-1">
            {item.mode === 'virtual' || item.mode === 'hybrid' ? (
              <Video className="h-3 w-3" />
            ) : (
              <MapPin className="h-3 w-3" />
            )}
            <span className="capitalize">{item.mode}</span>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-green-soft text-green-on-soft text-[10px] font-semibold rounded-full">
              {item.alumni ? (
                item.alumni.full_name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              ) : (
                <Calendar className="h-3 w-3" />
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
