import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import MyInternshipsTab from './tabs/MyInternshipsTab'
import OffersTab from './tabs/OffersTab'
import ApplicationsTab from './tabs/ApplicationsTab'
import InternsTab from './tabs/InternsTab'
import ReportsTab from './tabs/ReportsTab'
import { Button } from '@/components/ui/button'

const tabs = [
  { value: 'my-internships', label: 'My Internships' },
  { value: 'offers', label: 'Offers' },
  { value: 'applications', label: 'Applications' },
  { value: 'interns', label: 'Interns' },
  { value: 'reports', label: 'Reports' },
]

export default function AlumnusInternship() {
  const [activeTab, setActiveTab] = useState('my-internships')
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-xl text-ink">Internships</h1>
          <p className="text-body-sm text-ink-soft mt-0.5">
            Manage your internship listings and track applicants
          </p>
        </div>
        <Button
          onClick={() =>
            router.navigate({ to: '/alumnus/internships/create' })
          }
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create Internship</span>
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
        {activeTab === 'my-internships' && <MyInternshipsTab />}
        {activeTab === 'offers' && <OffersTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
        {activeTab === 'interns' && <InternsTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>
    </div>
  )
}
