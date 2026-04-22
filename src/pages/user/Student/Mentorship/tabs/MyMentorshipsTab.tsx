
import MentorshipCard from '../../../../../components/user/ShipCard'
import { CardSkeleton1 } from '@/components/CardSkeletons'
import { useMentorshipEngagements } from '@/hooks/useMentorships'

export default function MyMentorshipsTab() {
  const { data, isLoading, isError } = useMentorshipEngagements()

  const { results: mentorships } = data || {}

  return (
    <div className="space-y-4">
      {/* DATA FETCH LOGIC */}
      {isLoading && <CardSkeleton1 />}

      {isError && (
        <div className="col-span-2 text-center py-12 text-red-500">
          Something went wrong fetching mentorships.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4 md:grid-cols-2">
          {mentorships !== undefined && mentorships.length > 0 ? (
            mentorships.map((mentorship: any) => (
              <MentorshipCard key={mentorship.id} {...mentorship} />
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-muted-foreground">
              No mentorships yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
