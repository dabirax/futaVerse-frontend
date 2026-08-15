import InternshipCard from '../../../../../components/user/ShipCard'
import { CardSkeleton1 } from '@/components/CardSkeletons'
import ShareEngagementButtons from '@/components/user/posts/ShareEngagementButtons'
import { useInternshipEngagements } from '@/hooks/useInternships'

export default function MyInternshipsTab() {
  const { data, isLoading, isError } = useInternshipEngagements()

  const { results: internships } = data || {}

  return (
    <div className="space-y-4">
      {/* DATA FETCH LOGIC */}
      {isLoading && <CardSkeleton1 />}

      {isError && (
        <div className="col-span-2 text-center py-12 text-red-500">
          Something went wrong fetching internships.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4 md:grid-cols-2">
          {internships !== undefined && internships.length > 0 ? (
            internships.map((internship: any) => (
              <div key={internship.id} className="space-y-2">
                <InternshipCard
                  role="student"
                  {...internship}
                  sqid={internship.internship_info.sqid}
                  title={internship.internship_info.title}
                  alumnusName={`${internship.alumnus_info.firstname} ${internship.alumnus_info.lastname}`}
                  company={internship.internship_info.industry}
                  ship="internship"
                />
                <ShareEngagementButtons
                  engagement={{
                    sqid: internship.sqid ?? internship.id,
                    title: internship.internship_info.title,
                    kind: 'internship',
                  }}
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-muted-foreground">
              No internships yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
