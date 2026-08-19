import { useEffect, useState } from 'react'
import { Calendar, MapPin, Video, Users, DollarSign } from 'lucide-react'
import { format } from 'date-fns'
import { InternshipService } from '@/services/internships'
import { MentorshipService } from '@/services/mentorship'
import { EventsService } from '@/services/events'
import { InternshipEngagementsService } from '@/services/internships'
import { MentorshipEngagementsService } from '@/services/mentorship'
import { useMe } from '@/hooks/useMe'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BackButton2 } from '@/components/BackButtons'
import { feedDetailsRoute } from '@/routes/feed-details'

const categoryLabels: Record<string, string> = {
  workshop: 'Workshop',
  seminar: 'Seminar',
  networking: 'Networking',
  career_fair: 'Career Fair',
  webinar: 'Webinar',
  conference: 'Conference',
}

export default function FeedDetailsPage() {
  const params = feedDetailsRoute.useParams()
  const { sqid, type } = params

  const { data: me } = useMe()

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!type || !sqid) {
      setError('Missing type or sqid parameter')
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        let result
        switch (type) {
          case 'internship':
            result = await InternshipService.getOne(sqid)
            break
          case 'mentorship':
            result = await MentorshipService.getOne(sqid)
            break
          case 'event':
            result = await EventsService.getOne(sqid)
            break
          case 'internship_engagement':
            result = await InternshipEngagementsService.getOne(sqid)
            break
          case 'mentorship_engagement':
            result = await MentorshipEngagementsService.getOne(sqid)
            break
          default:
            setError(`Unknown type: ${type}`)
            setLoading(false)
            return
        }
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load details')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, sqid])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-ink-soft">Loading...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <BackButton2 />
        <div className="bg-surface rounded-md border border-line p-12 text-center">
          <p className="text-sm text-ink-soft">{error || 'Item not found'}</p>
        </div>
      </div>
    )
  }

  const isStudent = me?.role === 'student'

  return (
    <div className="space-y-6">
      <BackButton2 />

      {type === 'event' && <EventDetail data={data} isStudent={isStudent} />}

      {type === 'internship' && (
        <InternshipDetail data={data} isStudent={isStudent} sqid={sqid} />
      )}

      {type === 'mentorship' && (
        <MentorshipDetail data={data} isStudent={isStudent} sqid={sqid} />
      )}

      {type === 'internship_engagement' && (
        <EngagementDetail data={data} type="internship" />
      )}

      {type === 'mentorship_engagement' && (
        <EngagementDetail data={data} type="mentorship" />
      )}
    </div>
  )
}

function EventDetail({ data, isStudent }: { data: any; isStudent: boolean }) {
  const formattedDate = data.date
    ? format(new Date(data.date), 'EEEE, MMMM d, yyyy')
    : ''
  const formattedTime = data.start_time
    ? format(new Date(`2000-01-01T${data.start_time}`), 'h:mm a')
    : ''

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-md border border-line shadow-xs p-6">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline">
            {categoryLabels[data.category] || data.category}
          </Badge>
          <span className="text-overline text-ink-faint">Event</span>
        </div>

        <h1 className="font-display text-2xl text-ink mb-4">{data.title}</h1>

        <p className="text-ink-soft mb-6">{data.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-meta text-ink-faint">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-meta text-ink-faint">
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2 text-meta text-ink-faint">
            {data.mode === 'virtual' || data.mode === 'hybrid' ? (
              <Video className="h-4 w-4" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
            <span className="capitalize">{data.mode}</span>
            {data.venue && ` - ${data.venue}`}
          </div>
        </div>
      </div>

      {isStudent && data.tickets?.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-lg text-ink mb-4">Tickets</h2>
            <div className="space-y-3">
              {data.tickets.map((ticket: any) => {
                const isPaid = parseFloat(ticket.price) > 0
                return (
                  <div
                    key={ticket.sqid}
                    className="flex items-center justify-between p-4 border border-line rounded-md"
                  >
                    <div>
                      <p className="font-medium text-ink">{ticket.name}</p>
                      <p className="text-sm text-ink-faint">
                        {ticket.quantity - ticket.quantity_sold} remaining
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-ink">
                        {isPaid
                          ? `₦${parseFloat(ticket.price).toLocaleString()}`
                          : 'Free'}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => {
                          window.location.href = `/student/events/${ticket.event}`
                        }}
                      >
                        {isPaid ? 'Buy Ticket' : 'Register'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function InternshipDetail({
  data,
  isStudent,
  sqid,
}: {
  data: any
  isStudent: boolean
  sqid: string
}) {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-md border border-line shadow-xs p-6">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline">Internship</Badge>
          {data.is_paid && (
            <Badge variant="default" className="bg-maroon text-white">
              Paid
            </Badge>
          )}
        </div>

        <h1 className="font-display text-2xl text-ink mb-4">{data.title}</h1>

        <p className="text-ink-soft mb-6">{data.description}</p>

        <div className="flex flex-wrap gap-4 text-meta text-ink-faint">
          {data.company && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {data.company}
            </span>
          )}
          {data.work_mode && <span>{data.work_mode}</span>}
          {data.engagement_type && <span>{data.engagement_type}</span>}
          {data.is_paid && data.stipend && (
            <span className="flex items-center gap-1 text-maroon">
              <DollarSign className="h-4 w-4" />₦
              {parseFloat(data.stipend).toLocaleString()}/mo
            </span>
          )}
          {data.duration_weeks && <span>{data.duration_weeks} weeks</span>}
          {data.remaining_slots !== undefined && (
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {data.remaining_slots} of {data.available_slots} slots open
            </span>
          )}
        </div>
      </div>

      {isStudent && (
        <div className="bg-surface rounded-md border border-line shadow-xs p-6">
          <h2 className="font-display text-lg text-ink mb-4">How to Apply</h2>
          <p className="text-sm text-ink-soft mb-4">
            Click below to submit your application for this internship
            opportunity.
          </p>
          <Button
            onClick={() => {
              window.location.href = `/student/internships/${sqid}`
            }}
          >
            Apply Now
          </Button>
        </div>
      )}
    </div>
  )
}

function MentorshipDetail({
  data,
  isStudent,
  sqid,
}: {
  data: any
  isStudent: boolean
  sqid: string
}) {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-md border border-line shadow-xs p-6">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline">Mentorship</Badge>
        </div>

        <h1 className="font-display text-2xl text-ink mb-4">{data.title}</h1>

        <p className="text-ink-soft mb-6">{data.description}</p>

        <div className="flex flex-wrap gap-4 text-meta text-ink-faint">
          {data.category && <span>{data.category}</span>}
          {data.work_mode && <span>{data.work_mode}</span>}
          {data.start_date && (
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(data.start_date), 'MMM d, yyyy')}
            </span>
          )}
          {data.duration_weeks && <span>{data.duration_weeks} weeks</span>}
          {data.remaining_slots !== undefined && (
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {data.remaining_slots} of {data.available_slots} slots open
            </span>
          )}
        </div>
      </div>

      {isStudent && (
        <div className="bg-surface rounded-md border border-line shadow-xs p-6">
          <h2 className="font-display text-lg text-ink mb-4">How to Apply</h2>
          <p className="text-sm text-ink-soft mb-4">
            Click below to submit your application for this mentorship
            opportunity.
          </p>
          <Button
            onClick={() => {
              window.location.href = `/student/mentorships/${sqid}`
            }}
          >
            Apply Now
          </Button>
        </div>
      )}
    </div>
  )
}

function EngagementDetail({ data, type }: { data: any; type: string }) {
  return (
    <div className="bg-surface rounded-md border border-line shadow-xs p-6">
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="outline">
          {type === 'internship' ? 'Internship' : 'Mentorship'} Engagement
        </Badge>
        <Badge variant="default">{data.status}</Badge>
      </div>

      <h1 className="font-display text-2xl text-ink mb-4">
        {data.internship_info?.title ||
          data.mentorship_info?.title ||
          'Engagement'}
      </h1>

      {data.internship_info?.company && (
        <p className="text-ink-soft mb-4">at {data.internship_info.company}</p>
      )}

      <div className="space-y-4">
        {data.student_info && (
          <div className="p-4 border border-line rounded-md">
            <p className="text-sm text-ink-faint mb-1">Student</p>
            <p className="font-medium text-ink">
              {data.student_info.firstname} {data.student_info.lastname}
            </p>
            {data.student_info.email && (
              <p className="text-sm text-ink-soft">{data.student_info.email}</p>
            )}
          </div>
        )}

        {data.alumni_info && (
          <div className="p-4 border border-line rounded-md">
            <p className="text-sm text-ink-faint mb-1">Alumni Mentor</p>
            <p className="font-medium text-ink">
              {data.alumni_info.firstname} {data.alumni_info.lastname}
            </p>
            {data.alumni_info.email && (
              <p className="text-sm text-ink-soft">{data.alumni_info.email}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
