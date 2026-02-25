import { useAcceptMentorshipApplication, useMentorshipApplications, useRejectMentorshipApplication } from '@/hooks/useMentorships'
import CardSkeleton4 from '@/components/skeletons/CardSkeleton4';
import StudentCard from '@/components/user/internships/StudentCard';

export default function ApplicationsTab() {

  const { data, isLoading, isError } = useMentorshipApplications();
  const { mutate: acceptApplication } = useAcceptMentorshipApplication();
  const { mutate: rejectApplication } = useRejectMentorshipApplication();

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
          studentName={`Student ${application.student}`}
          Title={application.mentorship}
          variant="applicant"
          onAccept={() => acceptApplication(application.id)}
          onReject={() => rejectApplication(application.id)}
        />
      ))}
    </div>
  )
}
