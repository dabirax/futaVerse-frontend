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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Mentorships</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="my-mentorships">My Mentorships</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="mentees">Mentees</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

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
