import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import StudentCard from '../../../../../components/user/internships/StudentCard'
import { Button } from '@/components/ui/button'
import {
  useInternshipOffers,
  useWithdrawInternshipOffer,
} from '@/hooks/useInternships'
import CardSkeleton5 from '@/components/skeletons/CardSkeleton5'

export default function OffersTab() {
  const { data, isLoading, isError } = useInternshipOffers()
  const { mutate: withdrawOffer } = useWithdrawInternshipOffer()
  if (isLoading) {
    return <CardSkeleton5 variant="r-full"/>
  }

  if (isError) {
    return <p className="text-sm text-destructive">Failed to load offers</p>
  }

  if (!data?.results?.length) {
    return <p className="text-sm text-muted-foreground">No offers yet</p>
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }}>
          <Button className="p-2 mr-4">
            <Plus className="h-4 w-4" />
            Create Offer
          </Button>
        </motion.div>
      </div>

      <div className="space-y-3">
        {data?.results?.length > 0 ? (
          data.results.map((offer: any, index: number) => (
            <StudentCard
              key={index}
              {...offer}
              studentName={`${offer.student.firstname} ${offer.student.lastname}`}
              Title={offer.internship.title}
              variant="offer"
              onWithdraw={() => withdrawOffer(offer.id)}
            />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No offers sent yet.
          </div>
        )}
      </div>
    </div>
  )
}
