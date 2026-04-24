import { CardSkeleton4 } from '@/components/CardSkeletons'
import StudentCard from '../../../../../components/user/internships/StudentCard'
import {
  useAcceptInternshipApplication,
  useRejectInternshipApplication,
  useInternshipApplications,
} from '@/hooks/useInternships'

export default function ApplicationsTab() {
  const { data, isLoading, isError } = useInternshipApplications()
  const { mutate: acceptApplication } = useAcceptInternshipApplication()
  const { mutate: rejectApplication } = useRejectInternshipApplication()

  if (isLoading) {
    return <CardSkeleton4 variant="r-full" />
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">Failed to load applications</p>
    )
  }

  if (!data?.results?.length) {
    return <p className="text-sm text-muted-foreground">No applications yet</p>
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.results.map((application: any, index: number) => (
          <StudentCard
            studentName={`${application.student_info.firstname} ${application.student_info.lastname}`}
            key={index}
            title={application.internship_info.title}
            variant="applicant"
            onAccept={() => acceptApplication(application.sqid)}
            onReject={() => rejectApplication(application.sqid)}
          />
        ))}
      </div>
    </div>
  )
}
