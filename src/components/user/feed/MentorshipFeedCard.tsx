import { useRouter } from '@tanstack/react-router'
import { Calendar, GraduationCap, Users } from 'lucide-react'
import { format } from 'date-fns'
import { getActionLabel } from './registry'
import type { FeedItemData } from '@/types/feed'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function MentorshipFeedCard({ item }: { item: FeedItemData }) {
  const router = useRouter()
  const actionLabel = getActionLabel(item.action, item)

  return (
    <div
      className="group bg-surface rounded-md border border-line shadow-xs p-6 cursor-pointer transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-sm hover:border-line-strong"
      onClick={() =>
        router.navigate({
          to: '/student/mentorships/$sqid',
          params: { sqid: item.sqid },
        })
      }
    >
      <div className="mb-4">
        <span className="text-overline text-ink-faint">{actionLabel}</span>
        <div className="mt-1.5 h-px bg-gold w-12" />
      </div>

      <h3 className="font-display text-[1.1875rem] text-ink leading-snug mb-1.5">
        {item.title}
      </h3>

      <p className="text-sm text-ink-soft line-clamp-2 mb-3">
        {item.alumni
          ? `Hosted by ${item.alumni.full_name}`
          : 'A new mentorship opportunity.'}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-ink-faint mb-4">
        {item.category && <span>{item.category}</span>}
        {item.work_mode && <span>{item.work_mode}</span>}
        {item.start_date && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(item.start_date), 'MMM d, yyyy')}
          </span>
        )}
        {item.remaining_slots !== undefined && (
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {item.remaining_slots} of {item.available_slots} slots
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-gold-soft text-gold-on-soft text-[10px] font-semibold rounded-full">
              {item.alumni ? (
                item.alumni.full_name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              ) : (
                <GraduationCap className="h-3 w-3" />
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
