import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Edit, Plus } from 'lucide-react'
import MenteeCard from '../../../../components/user/mentorships/MenteeCard'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { alumnusMentorshipDetailRoute } from '@/routes/user-alumnus'
import { useMentorship } from '@/hooks/useMentorships'
import { CardSkeleton2 } from '@/components/CardSkeletons'
import { getErrorMessage } from '@/lib/utils'
import { BackButton2 } from '@/components/BackButtons'

const mockOffers = [
  {
    studentName: 'Chioma Adebayo',
    mentorshipTitle: 'Frontend Developer Mentorship',
  },
]

const mockApplications = [
  {
    studentName: 'Blessing Okonkwo',
    mentorshipTitle: 'Frontend Developer Mentorship',
  },
  {
    studentName: 'Emmanuel Nwosu',
    mentorshipTitle: 'Frontend Developer Mentorship',
  },
]

const mockMentees = [
  {
    studentName: 'Fatima Ibrahim',
    mentorshipTitle: 'Frontend Developer Mentorship',
  },
]

export default function MentorshipDetail() {
  const router = useRouter()

  const { sqid } = alumnusMentorshipDetailRoute.useParams()
  const { data, isLoading, isError, error } = useMentorship(sqid)

  const [activeTab, setActiveTab] = useState('details')
  const [isActive, setIsActive] = useState(data?.is_active)

  const detailTabs = [
    { value: 'details', label: 'Details' },
    { value: 'offers', label: 'Offers' },
    { value: 'applications', label: 'Applications' },
    { value: 'mentees', label: 'Mentees' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton2 />
        <h1 className="font-display text-xl text-ink">{data?.title}</h1>
      </div>

      {/* Underline tabs */}
      <div className="border-b border-line">
        <div className="flex gap-0 overflow-x-auto">
          {detailTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`whitespace-nowrap px-4 py-2.5 text-body font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.value
                  ? 'border-indigo text-indigo'
                  : 'border-transparent text-ink-soft hover:text-ink hover:border-line-strong'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* DETAILS TAB */}
      {activeTab === 'details' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() =>
                router.navigate({ to: `/alumnus/mentorships/${sqid}/edit` })
              }
            >
              <Edit className="h-4 w-4" />
              Edit Mentorship
            </Button>
          </div>

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
      )}

      {/* OFFERS TAB */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="h-4 w-4" />
              Send Offer
            </Button>
          </div>

          <div className="space-y-3">
            {mockOffers.length > 0 ? (
              mockOffers.map((offer, index) => (
                <section
                  key={index}
                  className="rounded-md border border-line bg-surface p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body font-medium text-ink">
                        {offer.studentName}
                      </p>
                      <p className="text-body-sm text-ink-soft">
                        {offer.mentorshipTitle}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log('Withdraw offer')}
                    >
                      Withdraw
                    </Button>
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-12 text-ink-soft text-body">
                No offers sent for this mentorship yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* APPLICATIONS TAB */}
      {activeTab === 'applications' && (
        <div className="space-y-3">
          {mockApplications.length > 0 ? (
            mockApplications.map((application, index) => (
              <section
                key={index}
                className="rounded-md border border-line bg-surface p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body font-medium text-ink">
                      {application.studentName}
                    </p>
                    <p className="text-body-sm text-ink-soft">
                      {application.mentorshipTitle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => console.log('Accept application')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => console.log('Reject application')}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-12 text-ink-soft text-body">
              No applications received for this mentorship yet.
            </div>
          )}
        </div>
      )}

      {/* MENTEES TAB */}
      {activeTab === 'mentees' && (
        <div className="space-y-3">
          {mockMentees.length > 0 ? (
            mockMentees.map((mentee, index) => (
              <MenteeCard
                key={index}
                studentName={mentee.studentName}
                mentorshipTitle={mentee.mentorshipTitle}
                status="active"
                onMessage={() => console.log('Message mentee')}
                onViewProgress={() => console.log('View progress')}
              />
            ))
          ) : (
            <div className="text-center py-12 text-ink-soft text-body">
              No active mentees for this mentorship yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
