import { cloneElement, isValidElement, ReactNode, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Loader2 } from 'lucide-react'

export interface ConfirmActionDialogProps {
  /** Element that opens the confirm dialog (e.g. a Button). Must accept onClick. */
  trigger: ReactNode
  /** Title shown in the confirmation step. */
  title: string
  /** Body shown in the confirmation step. */
  description: string
  /** Label for the confirm button. Defaults to "Confirm". */
  confirmLabel?: string
  /** Use destructive styling for the confirm button. */
  destructive?: boolean
  /** Title shown after success. */
  successTitle?: string
  /** Body shown after success. */
  successDescription?: string
  /**
   * The action to perform after confirmation. May be async.
   * Throw to indicate failure (success modal will not show).
   */
  onConfirm: () => void | Promise<void>
}

/**
 * Two-step action flow:
 *   1. AlertDialog asking "Are you sure?"
 *   2. Success Dialog after the action resolves.
 *
 * Designed to wrap any action button (accept, reject, withdraw, delete) so
 * future real API integration only needs to make `onConfirm` async.
 */
export default function ConfirmActionDialog({
  trigger,
  title,
  description,
  confirmLabel = 'Confirm',
  destructive = false,
  successTitle = 'Done',
  successDescription = 'The action completed successfully.',
  onConfirm,
}: ConfirmActionDialogProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setConfirmOpen(true)
  }

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
      setConfirmOpen(false)
      setSuccessOpen(true)
    } catch (err) {
      // Leave confirm open so the caller can surface its own error toast.
      console.error('ConfirmActionDialog onConfirm failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // Clone trigger to inject onClick without forcing the caller to wire it.
  const wrappedTrigger = isValidElement(trigger)
    ? cloneElement(
        trigger as React.ReactElement<{
          onClick?: (e: React.MouseEvent) => void
        }>,
        {
          onClick: handleTriggerClick,
        },
      )
    : trigger

  return (
    <>
      {wrappedTrigger}

      <AlertDialog
        open={confirmOpen}
        onOpenChange={(o) => !loading && setConfirmOpen(o)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleConfirm()
              }}
              disabled={loading}
              className={
                destructive
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : undefined
              }
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Working...
                </>
              ) : (
                confirmLabel
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>
            <DialogTitle className="text-center">{successTitle}</DialogTitle>
            <DialogDescription className="text-center">
              {successDescription}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setSuccessOpen(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
