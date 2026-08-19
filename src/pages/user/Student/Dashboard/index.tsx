import { LayoutGrid } from 'lucide-react'

import { UnderDevelopment } from '@/components/under-development'

const StudentDashboard = () => {
  return (
    <UnderDevelopment
      title="Dashboard"
      description="A snapshot of your FUTAVerse activity is on the way. Until then, everything that's happening lives in the feed."
      icon={LayoutGrid}
    />
  )
}

export default StudentDashboard
