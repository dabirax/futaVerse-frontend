import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft } from 'lucide-react'
import { studentMentorshipDetailRoute } from '@/routes/user-student'
import { useCreateMentorshipApplication } from '@/hooks/useMentorships'
import { useToast } from '@/hooks/use-toast'

export default function MentorshipApply() {
  const router = useRouter()
  const { id } = studentMentorshipDetailRoute.useParams()
  const [coverLetter, setCoverLetter] = useState('')
  const createApplication = useCreateMentorshipApplication()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      toast({
        title: 'Validation',
        description: 'Please write a cover letter',
        variant: 'destructive',
      })
      return
    }
    setLoading(true)
    createApplication.mutate(
      { mentorship: id!, cover_letter: coverLetter },
      {
        onSuccess: () => {
          toast({ title: 'Applied', description: 'Application submitted' })
          router.navigate({ to: '/student/mentorships' })
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to apply',
            variant: 'destructive',
          })
        },
        onSettled: () => setLoading(false),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.navigate({ to: '/student/mentorships' })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground">
          Apply for Mentorship
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cover Letter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Tell us why you're interested..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="min-h-48"
          />

          <div className="flex gap-2">
            <Button onClick={handleApply} disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.navigate({ to: '/student/mentorships' })}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
