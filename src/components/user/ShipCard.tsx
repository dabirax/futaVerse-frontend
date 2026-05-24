import { useRouter } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, MapPin } from 'lucide-react'

interface InternshipCardProps {
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
}

export default function ShipCard({
  sqid,
  title,
  description,
  logo,
  work_mode,
  location,
  remaining_slots,
  available_slots,
  category,
  company,
  alumnusName,
  ship,
  role,
}: InternshipCardProps) {
  const router = useRouter()

  return (
    <div
      className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer group p-4"
      onClick={() => router.navigate({ to: `/${role}/${ship}s/${sqid}` })}
    >
      <div className="flex gap-3">
        <Avatar className="h-12 w-12 rounded-lg shrink-0">
          <AvatarImage src={logo} />
          <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold text-sm">
            {title.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {role === 'alumnus' ? (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{description}</p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              {company ?? '—'} · Posted by {alumnusName}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {work_mode && (
              <Badge variant="secondary" className="text-xs font-normal">
                {work_mode}
              </Badge>
            )}
            {location && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {location}
              </span>
            )}
            {category && !location && (
              <Badge variant="outline" className="text-xs font-normal">
                {category}
              </Badge>
            )}
            {remaining_slots !== undefined && available_slots !== undefined && (
              <span className={`text-xs font-medium ${remaining_slots > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                {remaining_slots}/{available_slots} slots
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
