import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import MyInternshipsTab from './tabs/MyInternshipsTab'
import OffersTab from './tabs/OffersTab'
import ApplicationsTab from './tabs/ApplicationsTab'
import InternsTab from './tabs/InternsTab'
import ReportsTab from './tabs/ReportsTab'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AlumnusInternship() {
  const [activeTab, setActiveTab] = useState('my-internships')
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Internships</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Manage your internship listings and track applicants
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="overflow-x-auto pb-1 -mx-1 px-1">
            <TabsList className="inline-flex w-max mb-0">
              <TabsTrigger value="my-internships">My Internships</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="interns">Interns</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </div>
          <div className="text-right">
            <Button
              onClick={() =>
                router.navigate({ to: '/alumnus/internships/create' })
              }
              className="w-full max-w-xs xl:w-auto"
            >
              <Plus className="h-4 w-4" />
              Create New Internship
            </Button>
          </div>
        </div>

        <TabsContent value="my-internships">
          <MyInternshipsTab />
        </TabsContent>

        <TabsContent value="offers">
          <OffersTab />
        </TabsContent>

        <TabsContent value="applications">
          <ApplicationsTab />
        </TabsContent>

        <TabsContent value="interns">
          <InternsTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
