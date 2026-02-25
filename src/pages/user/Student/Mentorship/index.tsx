import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AvailableMentorshipsTab from './tabs/MyMentorshipsTab'
import OffersTab from './tabs/OffersTab'
import MyApplicationsTab from './tabs/ApplicationsTab'
import { useMentorships, useMentorshipOffers, useMentorshipApplications } from '@/hooks/useMentorships'
import { Card, CardContent } from '@/components/ui/card'

export default function StudentMentorship() {
  const [activeTab, setActiveTab] = useState('available-mentorships')
  const { isLoading: loadingMentorships } = useMentorships()
  const { isLoading: loadingOffers } = useMentorshipOffers()
  const { isLoading: loadingMyApplications } = useMentorshipApplications()

  const CardSkeleton = () => (
    <Card>
      <CardContent className="animate-pulse space-y-3">
        <div className="h-4 rounded bg-muted/40 w-3/4" />
        <div className="h-3 rounded bg-muted/30 w-full" />
        <div className="h-3 rounded bg-muted/30 w-5/6" />
        <div className="flex gap-2 pt-4">
          <div className="h-8 rounded bg-muted/30 flex-1" />
          <div className="h-8 rounded bg-muted/30 flex-1" />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Mentorships</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-mentorships">My Mentorships</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* AVAILABLE MENTORSHIPS TAB */}
        <TabsContent value="my-mentorships" className="space-y-4">
          {loadingMentorships ? (
            <div className="grid gap-4 md:grid-cols-2">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <AvailableMentorshipsTab />
          )}
        </TabsContent>

        {/* OFFERS TAB */}
        <TabsContent value="offers" className="space-y-4">
          {loadingOffers ? (
            <div className="space-y-3">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <OffersTab />
          )}
        </TabsContent>

        {/* MY APPLICATIONS TAB */}
        <TabsContent value="applications" className="space-y-4">
          {loadingMyApplications ? (
            <div className="space-y-3">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <MyApplicationsTab />
          )}
        </TabsContent>

        {/* REPORTS TAB */}
        <TabsContent value="reports" className="space-y-4">
          <p className="text-center py-12 text-muted-foreground">No reports yet</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
