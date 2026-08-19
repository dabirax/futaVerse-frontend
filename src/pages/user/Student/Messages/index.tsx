import { MessagesSquare } from 'lucide-react'

import { UnderDevelopment } from '@/components/under-development'

const StudentMessages = () => {
  return (
    <UnderDevelopment
      title="Messages"
      description="Direct messages are coming soon — your conversations with alumni, lecturers, and classmates will live here."
      icon={MessagesSquare}
    />
  )
}

export default StudentMessages
