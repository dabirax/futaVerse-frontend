import { useMentorshipEngagements } from '@/hooks/useMentorships'
import { CardSkeleton5 } from '@/components/CardSkeletons'
import StudentCard from '@/components/user/internships/StudentCard'

export default function MenteesTab() {
  
    const { data, isLoading, isError } = useMentorshipEngagements()

    if (isLoading) {
        return <CardSkeleton5 variant="r-full" />
      }
    
      if (isError) {
        return (
          <p className="text-sm text-destructive">Failed to load interns</p>
        )
      }

  return (
    <div className="space-y-3">
      {data?.results?.length > 0 ? (
        data.results.map((mentee: any, index: number) => (
          <StudentCard
            key={index}
            studentName={`${mentee.student_info.firstname} ${mentee.student_info.lastname}`}
            title={mentee.mentorship_info.title}
            onMessage={() => console.log('Message mentee')}
            variant="message"
          />
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Mentees will appear here once mentorships are accepted.
        </div>
      )}
    </div>
  )
}
