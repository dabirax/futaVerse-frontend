import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageSquare, MoreVertical } from 'lucide-react'

interface MenteeCardProps {
  studentName: string
  mentorshipTitle: string
  status?: 'active' | 'completed' | 'pending'
  startDate?: string
  onMessage?: () => void
  onViewProgress?: () => void
  onMore?: () => void
}

export default function MenteeCard({
  studentName,
  mentorshipTitle,
  status = 'active',
  startDate,
  onMessage,
  onViewProgress,
  onMore,
}: MenteeCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-base">{studentName}</h3>
            <p className="text-sm text-muted-foreground">{mentorshipTitle}</p>
          </div>
          {onMore && (
            <Button variant="ghost" size="sm" onClick={onMore}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge className={statusColors[status]}>{status}</Badge>
          {startDate && (
            <span className="text-xs text-muted-foreground">{startDate}</span>
          )}
        </div>

        <div className="flex gap-2">
          {onMessage && (
            <Button
              onClick={onMessage}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          )}
          {onViewProgress && (
            <Button
              onClick={onViewProgress}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              View Progress
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
