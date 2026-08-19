import { FileText } from 'lucide-react'

import { UnderDevelopment } from '@/components/under-development'

export default function ReportsTab() {
  return (
    <UnderDevelopment
      variant="embedded"
      title="Reports"
      description="Review reports from your interns here — coming soon."
      icon={FileText}
    />
  )
}
