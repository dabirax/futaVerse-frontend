import { useEffect } from 'react'
import {
  useAcceptMentorshipOffer,
  useMentorshipOffers,
  useRejectMentorshipOffer,
} from '@/hooks/useMentorships'
import InternshipCard2 from '@/components/user/internships/InternshipCard2'
import { useToast } from '@/hooks/use-toast'

export default function OffersTab() {
  const { data, isLoading, isError, refetch } = useMentorshipOffers()
  const acceptOffer = useAcceptMentorshipOffer()
  const rejectOffer = useRejectMentorshipOffer()
  const { toast } = useToast()
  const offers = data?.results || []

  const getErrorMessage = (err: any, fallback: string) =>
    err?.response?.data?.detail?.[0] ||
    err?.response?.data?.detail ||
    err?.response?.data?.message ||
    err?.message ||
    fallback

  useEffect(() => {
    refetch()
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
          alumnusName={
            offer.alumnus_info.firstname + ' ' + offer.alumnus_info.lastname
          }
          title={offer.mentorship_info.title}
          variant="acceptOrReject"
          onAccept={() =>
            acceptOffer.mutateAsync(offer.sqid, {
              onSuccess: () =>
                toast({
                  title: 'Success',
                  description: 'Offer accepted! You are now a mentee.',
                }),
              onError: (err: any) =>
                toast({
                  title: 'Error',
                  description: getErrorMessage(err, 'Failed to accept offer.'),
                  variant: 'destructive',
                }),
            })
          }
          onReject={() =>
            rejectOffer.mutateAsync(offer.sqid, {
              onSuccess: () =>
                toast({
                  title: 'Success',
                  description: 'Offer rejected.',
                }),
              onError: (err: any) =>
                toast({
                  title: 'Error',
                  description: getErrorMessage(err, 'Failed to reject offer.'),
                  variant: 'destructive',
                }),
            })
          }
        />
      ))}
    </div>
  )
}
