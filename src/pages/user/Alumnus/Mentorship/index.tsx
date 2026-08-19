import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import MyMentorshipsTab from './tabs/MyMentorshipsTab'
import ApplicationsTab from './tabs/ApplicationsTab'
import OffersSentTab from './tabs/OffersTab'
import MenteesTab from './tabs/MenteesTab'
import ReportsTab from './tabs/ReportsTab'
import { Button } from '@/components/ui/button'

const tabs = [
  { value: 'my-mentorships', label: 'My Mentorships' },
  { value: 'offers', label: 'Offers' },
  { value: 'applications', label: 'Applications' },
  { value: 'mentees', label: 'Mentees' },
  { value: 'reports', label: 'Reports' },
]

export default function AlumnusMentorship() {
  const [activeTab, setActiveTab] = useState('my-mentorships')
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-xl text-ink">Mentorships</h1>
          <p className="text-body-sm text-ink-soft mt-0.5">
            Manage your mentorship programmes and track mentees
          </p>
        </div>
        <Button
          onClick={() =>
            router.navigate({ to: '/alumnus/mentorships/create' })
          }
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create Mentorship</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </div>

      {/* Underline-style tabs */}
      <div className="border-b border-line">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
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

      {/* Tab content */}
      <div>
        {activeTab === 'my-mentorships' && <MyMentorshipsTab />}
        {activeTab === 'offers' && <OffersSentTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
        {activeTab === 'mentees' && <MenteesTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>
    </div>
  )
}
