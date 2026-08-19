import { FileText } from 'lucide-react'

import { UnderDevelopment } from '@/components/under-development'

export default function ReportsTab() {
  return (
    <UnderDevelopment
      variant="embedded"
      title="Reports"
      description="Submit and track your mentorship reports here — coming soon."
      icon={FileText}
    />
  )
}
