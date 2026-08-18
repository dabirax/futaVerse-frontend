import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Building2,
  Calendar,
  Clock,
  FileText,
  MapPin,
  MessageSquare,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { studentInternshipDetailsRoute } from '@/routes/user-student'
import {
  useCreateInternshipApplication,
  useInternship,
  useInternshipEngagements,
} from '@/hooks/useInternships'
import { useResumes } from '@/hooks/useResumes'
import { CardSkeleton2 } from '@/components/CardSkeletons'
import { BackButton2 } from '@/components/BackButtons'

export default function InternshipDetail() {
  const { sqid } = studentInternshipDetailsRoute.useParams()
  const { data: info, isLoading, isError } = useInternship(sqid)
  const {
    data: engagementsData,
    isLoading: engagementsLoading,
    isError: engagementsError,
  } = useInternshipEngagements()
  const createApplication = useCreateInternshipApplication()
  const { data: resumesData, isLoading: resumesLoading } = useResumes()

  const [resumeSqid, setResumeSqid] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [applyError, setApplyError] = useState<string | null>(null)

  const resumes = resumesData?.results ?? []

  const handleApply = () => {
    setApplyError(null)

    if (!resumeSqid) {
      setApplyError('Please select a resume to apply.')
      return
    }

    createApplication.mutate(
      {
        internship: sqid,
        resume: resumeSqid,
        cover_letter: coverLetter || undefined,
      },
      {
        onError: (err: any) => {
          setApplyError(
            err?.message ?? 'Something went wrong. Please try again.',
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
          <div className="h-6 bg-surface-2 rounded w-48 animate-pulse" />
        </div>
        <CardSkeleton2 />
      </div>
    )
  }

  if (isError || engagementsError || !info) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <BackButton2 />
        </div>
        <div className="rounded-md border border-line bg-surface p-8 text-center">
          <p className="font-display text-ink text-lg mb-1">
            This internship isn't available right now.
          </p>
          <p className="text-body-sm text-ink-soft mb-4">
            It may have been removed or you don't have access yet.
          </p>
          <Link to="/student/internships">
            <Button variant="outline">Back to Internships</Button>
          </Link>
        </div>
      </div>
    )
  }

  const engagement = engagementsData?.results?.find(
    (e: any) => e.internship_info?.sqid === sqid,
  )
  const isEngaged = Boolean(engagement)
  const hasSlots = info.remaining_slots > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton2 />
        <h1 className="font-display text-xl text-ink">{info.title}</h1>
      </div>

      {/* Engagement status banner */}
      {isEngaged && (
        <div className="rounded-md border border-indigo bg-indigo-soft p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="default">{engagement.status}</Badge>
              <span className="text-body-sm text-ink-soft">
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
        </div>
      )}

      {/* Document sections */}
      <div className="space-y-4">
        {/* Description */}
        <section className="rounded-md border border-line bg-surface p-6">
          <h2 className="text-overline text-maroon mb-3">Description</h2>
          <p className="text-body-sm text-ink-soft whitespace-pre-line leading-relaxed">
            {info.description}
          </p>
        </section>

        {/* Work details & Compensation — side by side on desktop */}
        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-md border border-line bg-surface p-6">
            <h2 className="text-overline text-maroon mb-3">Work Details</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-ink-faint mt-0.5 shrink-0" />
                <div>
                  <p className="text-caption text-ink-faint">Location</p>
                  <p className="text-body font-medium text-ink">
                    {info.location}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-ink-faint mt-0.5 shrink-0" />
                <div>
                  <p className="text-caption text-ink-faint">Duration</p>
                  <p className="text-body font-medium text-ink">
                    {info.duration_weeks} weeks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-ink-faint mt-0.5 shrink-0" />
                <div>
                  <p className="text-caption text-ink-faint">Timeline</p>
                  <p className="text-body font-medium text-ink">
                    {new Date(info.start_date).toLocaleDateString()} –{' '}
                    {new Date(info.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-ink-faint mt-0.5 shrink-0" />
                <div>
                  <p className="text-caption text-ink-faint">Company</p>
                  <p className="text-body font-medium text-ink">
                    {info.company} · {info.industry}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-md border border-line bg-surface p-6">
            <h2 className="text-overline text-maroon mb-3">
              Compensation & Availability
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-caption text-ink-faint">Stipend</p>
                <p className="text-body font-medium text-ink">
                  {info.is_paid
                    ? `₦${parseFloat(info.stipend || '0').toLocaleString()}/month`
                    : 'Unpaid'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-ink-faint" />
                <p className="text-caption text-ink-faint">Slots</p>
                <p className="text-body font-medium text-ink">
                  {info.remaining_slots} of {info.available_slots} remaining
                </p>
              </div>
              <div className="flex gap-2 pt-1">
                <Badge variant="outline">{info.work_mode}</Badge>
                <Badge variant="outline">{info.engagement_type}</Badge>
              </div>
            </div>
          </section>
        </div>

        {/* Skills & Requirements */}
        <section className="rounded-md border border-line bg-surface p-6">
          <h2 className="text-overline text-maroon mb-3">
            Skills & Requirements
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-caption text-ink-faint mb-2">
                Required Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {info.skills_required.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline">
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
          </div>
        </section>
      </div>

      {/* Application form */}
      {!isEngaged && hasSlots && (
        <section className="rounded-md border border-line bg-surface p-6 space-y-4">
          <h2 className="text-overline text-maroon">
            Apply for this internship
          </h2>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-body">
              <FileText className="h-4 w-4 text-ink-faint" />
              Resume <span className="text-destructive">*</span>
            </Label>
            {resumesLoading ? (
              <p className="text-body-sm text-ink-soft">
                Loading your resumes...
              </p>
            ) : resumes.length === 0 ? (
              <p className="text-body-sm text-ink-soft">
                You haven't uploaded any resumes yet.{' '}
                <Link
                  to="/student/settings"
                  className="text-indigo underline underline-offset-2"
                >
                  Upload one in Settings
                </Link>{' '}
                to apply.
              </p>
            ) : (
              <Select
                value={resumeSqid}
                onValueChange={(value) => {
                  setResumeSqid(value)
                  setApplyError(null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a resume" />
                </SelectTrigger>
                <SelectContent>
                  {resumes.map((resume) => (
                    <SelectItem key={resume.sqid} value={resume.sqid}>
                      {resume.filename}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {info.require_cover_letter && (
            <div className="space-y-2">
              <Label className="text-body">
                Cover Letter <span className="text-destructive">*</span>
              </Label>
              <Textarea
                placeholder="Tell the alumnus why you're a great fit..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={5}
              />
            </div>
          )}

          {applyError && (
            <p className="text-body-sm text-destructive font-medium">
              {applyError}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              disabled={
                createApplication.isPending ||
                resumesLoading ||
                resumes.length === 0
              }
              onClick={handleApply}
            >
              {createApplication.isPending ? 'Applying...' : 'Apply Now'}
            </Button>
            <p className="text-center text-body-sm text-ink-soft">
              {createApplication.isSuccess
                ? 'Application submitted! The alumnus will review it shortly.'
                : 'Your application will be sent to the alumnus for review.'}
            </p>
          </div>
        </section>
      )}

      {/* No slots available */}
      {!isEngaged && !hasSlots && (
        <section className="rounded-md border border-line bg-surface p-6 text-center">
          <Button disabled className="w-full">
            No slots available
          </Button>
          <p className="text-body-sm text-ink-soft mt-3">
            All slots for this internship are currently filled.
          </p>
        </section>
      )}
    </div>
  )
}
