import StudentCard from '../../../../../components/user/internships/StudentCard'
import { useInternshipEngagements } from '@/hooks/useInternships'
import { CardSkeleton5 } from '@/components/CardSkeletons'

export default function InternsTab() {
  const { data, isLoading, isError } = useInternshipEngagements()

  if (isLoading) {
    return <CardSkeleton5 variant="r-full" />
  }

  if (isError) {
    return (
      <p className="text-body text-destructive">Failed to load interns</p>
    )
  }

  if (!data?.results?.length) {
    return (
      <p className="text-body text-ink-soft py-12 text-center">
        No active interns yet.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {data.results.map((intern: any, index: number) => (
        <StudentCard
          key={index}
          {...intern}
          studentName={`${intern.student_info.firstname} ${intern.student_info.lastname}`}
          title={intern.internship_info.title}
          variant="message"
          onMessage={() => {}}
        />
      ))}
    </div>
  )
}
