import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MyMentorshipsTab from './tabs/MyMentorshipsTab'
import ApplicationsTab from './tabs/ApplicationsTab'
import OffersSentTab from './tabs/OffersTab'
import MenteesTab from './tabs/MenteesTab'
import ReportsTab from './tabs/ReportsTab'

export default function AlumnusMentorship() {
  const [activeTab, setActiveTab] = useState('my-mentorships')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mentorships</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your mentorship programmes and track mentees</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-1 -mx-1 px-1">
          <TabsList className="inline-flex w-max">
            <TabsTrigger value="my-mentorships">My Mentorships</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="mentees">Mentees</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="my-mentorships" className="space-y-4">
          <MyMentorshipsTab />
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <OffersSentTab />
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <ApplicationsTab />
        </TabsContent>

        <TabsContent value="mentees" className="space-y-4">
          <MenteesTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
