import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { alumnusInternshipDetailRoute } from '@/routes/user-alumnus'
import { useInternship } from '@/hooks/useInternships'
import { CardSkeleton2 } from '@/components/CardSkeletons'
import { getErrorMessage } from '@/lib/utils'
import { BackButton2 } from '@/components/BackButtons'

export default function InternshipDetail() {
  const { sqid } = alumnusInternshipDetailRoute.useParams()
  const { data, isLoading, isError, error } = useInternship(sqid)

  const [isActive, setIsActive] = useState(data?.is_active)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton2 />
        <h1 className="font-display text-xl text-ink">{data?.title}</h1>
      </div>

      <div className="space-y-4">
        {isLoading && <CardSkeleton2 />}
        {isError && (
          <p className="text-body-sm text-ink-soft">
            {getErrorMessage(error, 'Something went wrong.')}
          </p>
        )}

        {!isLoading && !isError && data && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Basic Information */}
              <section className="rounded-md border border-line bg-surface p-6">
                <h2 className="text-overline text-maroon mb-3">
                  Basic Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-caption text-ink-faint">Title</p>
                    <p className="text-body font-medium text-ink">
                      {data.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-ink-faint">Description</p>
                    <p className="text-body-sm text-ink-soft">
                      {data.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-ink-faint">Industry</p>
                    <p className="text-body font-medium text-ink">
                      {data.industry}
                    </p>
                  </div>
                </div>
              </section>

              {/* Work Details */}
              <section className="rounded-md border border-line bg-surface p-6">
                <h2 className="text-overline text-maroon mb-3">
                  Work Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-caption text-ink-faint">Work Mode</p>
                    <p className="text-body font-medium text-ink">
                      {data.work_mode}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-ink-faint">
                      Engagement Type
                    </p>
                    <p className="text-body font-medium text-ink">
                      {data.engagement_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-ink-faint">Location</p>
                    <p className="text-body font-medium text-ink">
                      {data.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-ink-faint">Duration</p>
                    <p className="text-body font-medium text-ink">
                      {data.duration_weeks} weeks
                    </p>
                  </div>
                </div>
              </section>

              {/* Timeline */}
              <section className="rounded-md border border-line bg-surface p-6">
                <h2 className="text-overline text-maroon mb-3">Timeline</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-caption text-ink-faint">Start Date</p>
                    <p className="text-body font-medium text-ink">
                      {new Date(data.start_date || '').toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-ink-faint">End Date</p>
                    <p className="text-body font-medium text-ink">
                      {new Date(data.end_date || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </section>

              {/* Compensation & Slots */}
              <section className="rounded-md border border-line bg-surface p-6">
                <h2 className="text-overline text-maroon mb-3">
                  Compensation & Availability
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-caption text-ink-faint">Is Paid</p>
                    <p className="text-body font-medium text-ink">
                      {data.is_paid ? 'Yes' : 'No'}
                    </p>
                  </div>
                  {data.is_paid && (
                    <div>
                      <p className="text-caption text-ink-faint">Stipend</p>
                      <p className="text-body font-medium text-ink">
                        ₦{parseFloat(data.stipend || '0').toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-caption text-ink-faint">
                      Available Slots
                    </p>
                    <p className="text-body font-medium text-ink">
                      {data.available_slots}
                    </p>
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
                    {data.skills_required.map(
                      (skill: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <p className="text-caption text-ink-faint">
                      Resume Required:
                    </p>
                    <Badge
                      variant={data.require_resume ? 'default' : 'outline'}
                    >
                      {data.require_resume ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-caption text-ink-faint">
                      Cover Letter Required:
                    </p>
                    <Badge
                      variant={
                        data.require_cover_letter ? 'default' : 'outline'
                      }
                    >
                      {data.require_cover_letter ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Active/Inactive Toggle */}
            <section className="rounded-md border border-line bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-body font-semibold text-ink">
                    Internship Status
                  </Label>
                  <p className="text-body-sm text-ink-soft">
                    {isActive
                      ? 'This internship is currently active and accepting applications'
                      : 'This internship is currently inactive'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                  <Label className="text-body-sm">
                    {isActive ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
