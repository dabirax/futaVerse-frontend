import { useState } from 'react'
import MentorshipCard from '../../../../../components/user/ShipCard'
import { CardSkeleton1 } from '@/components/CardSkeletons'
import ShareEngagementButtons from '@/components/user/posts/ShareEngagementButtons'
import { useMentorshipEngagements } from '@/hooks/useMentorships'

export default function MyMentorshipsTab() {
  const { data, isLoading, isError } = useMentorshipEngagements()
  const { results: mentorships } = data || {}

  const [sharedStartIds, setSharedStartIds] = useState<Set<string>>(new Set())
  const [sharedCompletionIds, setSharedCompletionIds] = useState<Set<string>>(
    new Set(),
  )

  return (
    <div className="space-y-4">
      {isLoading && <CardSkeleton1 />}

      {isError && (
        <div className="col-span-2 text-center py-12 text-red-500">
          Something went wrong fetching mentorships.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4 md:grid-cols-2">
          {mentorships !== undefined && mentorships.length > 0 ? (
            mentorships.map((mentorship: any) => {
              const engagementSqid = mentorship.sqid ?? String(mentorship.id)
              return (
                <MentorshipCard
                  key={mentorship.id}
                  role="student"
                  sqid={mentorship.mentorship_info.sqid}
                  title={mentorship.mentorship_info.title}
                  description={mentorship.mentorship_info.description}
                  alumnusName={`${mentorship.alumnus_info.firstname} ${mentorship.alumnus_info.lastname}`}
                  company={mentorship.mentorship_info.category}
                  ship="mentorship"
                >
                  <ShareEngagementButtons
                    engagement={{
                      sqid: engagementSqid,
                      title: mentorship.mentorship_info.title,
                      kind: 'mentorship',
                    }}
                    engagementStatus={mentorship.status}
                    sharedStart={sharedStartIds.has(engagementSqid)}
                    sharedCompletion={sharedCompletionIds.has(engagementSqid)}
                    onSharedStart={() =>
                      setSharedStartIds((prev) =>
                        new Set(prev).add(engagementSqid),
                      )
                    }
                    onSharedCompletion={() =>
                      setSharedCompletionIds((prev) =>
                        new Set(prev).add(engagementSqid),
                      )
                    }
                  />
                </MentorshipCard>
              )
            })
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
