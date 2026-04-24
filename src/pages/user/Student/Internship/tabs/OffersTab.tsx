import { CardSkeleton4 } from '@/components/CardSkeletons'
import InternshipCard2 from '@/components/user/internships/InternshipCard2'
import {
  useAcceptInternshipOffer,
  useInternshipOffers,
  useRejectInternshipOffer,
} from '@/hooks/useInternships'

export default function OffersPage() {
  const { data, isLoading, isError } = useInternshipOffers()
  const { mutate: acceptOffer } = useAcceptInternshipOffer()
  const { mutate: rejectOffer } = useRejectInternshipOffer()

  if (isLoading) {
    return <CardSkeleton4 variant="r-sm" />
  }

  if (isError) {
    return <p className="text-sm text-destructive">Failed to load offers</p>
  }

  if (!data?.results?.length) {
    return <p className="text-sm text-muted-foreground">No offers yet</p>
  }

  return (
    <div className="space-y-4">
      {data.results.map((offer: any) => (
        <InternshipCard2
          key={offer.id}
          title={offer.internship_info.title}
          alumnusName={`${offer.alumnus_info.firstname} ${offer.alumnus_info.lastname}`}
          company={offer.internship_info.industry}
          variant="acceptOrReject"
          onAccept={() => {
            acceptOffer(offer.sqid)
          }}
          onReject={() => {
            rejectOffer(offer.sqid)
          }}
        />
      ))}
    </div>
  )
}
