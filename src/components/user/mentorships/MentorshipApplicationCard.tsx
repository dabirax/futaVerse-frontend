import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User } from 'lucide-react'

interface MentorshipApplicationCardProps {
  studentName: string
  mentorshipTitle: string
  coverLetter: string
  appliedDate: string
  status?: 'pending' | 'accepted' | 'rejected'
  onAccept?: () => void
  onReject?: () => void
  onViewFull?: () => void
  variant?: 'received' | 'sent'
}

export default function MentorshipApplicationCard({
  studentName,
  mentorshipTitle,
  coverLetter,
  appliedDate,
  status = 'pending',
  onAccept,
  onReject,
  onViewFull,
  variant = 'received',
}: MentorshipApplicationCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">{studentName}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {mentorshipTitle}
              </p>
            </div>
            <Badge className={statusColors[status]}>{status}</Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{appliedDate}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-3 rounded text-sm max-h-24 overflow-y-auto">
          <p className="text-muted-foreground">{coverLetter}</p>
        </div>

        <div className="flex gap-2">
          {variant === 'received' && status === 'pending' ? (
            <>
              {onAccept && (
                <Button
                  onClick={onAccept}
                  variant="default"
                  size="sm"
                  className="flex-1"
                >
                  Accept
                </Button>
              )}
              {onReject && (
                <Button
                  onClick={onReject}
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                >
                  Reject
                </Button>
              )}
            </>
          ) : (
            onViewFull && (
              <Button
                onClick={onViewFull}
                variant="outline"
                size="sm"
                className="w-full"
              >
                View Details
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}
