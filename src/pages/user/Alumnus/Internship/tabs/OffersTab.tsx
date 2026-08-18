import { Plus } from 'lucide-react'
import StudentCard from '../../../../../components/user/internships/StudentCard'
import { Button } from '@/components/ui/button'
import {
  useInternshipOffers,
  useWithdrawInternshipOffer,
} from '@/hooks/useInternships'
import { CardSkeleton5 } from '@/components/CardSkeletons'

export default function OffersTab() {
  const { data, isLoading, isError } = useInternshipOffers()
  const { mutateAsync: withdrawOffer } = useWithdrawInternshipOffer()

  if (isLoading) {
    return <CardSkeleton5 variant="r-full" />
  }

  if (isError) {
    return <p className="text-body text-destructive">Failed to load offers</p>
  }

  if (!data?.results?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-ink-soft text-body mb-4">No offers sent yet.</p>
        <Button>
          <Plus className="h-4 w-4" />
          Create Offer
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.results.map((offer: any, index: number) => (
        <StudentCard
          key={index}
          {...offer}
          studentName={`${offer.student_info.firstname} ${offer.student_info.lastname}`}
          title={offer.internship_info.title}
          variant="offer"
          onWithdraw={() => withdrawOffer(offer.sqid)}
        />
      ))}
    </div>
  )
}
