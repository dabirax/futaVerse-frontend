import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { ArrowLeft, Edit, Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { alumnusMentorshipDetailRoute } from '@/routes/user-alumnus'
import { useMentorship } from '@/hooks/useMentorships'
import CardSkeleton2 from '@/components/skeletons/CardSkeleton2'
import MenteeCard from '../../../../components/user/mentorships/MenteeCard'

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

  const { id } = alumnusMentorshipDetailRoute.useParams()
  const { data, isLoading, isError } = useMentorship(Number(id))

  const [activeTab, setActiveTab] = useState('details')
  const [isActive, setIsActive] = useState(data?.is_active)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.navigate({ to: '/alumnus/mentorships' })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">{data?.title}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="mentees">Mentees</TabsTrigger>
        </TabsList>

        {/* DETAILS TAB */}
        <TabsContent value="details" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() =>
                router.navigate({ to: `/alumnus/mentorships/${id}/edit` })
              }
            >
              <Edit className="h-4 w-4" />
              Edit Mentorship
            </Button>
          </div>
          {isLoading && <CardSkeleton2 />}
          {isError && (
            <p className="text-center font-bold text-red-600 text-2xl">
              Error loading mentorship details.
            </p>
          )}

          {isLoading || isError ? null : (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-muted-foreground">Title</Label>
                      <p className="font-medium">{data?.title}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Description
                      </Label>
                      <p className="text-sm">{data?.description}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Category</Label>
                      <p className="font-medium">{data?.category}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Work Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Work Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-muted-foreground">Work Mode</Label>
                      <p className="font-medium">{data?.work_mode}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Duration</Label>
                      <p className="font-medium">
                        {data?.duration_weeks} weeks
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-muted-foreground">
                        Start Date
                      </Label>
                      <p className="font-medium">
                        {new Date(data?.start_date || '').toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">End Date</Label>
                      <p className="font-medium">
                        {new Date(data?.end_date || '').toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Slots & Availability */}
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-muted-foreground">
                        Available Slots
                      </Label>
                      <p className="font-medium">{data?.available_slots}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Remaining Slots
                      </Label>
                      <p className="font-medium">{data?.remaining_slots}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Active/Inactive Toggle */}
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">
                      Mentorship Status
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {isActive
                        ? 'This mentorship is currently active and accepting applications'
                        : 'This mentorship is currently inactive'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                    <Label>{isActive ? 'Active' : 'Inactive'}</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* OFFERS TAB */}
        <TabsContent value="offers" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="h-4 w-4" />
              Send Offer
            </Button>
          </div>

          <div className="space-y-3">
            {mockOffers.length > 0 ? (
              mockOffers.map((offer, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{offer.studentName}</p>
                        <p className="text-sm text-muted-foreground">
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
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No offers sent for this mentorship yet.
              </div>
            )}
          </div>
        </TabsContent>

        {/* APPLICATIONS TAB */}
        <TabsContent value="applications" className="space-y-4">
          <div className="space-y-3">
            {mockApplications.length > 0 ? (
              mockApplications.map((application, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {application.studentName}
                        </p>
                        <p className="text-sm text-muted-foreground">
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
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No applications received for this mentorship yet.
              </div>
            )}
          </div>
        </TabsContent>

        {/* MENTEES TAB */}
        <TabsContent value="mentees" className="space-y-4">
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
              <div className="text-center py-12 text-muted-foreground">
                No active mentees for this mentorship yet.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
