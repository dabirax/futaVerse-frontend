import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import type { EngagementKind, EngagementPostStatus } from '@/types/posts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  useShareEngagement,
  useShareEngagementCompletion,
} from '@/hooks/usePosts'

const statusLabels: Record<EngagementPostStatus, string> = {
  started: 'Share Start',
  completed: 'Share Completion',
}

const statusNouns: Record<EngagementPostStatus, string> = {
  started: 'start',
  completed: 'completion',
}

interface ShareEngagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  engagement: { sqid: string; title: string; kind: EngagementKind }
  status: EngagementPostStatus
  onSuccess?: () => void
}

export default function ShareEngagementDialog({
  open,
  onOpenChange,
  engagement,
  status,
  onSuccess,
}: ShareEngagementDialogProps) {
  const [content, setContent] = useState('')
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const shareStart = useShareEngagement()
  const shareCompletion = useShareEngagementCompletion()
  const mutation = status === 'started' ? shareStart : shareCompletion

  useEffect(() => {
    if (open) setContent('')
  }, [open])

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync({
        engagement_type:
          engagement.kind === 'internship'
            ? 'internship_engagement'
            : 'mentorship_engagement',
        engagement: engagement.sqid,
        content: content.trim(),
      })
      onOpenChange(false)
      onSuccess?.()
      setSuccessOpen(true)
    } catch (err) {
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : 'Please try again in a moment.',
      )
      onOpenChange(false)
      setErrorOpen(true)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{statusLabels[status]}</DialogTitle>
            <DialogDescription>
              Share the {statusNouns[status]} of your{' '}
              <span className="font-medium text-foreground">
                {engagement.title}
              </span>{' '}
              engagement with the FUTA community.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Tell your network about your ${engagement.kind} ${statusNouns[status]}...`}
            rows={5}
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={mutation.isPending || !content.trim()}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sharing...
                </>
              ) : (
                statusLabels[status]
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>
            <DialogTitle className="text-center">Shared!</DialogTitle>
            <DialogDescription className="text-center">
              Your {engagement.kind} {statusNouns[status]} post is now live on
              the feed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setSuccessOpen(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-7 w-7 text-destructive" />
            </div>
            <DialogTitle className="text-center">
              Something went wrong
            </DialogTitle>
            <DialogDescription className="text-center">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button variant="destructive" onClick={() => setErrorOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
