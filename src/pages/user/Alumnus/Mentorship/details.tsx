import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { alumnusMentorshipDetailRoute } from '@/routes/user-alumnus'
import { useMentorship } from '@/hooks/useMentorships'
import { CardSkeleton2 } from '@/components/CardSkeletons'
import { getErrorMessage } from '@/lib/utils'
import { BackButton2 } from '@/components/BackButtons'

export default function MentorshipDetail() {
  const { sqid } = alumnusMentorshipDetailRoute.useParams()
  const { data, isLoading, isError, error } = useMentorship(sqid)

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
                    <p className="text-caption text-ink-faint">Category</p>
                    <p className="text-body font-medium text-ink">
                      {data.category}
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

              {/* Slots & Availability */}
              <section className="rounded-md border border-line bg-surface p-6">
                <h2 className="text-overline text-maroon mb-3">
                  Availability
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-caption text-ink-faint">
                      Available Slots
                    </p>
                    <p className="text-body font-medium text-ink">
                      {data.available_slots}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-ink-faint">
                      Remaining Slots
                    </p>
                    <p className="text-body font-medium text-ink">
                      {data.remaining_slots}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Active/Inactive Toggle */}
            <section className="rounded-md border border-line bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-body font-semibold text-ink">
                    Mentorship Status
                  </Label>
                  <p className="text-body-sm text-ink-soft">
                    {isActive
                      ? 'This mentorship is currently active and accepting applications'
                      : 'This mentorship is currently inactive'}
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
