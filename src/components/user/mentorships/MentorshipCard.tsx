import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Users } from 'lucide-react'

interface MentorshipCardProps {
  id: string
  title: string
  description: string
  workMode: string
  category: string
  availableSlots: number
  durationWeeks?: number
  startDate?: string
  endDate?: string
  onApply?: () => void
  onEdit?: () => void
  onDelete?: () => void
  variant?: 'view' | 'manage'
}

export default function MentorshipCard({
  id,
  title,
  description,
  workMode,
  category,
  availableSlots,
  durationWeeks,
  startDate,
  endDate,
  onApply,
  onEdit,
  onDelete,
  variant,
}: MentorshipCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow" key={id}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline">{workMode}</Badge>
          <Badge variant="secondary">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="space-y-2 text-sm">
          {durationWeeks && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{durationWeeks} weeks</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{availableSlots} slots available</span>
          </div>
        </div>

        {startDate && endDate && (
          <div className="text-xs text-muted-foreground">
            <p>
              {startDate} to {endDate}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          {variant === 'view' ? (
            onApply && (
              <Button
                onClick={onApply}
                className="w-full"
                disabled={availableSlots === 0}
              >
                {availableSlots === 0 ? 'No slots available' : 'Apply Now'}
              </Button>
            )
          ) : (
            <>
              {onEdit && (
                <Button onClick={onEdit} variant="outline" className="flex-1">
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  onClick={onDelete}
                  variant="destructive"
                  className="flex-1"
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
