import {
  useAcceptMentorshipApplication,
  useMentorshipApplications,
  useRejectMentorshipApplication,
} from '@/hooks/useMentorships'
import { CardSkeleton4 } from '@/components/CardSkeletons'
import StudentCard from '@/components/user/internships/StudentCard'
import { useToast } from '@/hooks/use-toast'
import { getErrorMessage } from '@/lib/utils'

export default function ApplicationsTab() {
  const { data, isLoading, isError } = useMentorshipApplications()
  const { mutateAsync: acceptApplication } = useAcceptMentorshipApplication()
  const { mutateAsync: rejectApplication } = useRejectMentorshipApplication()
  const { toast } = useToast()

  if (isLoading) {
    return <CardSkeleton4 variant="r-full" />
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">Failed to load applications</p>
    )
  }

  if (!data?.results?.length) {
    return (
      <p className="text-center py-12 text-muted-foreground">
        No applications yet
      </p>
    )
  }
  return (
    <div className="space-y-3">
      {data.results.map((application: any, index: number) => (
        <StudentCard
          key={index}
          studentName={`${application.student_info.firstname} ${application.student_info.lastname}`}
          title={application.mentorship_info.title}
          variant="applicant"
          onAccept={() =>
            acceptApplication(application.sqid, {
              onSuccess: () =>
                toast({
                  title: 'Success',
                  description: 'Application accepted!',
                }),
              onError: (err: any) =>
                toast({
                  title: 'Error',
                  description: getErrorMessage(
                    err,
                    'Failed to accept application.',
                  ),
                  variant: 'destructive',
                }),
            })
          }
          onReject={() =>
            rejectApplication(application.sqid, {
              onSuccess: () =>
                toast({
                  title: 'Success',
                  description: 'Application rejected.',
                }),
              onError: (err: any) =>
                toast({
                  title: 'Error',
                  description: getErrorMessage(
                    err,
                    'Failed to reject application.',
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
