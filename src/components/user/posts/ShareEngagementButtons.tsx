import { useState } from 'react'
import { Share2 } from 'lucide-react'
import type { EngagementKind, EngagementPostStatus } from '@/types/posts'
import { Button } from '@/components/ui/button'
import ShareEngagementDialog from '@/components/user/posts/ShareEngagementDialog'

interface ShareEngagementButtonsProps {
  engagement: { sqid: string; title: string; kind: EngagementKind }
}

export default function ShareEngagementButtons({
  engagement,
}: ShareEngagementButtonsProps) {
  const [status, setStatus] = useState<EngagementPostStatus | null>(null)

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <Button
        size="sm"
        variant="outline"
        className="h-8 text-xs"
        onClick={() => setStatus('started')}
      >
        <Share2 className="mr-1.5 h-3.5 w-3.5" />
        Share start
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="h-8 text-xs"
        onClick={() => setStatus('completed')}
      >
        <Share2 className="mr-1.5 h-3.5 w-3.5" />
        Share completion
      </Button>

      {status && (
        <ShareEngagementDialog
          open
          onOpenChange={(open) => {
            if (!open) setStatus(null)
          }}
          engagement={engagement}
          status={status}
        />
      )}
    </div>
  )
}
