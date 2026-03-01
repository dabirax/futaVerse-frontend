import { useRouter } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import MentorshipCard from '../../../../../components/user/mentorships/MentorshipCard'
import { Button } from '@/components/ui/button'
import { useMentorships } from '@/hooks/useMentorships'
import CardSkeleton1 from '@/components/skeletons/CardSkeleton1'

export default function AvailableMentorshipsTab() {
  const navigate = useRouter().navigate
  const { data, isLoading, isError } = useMentorships()





  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => navigate({ to: '/student/mentorships/create' })}>
          <Plus className="h-4 w-4" />
          Create New Mentorship
        </Button>
      </div>

      {/* DATA FETCH LOGIC */}
      {isLoading && <CardSkeleton1 />}

      {isError && (
        <div className="col-span-2 text-center py-12 text-red-500">
          Something went wrong fetching internships.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {data?.results.map((mentorship: any, index: number) => (
          <MentorshipCard
            key={index}
            id={mentorship.id}
            {...mentorship}
            variant="manage"
            onEdit={() =>
              navigate({ to: `/alumnus/mentorships/${mentorship.id}/edit` })
            }
            ship="mentorship"
          />
        ))}
      </div>
    </div>
  )
}
