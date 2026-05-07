
import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, Users } from 'lucide-react'
import { studentMentorshipDetailRoute } from '@/routes/user-student'
import {  useMentorshipEngagement } from '@/hooks/useMentorships'
import { BackButton2 } from '@/components/BackButtons'

export default function MentorshipDetails() {
  const router = useRouter()
  const { sqid } = studentMentorshipDetailRoute.useParams()
    const { data: mentorship, isLoading, isError } = useMentorshipEngagement(sqid)
    

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (isError || !mentorship) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Mentorship not found
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton2 />
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <CardTitle className="text-3xl">
              {mentorship.mentorship_info.title}
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">
                {mentorship.mentorship_info.work_mode}
              </Badge>
              <Badge variant="secondary">
                {mentorship.mentorship_info.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">
              {mentorship.mentorship_info.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">
                  {mentorship.mentorship_info.duration_weeks} weeks
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-semibold">
                  {mentorship.mentorship_info.category}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Available Slots</p>
                <p className="font-semibold">
                  {mentorship.mentorship_info.remaining_slots} remaining
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Timeline</p>
                <p className="font-semibold">
                  {mentorship.mentorship_info.start_date} to{' '}
                  {mentorship.mentorship_info.end_date}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={() =>
                router.navigate({ to: `/student/mentorships/${sqid}/apply` })
              }
              disabled={mentorship.mentorship_info.remaining_slots === 0}
              className="flex-1"
            >
              {mentorship.mentorship_info.remaining_slots === 0
                ? 'No slots available'
                : 'Apply Now'}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.navigate({ to: '/student/mentorships' })}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
