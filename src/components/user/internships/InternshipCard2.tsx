import ConfirmActionDialog from '../ConfirmActionDialog'
import { Button } from '@/components/ui/button'

type InternshipCardProps = {
  title: string
  alumnusName: string
  company?: string
  logo?: string
  showActions?: boolean
  variant?: 'acceptOrReject' | 'withdraw'
  onAccept?: () => void
  onReject?: () => void
  onWithdraw?: () => void
}

export default function InternshipCard2({
  title,
  alumnusName,
  company,
  showActions = true,
  variant = 'acceptOrReject',
  onAccept,
  onReject,
  onWithdraw,
}: InternshipCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-line bg-surface p-4 shadow-xs">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-md bg-maroon-soft flex items-center justify-center shrink-0">
          <span className="text-maroon font-display text-sm font-semibold">
            {title
              .split(' ')
              .map((word) => word[0])
              .join('')
              .substring(0, 2)
              .toUpperCase()}
          </span>
        </div>

        <div className="min-w-0">
          <h4 className="font-semibold text-foreground text-sm truncate">
            {title}
          </h4>
          <p className="text-body-sm text-ink-soft truncate">
            {company ?? '—'} · Posted by {alumnusName}
          </p>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2 shrink-0">
          {variant === 'acceptOrReject' && (
            <>
              <ConfirmActionDialog
                trigger={<Button size="sm">Accept</Button>}
                title={`Accept offer for "${title}"?`}
                description={`You are about to accept this internship offer from ${alumnusName}.`}
                confirmLabel="Yes, accept"
                successTitle="Offer accepted"
                successDescription={`You have accepted the "${title}" internship.`}
                onConfirm={() => onAccept?.()}
              />

              <ConfirmActionDialog
                trigger={
                  <Button size="sm" variant="destructive">
                    Reject
                  </Button>
                }
                title={`Reject offer for "${title}"?`}
                description="This will reject the internship offer. This action cannot be undone."
                confirmLabel="Yes, reject"
                destructive
                successTitle="Offer rejected"
                successDescription={`You have rejected the "${title}" internship.`}
                onConfirm={() => onReject?.()}
              />
            </>
          )}

          {variant === 'withdraw' && (
            <ConfirmActionDialog
              trigger={
                <Button size="sm" variant="destructive">
                  Withdraw
                </Button>
              }
              title="Withdraw application?"
              description={`This will withdraw your application for "${title}".`}
              confirmLabel="Yes, withdraw"
              destructive
              successTitle="Application withdrawn"
              successDescription={`You have withdrawn from "${title}".`}
              onConfirm={() => onWithdraw?.()}
            />
          )}
        </div>
      )}
    </div>
  )
}
