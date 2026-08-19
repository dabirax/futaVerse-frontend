import { FileText } from 'lucide-react'

import { UnderDevelopment } from '@/components/under-development'

export default function ReportsTab() {
  return (
    <UnderDevelopment
      variant="embedded"
      title="Reports"
      description="Mentorship session reports and outcomes will live here — coming soon."
      icon={FileText}
    />
  )
}
