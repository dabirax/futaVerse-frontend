import { useRouter } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import InternshipCard from '../../../../../components/user/ShipCard'
import { Button } from '@/components/ui/button'
import { CardSkeleton1 } from '@/components/CardSkeletons'
import { useInternships } from '@/hooks/useInternships'

export default function MyInternshipsTab() {
  const { data, isLoading, isError } = useInternships()
  const { results: internships } = data || {}
  const router = useRouter()

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
      <div className="text-center py-12">
        <p className="text-ink-soft text-body mb-4">
          No internships created yet.
        </p>
        <Button
          onClick={() =>
            router.navigate({ to: '/alumnus/internships/create' })
          }
        >
          <Plus className="h-4 w-4" />
          Create Your First Internship
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {internships.map((internship: any) => (
        <InternshipCard
          key={internship.sqid}
          {...internship}
          ship="internship"
          role="alumnus"
        />
      ))}
    </div>
  )
}
