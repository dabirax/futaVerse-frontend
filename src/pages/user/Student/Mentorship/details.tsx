import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Clock, MapPin, MessageSquare, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { studentMentorshipDetailRoute } from '@/routes/user-student'
import {
  useCreateMentorshipApplication,
  useMentorship,
  useMentorshipEngagements,
} from '@/hooks/useMentorships'
import { CardSkeleton2 } from '@/components/CardSkeletons'
import { BackButton2 } from '@/components/BackButtons'

export default function MentorshipDetails() {
  const { sqid } = studentMentorshipDetailRoute.useParams()
  const { data: mentorship, isLoading, isError } = useMentorship(sqid)
  const {
    data: engagementsData,
    isLoading: engagementsLoading,
    isError: engagementsError,
  } = useMentorshipEngagements()
  const createApplication = useCreateMentorshipApplication()

  const [coverLetter, setCoverLetter] = useState('')
  const [applyError, setApplyError] = useState<string | null>(null)

  const handleApply = () => {
    setApplyError(null)

    if (!coverLetter.trim()) {
      setApplyError('Please write a cover letter to apply.')
      return
    }

    createApplication.mutate(
      { mentorship: sqid, cover_letter: coverLetter },
      {
        onError: (err: any) => {
          setApplyError(
            err?.response?.data?.detail ??
              err?.message ??
              'Something went wrong. Please try again.',
          )
        },
      },
    )
  }

  if (isLoading || engagementsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <BackButton2 />
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
        <CardSkeleton2 />
      </div>
    )
  }

  if (isError || engagementsError || !mentorship) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <BackButton2 />
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-semibold text-foreground">
              This mentorship isn't available right now.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              It may have been removed or you don't have access yet.
            </p>
            <Link to="/student/mentorships">
              <Button variant="outline" className="mt-4">
                Back to Mentorships
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const engagement = engagementsData?.results?.find(
    (e: any) => e.mentorship_info?.sqid === sqid,
  )
  const isEngaged = Boolean(engagement)
  const hasSlots = mentorship.remaining_slots > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton2 />
        <h1 className="text-2xl font-semibold">{mentorship.title}</h1>
      </div>

      {isEngaged && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="default">{engagement.status}</Badge>
                <span className="text-sm text-muted-foreground">
                  via {engagement.source}
                </span>
              </div>
              {engagement.alumnus_info && (
                <Link to="/student/messages">
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message{' '}
                    {[
                      engagement.alumnus_info.firstname,
                      engagement.alumnus_info.lastname,
                    ]
                      .filter(Boolean)
                      .join(' ') || 'Alumnus'}
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <CardTitle className="text-3xl">{mentorship.title}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">{mentorship.work_mode}</Badge>
              <Badge variant="secondary">{mentorship.category}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {mentorship.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">
                  {mentorship.duration_weeks} weeks
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-semibold">{mentorship.category}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Available Slots</p>
                <p className="font-semibold">
                  {mentorship.remaining_slots} remaining
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Timeline</p>
                <p className="font-semibold">
                  {new Date(mentorship.start_date).toLocaleDateString()} –{' '}
                  {new Date(mentorship.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isEngaged && hasSlots && (
        <Card>
          <CardHeader>
            <CardTitle>Apply for this mentorship</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>
                Cover Letter <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Tell the alumnus why you're interested..."
                value={coverLetter}
                onChange={(e) => {
                  setCoverLetter(e.target.value)
                  setApplyError(null)
                }}
                rows={5}
              />
            </div>

            {applyError && (
              <p className="text-sm text-red-500 font-medium">{applyError}</p>
            )}

            <div className="flex flex-col gap-3">
              <Button
                className="w-full"
                disabled={createApplication.isPending}
                onClick={handleApply}
              >
                {createApplication.isPending ? 'Applying...' : 'Apply Now'}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {createApplication.isSuccess
                  ? 'Application submitted! The alumnus will review it shortly.'
                  : 'Your application will be sent to the alumnus for review.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!isEngaged && !hasSlots && (
        <Card>
          <CardContent className="py-6">
            <Button disabled className="w-full">
              No slots available
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-3">
              All slots for this mentorship are currently filled.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
