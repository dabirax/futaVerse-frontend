import { useEffect } from 'react'
import InternshipCard2 from '@/components/user/internships/InternshipCard2'
import {
  useMentorshipApplications,
  useWithdrawMentorshipApplication,
} from '@/hooks/useMentorships'
import { useToast } from '@/hooks/use-toast'
import { getErrorMessage } from '@/lib/utils'

export default function MyApplicationsTab() {
  const { data, isLoading, isError, refetch } = useMentorshipApplications()
  const { mutateAsync: withdrawApplication } =
    useWithdrawMentorshipApplication()
  const { toast } = useToast()
  const applications = data?.results || []

  useEffect(() => {
    refetch()
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
          title={application.mentorship_info.title}
          alumnusName={`${application.alumnus_info.firstname} ${application.alumnus_info.lastname}`}
          variant="withdraw"
          onWithdraw={() =>
            withdrawApplication(application.sqid, {
              onSuccess: () =>
                toast({
                  title: 'Success',
                  description: 'Application withdrawn.',
                }),
              onError: (err: any) =>
                toast({
                  title: 'Error',
                  description: getErrorMessage(
                    err,
                    'Failed to withdraw application.',
                  ),
                  variant: 'destructive',
                }),
            })
          }
        />
      ))}
    </div>
  )
}
