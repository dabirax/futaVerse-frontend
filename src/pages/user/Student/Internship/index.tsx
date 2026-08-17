import { useState } from 'react'
import MyInternshipsTab from './tabs/MyInternshipsTab'
import OffersTab from './tabs/OffersTab'
import ApplicationsTab from './tabs/ApplicationsTab'
import ReportsTab from './tabs/ReportsTab'

const tabs = [
  { value: 'my-internships', label: 'My Internships' },
  { value: 'offers', label: 'Offers' },
  { value: 'applications', label: 'Applications' },
  { value: 'reports', label: 'Reports' },
]

export default function StudentInternship() {
  const [activeTab, setActiveTab] = useState('my-internships')

  return (
    <div className="space-y-6">
      <h1 className="font-display text-xl text-ink">Internships</h1>

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
        {activeTab === 'reports' && <ReportsTab />}
      </div>
    </div>
  )
}
