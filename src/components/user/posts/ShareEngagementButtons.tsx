import { useState } from 'react'
import { CheckCircle2, Share2 } from 'lucide-react'
import type { EngagementKind, EngagementPostStatus } from '@/types/posts'
import { Button } from '@/components/ui/button'
import ShareEngagementDialog from '@/components/user/posts/ShareEngagementDialog'

interface ShareEngagementButtonsProps {
  engagement: { sqid: string; title: string; kind: EngagementKind }
  engagementStatus: string
  sharedStart: boolean
  sharedCompletion: boolean
  onSharedStart: () => void
  onSharedCompletion: () => void
}

export default function ShareEngagementButtons({
  engagement,
  engagementStatus,
  sharedStart,
  sharedCompletion,
  onSharedStart,
  onSharedCompletion,
}: ShareEngagementButtonsProps) {
  const [status, setStatus] = useState<EngagementPostStatus | null>(null)

  const isCompleted = engagementStatus === 'completed'

  const handleShareSuccess = () => {
    if (status === 'started') onSharedStart()
    else if (status === 'completed') onSharedCompletion()
    setStatus(null)
  }

  if (!isCompleted) {
    return (
      <>
        <Button
          size="sm"
          variant={sharedStart ? 'ghost' : 'outline'}
          className="h-8 text-xs"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setStatus('started')
          }}
        >
          {sharedStart ? (
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-600" />
          ) : (
            <Share2 className="mr-1.5 h-3.5 w-3.5" />
          )}
          {sharedStart ? 'Shared' : 'Share start'}
        </Button>

        {status && (
          <ShareEngagementDialog
            open
            onOpenChange={(open) => {
              if (!open) setStatus(null)
            }}
            engagement={engagement}
            status={status}
            onSuccess={handleShareSuccess}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Button
        size="sm"
        variant={sharedCompletion ? 'ghost' : 'outline'}
        className="h-8 text-xs"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setStatus('completed')
        }}
      >
        {sharedCompletion ? (
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-600" />
        ) : (
          <Share2 className="mr-1.5 h-3.5 w-3.5" />
        )}
        {sharedCompletion ? 'Shared' : 'Share completion'}
      </Button>

      {status && (
        <ShareEngagementDialog
          open
          onOpenChange={(open) => {
            if (!open) setStatus(null)
          }}
          engagement={engagement}
          status={status}
          onSuccess={handleShareSuccess}
        />
      )}
    </>
  )
}
