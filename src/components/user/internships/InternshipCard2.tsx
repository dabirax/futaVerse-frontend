import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ConfirmActionDialog from '../ConfirmActionDialog'

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
  logo,
  showActions = true,
  variant = 'acceptOrReject',
  onAccept,
  onReject,
  onWithdraw,
}: InternshipCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage src={logo} />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                {title
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h4 className="font-semibold text-foreground">{title}</h4>
              <p className="text-sm text-muted-foreground">
                {company ?? '—'} • Posted by {alumnusName}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          {showActions && (
            <div className="flex gap-2">
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
                    description={`This will reject the internship offer. This action cannot be undone.`}
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
      </CardContent>
    </Card>
  )
}
