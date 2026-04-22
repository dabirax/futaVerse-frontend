
import { useRouter } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Calendar,
  Clock,
  Users,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'
import { format } from 'date-fns'
import {
  FeedMentorship,
} from '@/types/feed'

function MentorshipFeedCard({ item }: { item: FeedMentorship }) {
  const router = useRouter()
  const navigate = router.navigate

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-l-4 border-l-primary"
      onClick={() => navigate({ to: `/alumnus/mentorship/${item.sqid}` })}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 rounded-lg shrink-0">
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-sm font-semibold">
              <GraduationCap className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-primary/10 text-primary border-0 text-xs">
                Mentorship
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {item.work_mode}
              </Badge>
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {item.duration_weeks} weeks
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {format(new Date(item.start_date), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {item.remaining_slots} of {item.available_slots} slots
              </span>
            </div>
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}
