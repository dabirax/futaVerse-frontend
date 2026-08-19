import { useMemo, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useCreateMentorshipOffer,
  useMentorshipApplications,
  useMentorshipEngagements,
  useMentorships,
} from '@/hooks/useMentorships'
import { useToast } from '@/hooks/use-toast'
import { getErrorMessage } from '@/lib/utils'
import { BackButton2 } from '@/components/BackButtons'

interface StudentOption {
  sqid: string
  name: string
  department?: string
}

export default function SendMentorshipOffer() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: mentorships, isLoading: loadingMentorships } = useMentorships()
  const { data: applications } = useMentorshipApplications()
  const { data: engagements } = useMentorshipEngagements()
  const createOffer = useCreateMentorshipOffer()

  const [mentorship, setMentorship] = useState('')
  const [student, setStudent] = useState('')

  const students = useMemo<Array<StudentOption>>(() => {
    const map = new Map<string, StudentOption>()
    const add = (info: any) => {
      if (!info?.sqid) return
      map.set(info.sqid, {
        sqid: info.sqid,
        name: `${info.firstname ?? ''} ${info.lastname ?? ''}`.trim(),
        department: info.department,
      })
    }
    applications?.results?.forEach((app: any) => add(app.student_info))
    engagements?.results?.forEach((eng: any) => add(eng.student_info))
    return [...map.values()]
  }, [applications, engagements])

  const selectedMentorship = mentorships?.results?.find(
    (m: any) => m.sqid === mentorship,
  )

  const handleSend = () => {
    if (!mentorship || !student) {
      toast({
        title: 'Validation',
        description: 'Select both a mentorship and a student.',
        variant: 'destructive',
      })
      return
    }
    createOffer.mutate(
      { mentorship, student },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Offer sent to the student successfully!',
          })
          router.navigate({ to: '/alumnus/mentorships' })
        },
        onError: (err: any) => {
          toast({
            title: 'Error',
            description: getErrorMessage(err, 'Failed to send offer.'),
            variant: 'destructive',
          })
        },
      },
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <BackButton2 />

        <h1 className="text-3xl font-bold text-foreground">
          Send Mentorship Offer
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Offer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Mentorship</Label>
            <Select onValueChange={setMentorship} value={mentorship}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loadingMentorships
                      ? 'Loading mentorships...'
                      : 'Select a mentorship'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {mentorships?.results?.map((m: any) => (
                  <SelectItem key={m.sqid} value={m.sqid}>
                    {m.title} ({m.remaining_slots} slot
                    {m.remaining_slots === 1 ? '' : 's'} left)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedMentorship && selectedMentorship.remaining_slots === 0 && (
              <p className="text-sm text-destructive">
                This mentorship has no remaining slots.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Student</Label>
            <Select onValueChange={setStudent} value={student}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    students.length === 0
                      ? 'No known students yet (from applications or mentees)'
                      : 'Select a student'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {students.map((s) => (
                  <SelectItem key={s.sqid} value={s.sqid}>
                    {s.name}
                    {s.department ? ` · ${s.department}` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Offers can be sent to students who have applied to your
              mentorships or who you are already mentoring.
            </p>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.navigate({ to: '/alumnus/mentorships' })}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSend}
              disabled={createOffer.isPending}
            >
              {createOffer.isPending ? 'Sending...' : 'Send Offer'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
