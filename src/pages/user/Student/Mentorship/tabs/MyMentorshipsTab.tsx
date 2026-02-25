import { useRouter } from '@tanstack/react-router'
import MentorshipCard from '../../../../../components/user/mentorships/MentorshipCard'
import { useMentorships } from '@/hooks/useMentorships'
import { useEffect } from 'react'

export default function AvailableMentorshipsTab() {
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useMentorships()


  useEffect(() => {
    refetch?.()
  }, [refetch])

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-pulse space-y-3 p-4 rounded border" />
        <div className="animate-pulse space-y-3 p-4 rounded border" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="col-span-2 text-center py-12 text-red-500">
        Failed to load mentorships.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {data?.results?.length ? (
          data.results.map((mentorship: any) => (
            <MentorshipCard
              key={mentorship.id}
              id={mentorship.id.toString()}
              title={mentorship.title}
              description={mentorship.description}
              workMode={mentorship.work_mode}
              category={mentorship.category}
              availableSlots={mentorship.remaining_slots}
              durationWeeks={mentorship.duration_weeks}
              startDate={mentorship.start_date}
              endDate={mentorship.end_date}
              variant="view"
              onApply={() =>
                router.navigate({
                  to: `/student/mentorships/${mentorship.id}/apply`,
                })
              }
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            No mentorships available yet.
          </div>
        )}
      </div>
    </div>
  )
}
