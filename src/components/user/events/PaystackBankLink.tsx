import { useEffect, useState } from 'react'
import { CheckCircle2, Landmark, Loader2 } from 'lucide-react'
import ConfirmActionDialog from '../ConfirmActionDialog'
import type { LinkedBankAccount } from '@/types/event'
import type { Bank } from '@/services/payments'
import { PaymentsService } from '@/services/payments'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'

interface PaystackBankLinkProps {
  /** Existing linked account (e.g. from the alumnus profile). */
  value?: LinkedBankAccount | null
  /** Called once an account is successfully linked (after the success modal). */
  onLinked?: (account: LinkedBankAccount) => void
  /** Called when the user removes the linked account. */
  onUnlinked?: () => void
}

/**
 * Inline Paystack payout-account linking flow used inside event creation when
 * paid tickets are present. Mirrors the standard pattern:
 *   1. List banks (GET /api/payments/banks)
 *   2. User picks bank + enters 10-digit account number
 *   3. Resolve the account name (POST /api/payments/resolve)
 *   4. Confirm + link (POST /api/payments/link-account)
 */
export default function PaystackBankLink({
  value,
  onLinked,
  onUnlinked,
}: PaystackBankLinkProps) {
  const { toast } = useToast()

  const [banks, setBanks] = useState<Array<Bank>>([])
  const [banksError, setBanksError] = useState<string | null>(null)
  const [bankCode, setBankCode] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState('')
  const [resolvedName, setResolvedName] = useState<string | null>(null)
  const [resolving, setResolving] = useState(false)
  const [linking, setLinking] = useState(false)

  useEffect(() => {
    let active = true
    PaymentsService.listBanks()
      .then((data) => {
        if (active) setBanks(data)
      })
      .catch((error: unknown) => {
        if (active) {
          setBanksError(
            error instanceof Error ? error.message : 'Failed to fetch banks',
          )
        }
      })
    return () => {
      active = false
    }
  }, [])

  const selectedBank = banks.find((b) => b.code === bankCode)
  const canResolve = !!bankCode && /^\d{10}$/.test(accountNumber)

  const resolveAccount = async () => {
    if (!selectedBank) return
    setResolving(true)
    setResolvedName(null)
    try {
      const result = await PaymentsService.resolveAccount({
        account_number: accountNumber,
        // bank_code: selectedBank.code,
        bank_code: '001',
        bank_name: selectedBank.name,
      })
      setResolvedName(result.account_name)
      toast({
        title: 'Account verified',
        description: result.account_name,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Could not resolve account.',
        variant: 'destructive',
      })
    } finally {
      setResolving(false)
    }
  }

  const linkAccount = async () => {
    if (!selectedBank || !resolvedName) return
    setLinking(true)
    try {
      await PaymentsService.linkAccount({
        account_number: accountNumber,
        // bank_code: selectedBank.code,
        bank_code: '001',
        bank_name: selectedBank.name,
      })
      onLinked?.({
        // bank_code: selectedBank.code,
        bank_code: '001',
        bank_name: selectedBank.name,
        account_number: accountNumber,
        account_name: resolvedName,
      })
      setBankCode('')
      setAccountNumber('')
      setResolvedName(null)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to link account.'
      throw new Error(
        /Subaccount already exists/i.test(message)
          ? 'A payout account is already linked to your profile — the existing (old) account is still being used for payouts. This new account could not be added.'
          : message,
      )
    } finally {
      setLinking(false)
    }
  }

  if (value) {
    return (
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Payout account linked</AlertTitle>
        <AlertDescription className="space-y-2">
          <div className="text-sm">
            <span className="font-medium text-foreground">
              {value.account_name}
            </span>
            <span className="text-muted-foreground">
              {' '}
              — {value.bank_name} • ••••{value.account_number.slice(-4)}
            </span>
          </div>
          <ConfirmActionDialog
            trigger={
              <Button type="button" variant="outline" size="sm">
                Change account
              </Button>
            }
            title="Unlink payout account?"
            description="You'll need to re-link a bank account before publishing paid tickets."
            confirmLabel="Yes, unlink"
            destructive
            successTitle="Account unlinked"
            successDescription="You can now link a different payout account."
            onConfirm={() => onUnlinked?.()}
          />
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="rounded-lg border border-dashed p-4 space-y-4">
      <div className="flex items-start gap-2">
        <Landmark className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <h4 className="font-medium text-foreground">Link payout account</h4>
          <p className="text-sm text-muted-foreground">
            Required to receive funds from paid ticket sales via Paystack.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Bank</label>
          <Select value={bankCode} onValueChange={setBankCode}>
            <SelectTrigger disabled={banks.length === 0 && !banksError}>
              <SelectValue
                placeholder={
                  banksError
                    ? 'Unavailable'
                    : banks.length === 0
                      ? 'Loading banks...'
                      : 'Select bank'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank.code} value={bank.code}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {banksError && (
            <p className="text-xs text-destructive">{banksError}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Account number</label>
          <Input
            inputMode="numeric"
            maxLength={10}
            placeholder="0123456789"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
              setResolvedName(null)
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={resolveAccount}
          disabled={!canResolve || resolving}
        >
          {resolving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resolving...
            </>
          ) : (
            'Resolve account'
          )}
        </Button>

        {resolvedName && (
          <ConfirmActionDialog
            trigger={
              <Button type="button" disabled={linking}>
                {linking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Linking...
                  </>
                ) : (
                  'Link account'
                )}
              </Button>
            }
            title="Link this account?"
            description={`Funds from paid ticket sales will be paid out to ${resolvedName} (${selectedBank?.name} • ${accountNumber}).`}
            errorTitle="Payout account already linked"
            confirmLabel="Yes, link account"
            successTitle="Payout account linked"
            successDescription="You can now publish events with paid tickets."
            onConfirm={linkAccount}
          />
        )}
      </div>
    </div>
  )
}
