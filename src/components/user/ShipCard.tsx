import { useRouter } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface InternshipCardProps {
  sqid: string
  title: string
  description: string
  logo?: string
  workMode?: string
  location?: string
  availableSlots?: number
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
  // workMode,
  location,
  // availableSlots,
  category,
  company,
  alumnusName,
  ship,
  role,
}: InternshipCardProps) {
  const router = useRouter()

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      onClick={() => router.navigate({ to: `/${role}/${ship}s/${sqid}` })}
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16 rounded-lg">
            <AvatarImage src={logo} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
              {title.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
            {role === 'alumnus' ? (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {company ?? '—'} • Posted by {alumnusName}
              </p>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {/* {workMode && <Badge variant="accent">{workMode}</Badge>} */}
              <Badge variant="secondary">Remote</Badge>
              {location && (
                <Badge variant="secondary">{location || category}</Badge>
              )}
              {/* {availableSlots !== undefined && (
                <Badge variant="outline">{availableSlots} slots available</Badge>
              )} */}
              <Badge variant="secondary">Open</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
