import { useRouter } from '@tanstack/react-router'
import { Briefcase, DollarSign } from 'lucide-react'
import type { FeedItemData } from '@/types/feed'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function InternshipFeedCard({
  item,
  sqid,
}: {
  item: FeedItemData
  sqid: string
}) {
  const router = useRouter()

  return (
    <div
      className="group bg-surface rounded-md border border-line shadow-xs p-6 cursor-pointer transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-sm hover:border-line-strong"
      onClick={() => router.navigate({ to: `/student/internships/${sqid}` })}
    >
      {/* Category kicker */}
      <div className="mb-4">
        <span className="text-overline text-ink-faint">Internship</span>
        <div className="mt-1.5 h-px bg-maroon w-12" />
      </div>

      {/* Title */}
      <h3 className="font-display text-[1.1875rem] text-ink leading-snug mb-1.5">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-ink-soft line-clamp-2 mb-3">
        {item.alumni
          ? `Posted by ${item.alumni}`
          : 'A new internship opportunity'}
      </p>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-ink-faint mb-4">
        {item.company && <span>{item.company}</span>}
        {item.work_mode && <span>{item.work_mode}</span>}
        {item.is_paid && item.stipend && (
          <span className="flex items-center gap-1 text-maroon">
            <DollarSign className="h-3 w-3" />₦
            {parseFloat(item.stipend).toLocaleString()}/mo
          </span>
        )}
      </div>

      {/* Footer: poster identity + action */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-maroon-soft text-maroon-on-soft text-[10px] font-semibold rounded-full">
              {item.alumni
                ? item.alumni
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()
                : <Briefcase className="h-3 w-3" />}
            </AvatarFallback>
          </Avatar>
          <span className="text-caption text-ink-soft">
            {item.alumni || 'Unknown'}
          </span>
        </div>
        <span className="text-caption text-indigo font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View →
        </span>
      </div>
    </div>
  )
}
