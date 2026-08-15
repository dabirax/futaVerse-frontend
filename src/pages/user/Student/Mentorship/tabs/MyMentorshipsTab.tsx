import MentorshipCard from '../../../../../components/user/ShipCard'
import { CardSkeleton1 } from '@/components/CardSkeletons'
import ShareEngagementButtons from '@/components/user/posts/ShareEngagementButtons'
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
              <div key={mentorship.id} className="space-y-2">
                <MentorshipCard
                  role="student"
                  {...mentorship}
                  sqid={mentorship.mentorship_info.sqid}
                  title={mentorship.mentorship_info.title}
                  alumnusName={`${mentorship.alumnus_info.firstname} ${mentorship.alumnus_info.lastname}`}
                  company={mentorship.mentorship_info.category}
                  ship="mentorship"
                />
                <ShareEngagementButtons
                  engagement={{
                    sqid: mentorship.sqid ?? mentorship.id,
                    title: mentorship.mentorship_info.title,
                    kind: 'mentorship',
                  }}
                />
              </div>
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
