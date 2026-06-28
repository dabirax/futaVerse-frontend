import { useRouter } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
  MapPin,
  Briefcase,
  ArrowRight,
} from 'lucide-react'
import { FeedItemData } from '@/types/feed'

export default function InternshipFeedCard({ item, sqid }: { item: FeedItemData; sqid: string }) {
  const router = useRouter()
  const navigate = router.navigate

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-l-4 border-l-secondary"
      onClick={() => navigate({ to: `/student/internships/${sqid}` })}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 rounded-lg shrink-0">
            <AvatarFallback className="rounded-lg bg-secondary/10 text-secondary text-sm font-semibold">
              <Briefcase className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-secondary/10 text-secondary border-0 text-xs">
                Internship
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.company || 'Company'}
              </Badge>
              {item.work_mode && (
                <Badge variant="secondary" className="text-xs">
                  {item.work_mode}
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1">
              {item.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.alumni ? `Posted by ${item.alumni}` : 'A new internship opportunity'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              {item.is_paid && item.stipend && (
                <span className="flex items-center gap-1 text-secondary font-medium">
                  <DollarSign className="h-3.5 w-3.5" />₦
                  {parseFloat(item.stipend).toLocaleString()}/mo
                </span>
              )}
            </div>
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}
