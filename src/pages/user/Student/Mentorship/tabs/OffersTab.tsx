import {
  useMentorshipOffers,
  useAcceptMentorshipOffer,
  useRejectMentorshipOffer,
} from '@/hooks/useMentorships'
import { useEffect } from 'react'
import InternshipCard2 from '@/components/user/internships/InternshipCard2'

export default function OffersTab() {
  const { data, isLoading, isError, refetch } = useMentorshipOffers()
  const acceptOffer = useAcceptMentorshipOffer()
  const rejectOffer = useRejectMentorshipOffer()
  const offers = data?.results || []

  useEffect(() => {
    refetch?.()
  }, [refetch])

  if (isLoading)
    return (
      <div className="space-y-3">
        <div className="animate-pulse h-32 rounded border" />
      </div>
    )
  if (isError)
    return <div className="text-sm text-destructive">Failed to load offers</div>
  if (!offers.length)
    return (
      <div className="text-center py-12 text-muted-foreground">
        No offers received yet.
      </div>
    )

  return (
    <div className="space-y-3">
      {offers.map((offer: any) => (
        <InternshipCard2
          key={offer.id}
          alumnusName={offer.alumnus_info.firstname+ " " + offer.alumnus_info.lastname}
          title={offer.mentorship_info.title }
          variant="acceptOrReject"
          onAccept={() => acceptOffer.mutate(offer.id)}
          onReject={() => rejectOffer.mutate(offer.id)}
        />
      ))}
    </div>
  )
}
