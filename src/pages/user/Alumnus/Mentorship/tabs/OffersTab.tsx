import { Plus } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  useMentorshipOffers,
  useWithdrawMentorshipOffer,
} from '@/hooks/useMentorships'
import { CardSkeleton5 } from '@/components/CardSkeletons'
import StudentCard from '@/components/user/internships/StudentCard'
import { useToast } from '@/hooks/use-toast'

export default function OffersSentTab() {
  const navigate = useRouter().navigate
  const { data, isLoading, isError } = useMentorshipOffers()
  const { mutateAsync: withdrawOffer } = useWithdrawMentorshipOffer()
  const { toast } = useToast()

  const getErrorMessage = (err: any, fallback: string) =>
    err?.response?.data?.detail?.[0] ||
    err?.response?.data?.detail ||
    err?.response?.data?.message ||
    err?.message ||
    fallback
  if (isLoading) {
    return <CardSkeleton5 variant="r-full" />
  }

  if (isError) {
    return <p className="text-sm text-destructive">Failed to load offers</p>
  }

  if (!data?.results?.length) {
    return (
      <p className="text-center py-12 text-muted-foreground">No offers yet</p>
    )
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
            studentName={`${offer.student_info.firstname} ${offer.student_info.lastname}`}
            title={offer.mentorship_info.title}
            onWithdraw={() =>
              withdrawOffer(offer.sqid, {
                onSuccess: () =>
                  toast({
                    title: 'Success',
                    description: 'Offer withdrawn.',
                  }),
                onError: (err: any) =>
                  toast({
                    title: 'Error',
                    description: getErrorMessage(
                      err,
                      'Failed to withdraw offer.',
                    ),
                    variant: 'destructive',
                  }),
              })
            }
          />
        ))}
      </div>
    </div>
  )
}
