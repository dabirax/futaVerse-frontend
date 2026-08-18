import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Edit, Plus } from 'lucide-react'
import StudentCard from '../../../../components/user/internships/StudentCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { alumnusInternshipDetailRoute } from '@/routes/user-alumnus'
import { useInternship } from '@/hooks/useInternships'
import { CardSkeleton2 } from '@/components/CardSkeletons'
import { BackButton2 } from '@/components/BackButtons'

const mockOffers = [
  {
    studentName: 'Chioma Adebayo',
    internshipTitle: 'Frontend Developer Intern',
  },
]

const mockApplications = [
  {
    studentName: 'Blessing Okonkwo',
    internshipTitle: 'Frontend Developer Intern',
  },
  {
    studentName: 'Emmanuel Nwosu',
    internshipTitle: 'Frontend Developer Intern',
  },
]

const mockInterns = [
  {
    studentName: 'Fatima Ibrahim',
    internshipTitle: 'Frontend Developer Intern',
  },
]

export default function InternshipDetail() {
  const router = useRouter()
  const { sqid } = alumnusInternshipDetailRoute.useParams()
  const { data, isLoading, isError } = useInternship(sqid)

  const [activeTab, setActiveTab] = useState('details')
  const [isActive, setIsActive] = useState(data?.is_active)

  const detailTabs = [
    { value: 'details', label: 'Details' },
    { value: 'offers', label: 'Offers' },
    { value: 'applications', label: 'Applications' },
    { value: 'interns', label: 'Interns' },
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
                router.navigate({ to: `/alumnus/internships/${sqid}/edit` })
              }
            >
              <Edit className="h-4 w-4" />
              Edit Internship
            </Button>
          </div>

          {isLoading && <CardSkeleton2 />}
          {isError && (
            <div className="rounded-md border border-destructive bg-destructive-soft p-4 text-destructive text-body">
              Error loading internship details.
            </div>
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
      )}

      {/* OFFERS TAB */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="h-4 w-4" />
              Share Offer
            </Button>
          </div>

          <div className="space-y-3">
            {mockOffers.length > 0 ? (
              mockOffers.map((offer, index) => (
                <StudentCard
                  key={index}
                  {...offer}
                  variant="offer"
                  onWithdraw={() => {}}
                />
              ))
            ) : (
              <div className="text-center py-12 text-ink-soft text-body">
                No offers sent for this internship yet.
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
              <StudentCard
                key={index}
                {...application}
                variant="applicant"
                onAccept={() => {}}
                onReject={() => {}}
              />
            ))
          ) : (
            <div className="text-center py-12 text-ink-soft text-body">
              No applications received for this internship yet.
            </div>
          )}
        </div>
      )}

      {/* INTERNS TAB */}
      {activeTab === 'interns' && (
        <div className="space-y-3">
          {mockInterns.length > 0 ? (
            mockInterns.map((intern, index) => (
              <StudentCard
                key={index}
                {...intern}
                variant="message"
                onMessage={() => {}}
              />
            ))
          ) : (
            <div className="text-center py-12 text-ink-soft text-body">
              No active interns for this internship yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
