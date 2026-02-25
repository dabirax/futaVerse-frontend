import { Plus } from 'lucide-react'
import { useRouter} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useMentorshipOffers, useWithdrawMentorshipOffer } from '@/hooks/useMentorships'
import CardSkeleton5 from '@/components/skeletons/CardSkeleton5'
import StudentCard from '@/components/user/internships/StudentCard'

export default function OffersSentTab() {
  const navigate = useRouter().navigate
  const { data, isLoading, isError } = useMentorshipOffers()
    const { mutate: withdrawOffer } = useWithdrawMentorshipOffer()
    if (isLoading) {
      return <CardSkeleton5 variant="r-full"/>
    }
  
    if (isError) {
      return <p className="text-sm text-destructive">Failed to load offers</p>
    }
  
    if (!data?.results?.length) {
      return <p className="text-center py-12 text-muted-foreground">No offers yet</p>
    }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate({ to: '/alumnus/mentorships/send-offer' })}
        >
          <Plus className="h-4 w-4" />
          Send Offer
        </Button>
      </div>

      <div className="space-y-3">
        {data?.results?.map((offer: any) => (
          <StudentCard
            key={offer.id}
            variant="offer"
            studentName={`Student ${offer.student}`}
            Title={offer.mentorship}
            onWithdraw={() => withdrawOffer(offer.id)}
          />
        ))}
      </div>
    </div>
  )
}
