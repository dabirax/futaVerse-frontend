
import CardSkeleton5 from "@/components/skeletons/CardSkeleton5";
import InternshipCard2 from "@/components/user/internships/InternshipCard2";
import { useInternshipApplications, useWithdrawInternshipApplication } from "@/hooks/useInternships";


export default function StudentApplicationsTab() {
    const { data, isLoading, isError } = useInternshipApplications();
    const { mutate: withdrawApplication } = useWithdrawInternshipApplication();
  
  
  if (isLoading) {
    return <CardSkeleton5 variant="r-sm" />
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
      {data.results.map((application: any, index: number) => (
        <InternshipCard2
          key={index}
          {...application}
          title={application.internship.title}
          alumnusName={`${application.student.firstname} ${application.student.lastname}`}
          variant="withdraw"
          onWithdraw={() => withdrawApplication(application.id)}
        />
      ))}
    </div>
  )
}
