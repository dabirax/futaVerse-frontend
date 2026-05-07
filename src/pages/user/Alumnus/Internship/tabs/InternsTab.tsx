import { useInternshipEngagements } from '@/hooks/useInternships'
import StudentCard from '../../../../../components/user/internships/StudentCard'
import { CardSkeleton5 } from '@/components/CardSkeletons'

export default function InternsTab() {
  const { data, isLoading, isError } = useInternshipEngagements()
  console.log(data)
  if (isLoading) {
    return <CardSkeleton5 variant="r-full" />
  }

  if (isError) {
    return <p className="text-sm text-destructive">Failed to load interns</p>
  }
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data?.results?.length > 0 ? (
          data.results.map((intern: any, index: number) => (
            <StudentCard
              key={index}
              {...intern}
              studentName={`${intern.student_info.firstname} ${intern.student_info.lastname}`}
              title={intern.internship_info.title}
              variant="message"
              onMessage={() => console.log('Message intern')}
            />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No active interns yet.
          </div>
        )}
      </div>
    </div>
  )
}
