import { useRouter } from '@tanstack/react-router'
import { MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

interface ShipCardProps {
  sqid: string
  title: string
  description: string
  logo?: string
  work_mode?: string
  location?: string
  available_slots?: number
  remaining_slots?: number
  category?: string
  company?: string
  alumnusName?: string
  ship: 'internship' | 'mentorship'
  role: 'student' | 'alumnus'
  children?: ReactNode
}

export default function ShipCard({
  sqid,
  title,
  description,
  work_mode,
  location,
  remaining_slots,
  available_slots,
  company,
  alumnusName,
  ship,
  role,
  children,
}: ShipCardProps) {
  const router = useRouter()

  return (
    <div
      className="bg-surface rounded-md border border-line shadow-xs hover:shadow-sm hover:border-line-strong transition-all cursor-pointer group"
      onClick={() => router.navigate({ to: `/${role}/${ship}s/${sqid}` })}
    >
      <div className="p-5">
        {/* Kicker */}
        <p className="text-overline text-maroon mb-2">
          {ship === 'internship' ? 'Internship' : 'Mentorship'}
        </p>

        {/* Title */}
        <h3 className="font-display text-ink text-[1.1875rem] leading-tight mb-1.5 group-hover:text-indigo transition-colors">
          {title}
        </h3>

        {/* Description or company line */}
        {role === 'alumnus' ? (
          <p className="text-body-sm text-ink-soft line-clamp-2 mb-3">
            {description}
          </p>
        ) : (
          <p className="text-body-sm text-ink-soft mb-3">
            {company ?? '—'} · Posted by {alumnusName}
          </p>
        )}

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {work_mode && (
            <Badge variant="outline" className="text-[0.6875rem]">
              {work_mode}
            </Badge>
          )}
          {location && (
            <span className="inline-flex items-center gap-1 text-meta text-ink-soft">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
          )}
          {remaining_slots !== undefined && available_slots !== undefined && (
            <span
              className={`text-meta font-medium ${remaining_slots > 0 ? 'text-green' : 'text-ink-faint'}`}
            >
              {remaining_slots}/{available_slots} slots
            </span>
          )}
        </div>
      </div>

      {/* Share buttons or children */}
      {children && (
        <div className="px-5 py-3 border-t border-line">{children}</div>
      )}
    </div>
  )
}
