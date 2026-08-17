import { useState } from 'react'
import InternshipCard from '../../../../../components/user/ShipCard'
import { CardSkeleton1 } from '@/components/CardSkeletons'
import ShareEngagementButtons from '@/components/user/posts/ShareEngagementButtons'
import { useInternshipEngagements } from '@/hooks/useInternships'

export default function MyInternshipsTab() {
  const { data, isLoading, isError } = useInternshipEngagements()
  const { results: internships } = data || {}

  const [sharedStartIds, setSharedStartIds] = useState<Set<string>>(new Set())
  const [sharedCompletionIds, setSharedCompletionIds] = useState<Set<string>>(
    new Set(),
  )

  if (isLoading) {
    return <CardSkeleton1 />
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-destructive text-body">
        Something went wrong fetching internships.
      </div>
    )
  }

  if (!internships?.length) {
    return (
      <div className="text-center py-12 text-ink-soft text-body">
        No internships yet.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {internships.map((internship: any) => {
        const engagementSqid = internship.sqid ?? String(internship.id)
        return (
          <InternshipCard
            key={internship.id}
            role="student"
            sqid={internship.internship_info.sqid}
            title={internship.internship_info.title}
            description={internship.internship_info.description}
            alumnusName={`${internship.alumnus_info.firstname} ${internship.alumnus_info.lastname}`}
            company={internship.internship_info.industry}
            ship="internship"
          >
            <ShareEngagementButtons
              engagement={{
                sqid: engagementSqid,
                title: internship.internship_info.title,
                kind: 'internship',
              }}
              engagementStatus={internship.status}
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
          </InternshipCard>
        )
      })}
    </div>
  )
}
