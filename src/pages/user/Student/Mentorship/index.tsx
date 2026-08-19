import { useState } from 'react'
import MyMentorshipsTab from './tabs/MyMentorshipsTab'
import OffersTab from './tabs/OffersTab'
import ApplicationsTab from './tabs/ApplicationsTab'
import ReportsTab from './tabs/ReportsTab'

const tabs = [
  { value: 'my-mentorships', label: 'My Mentorships' },
  { value: 'offers', label: 'Offers' },
  { value: 'applications', label: 'Applications' },
  { value: 'reports', label: 'Reports' },
]

export default function StudentMentorship() {
  const [activeTab, setActiveTab] = useState('my-mentorships')

  return (
    <div className="space-y-6">
      <h1 className="font-display text-xl text-ink">Mentorships</h1>

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
        {activeTab === 'offers' && <OffersTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>
    </div>
  )
}
