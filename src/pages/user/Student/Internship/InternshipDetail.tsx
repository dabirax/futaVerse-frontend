import { Link } from '@tanstack/react-router'
import { Building2, Calendar, Clock, MapPin, MessageSquare, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { studentInternshipDetailsRoute } from '@/routes/user-student'
import { useInternshipEngagement } from '@/hooks/useInternships'
import { CardSkeleton2 } from '@/components/CardSkeletons'
import { BackButton2 } from '@/components/BackButtons'

export default function InternshipDetail() {
  const { sqid } = studentInternshipDetailsRoute.useParams()
  const { data, isLoading, isError } = useInternshipEngagement(sqid)

  if (isLoading) {
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

  if (isError || !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <BackButton2 />
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-semibold text-foreground">
              This internship isn't available right now.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              It may have been removed or you don't have access yet.
            </p>
            <Link to="/student/internships">
              <Button variant="outline" className="mt-4">
                Back to Internships
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const info = data.internship_info
  const isEngaged = Boolean(data.status)
  const hasSlots = info.remaining_slots > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton2 />
        <h1 className="text-2xl font-semibold">{info.title}</h1>
      </div>

      {isEngaged && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="default">{data.status}</Badge>
                <span className="text-sm text-muted-foreground">
                  via {data.source}
                </span>
              </div>
              {data.alumnus_info && (
                <Link to="/student/messages">
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message {data.alumnus_info.name}
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {info.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{info.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{info.duration_weeks} weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Timeline</p>
                <p className="font-semibold">
                  {new Date(info.start_date).toLocaleDateString()} –{' '}
                  {new Date(info.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-semibold">
                  {info.company} · {info.industry}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compensation & Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-muted-foreground">Stipend</Label>
              <p className="font-medium">
                {info.is_paid
                  ? `₦${parseFloat(info.stipend || '0').toLocaleString()}/month`
                  : 'Unpaid'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <Label className="text-muted-foreground">Slots</Label>
              <p className="font-medium">
                {info.remaining_slots} of {info.available_slots} remaining
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <Badge variant="outline">{info.work_mode}</Badge>
              <Badge variant="secondary">{info.engagement_type}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Skills & Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Required Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {info.skills_required.map((skill: string, index: number) => (
                  <Badge key={index} variant="accent">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant={info.require_resume ? 'default' : 'outline'}>
                {info.require_resume ? 'Resume required' : 'Resume optional'}
              </Badge>
              <Badge
                variant={info.require_cover_letter ? 'default' : 'outline'}
              >
                {info.require_cover_letter
                  ? 'Cover letter required'
                  : 'Cover letter optional'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {!isEngaged && (
        <Card>
          <CardContent className="py-6">
            <div className="flex flex-col gap-3">
              <Button disabled className="w-full">
                {hasSlots ? 'Apply Now' : 'No slots available'}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {hasSlots
                  ? "Applying isn't available yet - check back soon."
                  : 'All slots for this internship are currently filled.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
