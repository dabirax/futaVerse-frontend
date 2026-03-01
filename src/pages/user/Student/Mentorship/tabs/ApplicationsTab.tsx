import InternshipCard2 from '@/components/user/internships/InternshipCard2'
import {
  useMentorshipApplications,
  useWithdrawMentorshipApplication,
} from '@/hooks/useMentorships'
import { useEffect } from 'react'

export default function MyApplicationsTab() {
  const { data, isLoading, isError, refetch } = useMentorshipApplications()
  const withdraw = useWithdrawMentorshipApplication()
  const applications = data?.results || []

  useEffect(() => {
    refetch?.()
  }, [refetch])

  if (isLoading)
    return (
      <div className="space-y-3">
        <div className="animate-pulse h-32 rounded border" />
      </div>
    )
  if (isError)
    return (
      <div className="text-sm text-destructive">
        Failed to load applications
      </div>
    )
  if (!applications.length)
    return (
      <div className="text-center py-12 text-muted-foreground">
        You haven't applied to any mentorships yet.
      </div>
    )

  return (
    <div className="space-y-3">
      {applications.map((application: any) => (
        <InternshipCard2
          key={application.id}
          alumnusName={application.alumnus_info}
          title={application.mentorship}
          variant="withdraw"
          onAccept={undefined}
          onReject={undefined}
          onWithdraw={() => withdraw.mutate(application.id)}
        />
      ))}
    </div>
  )
}
