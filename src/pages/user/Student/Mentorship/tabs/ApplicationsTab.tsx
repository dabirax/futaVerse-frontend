import InternshipCard2 from '@/components/user/internships/InternshipCard2'
import {
  useMentorshipApplications,
  useWithdrawMentorshipApplication,
} from '@/hooks/useMentorships'
import { useEffect } from 'react'

export default function MyApplicationsTab() {
  const { data, isLoading, isError, refetch } = useMentorshipApplications()
    const { mutate: withdrawApplication } = useWithdrawMentorshipApplication();
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
      {applications.map((application: any, index: number) => (
        <InternshipCard2
                  key={index}
                  {...application}
                  title={application.mentorship.title}
                  alumnusName={`${application.alumnus_info.firstname} ${application.alumnus_info.lastname}`}
                  variant="withdraw"
                  onWithdraw={() => withdrawApplication(application.id)}
                />
      ))}
    </div>
  )
}
