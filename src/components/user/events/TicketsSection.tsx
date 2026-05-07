import { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Ticket as TicketIcon } from 'lucide-react'
import {
  FreeTicketConfig,
  LinkedBankAccount,
  PaidTicketInput,
} from '@/types/event'
import PaystackBankLink from './PaystackBankLink'

export type TicketScenario = 'free' | 'free_and_paid' | 'paid'

export const paidTicketSchema = z.object({
  name: z.string().min(1, 'Ticket name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  discount_perc: z.string().optional().default('0'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  sales_start: z.string().min(1, 'Sales start is required'),
  sales_end: z.string().min(1, 'Sales end is required'),
  is_active: z.boolean().default(true),
})

interface TicketsSectionProps {
  scenario: TicketScenario
  onScenarioChange: (s: TicketScenario) => void
  freeTicket: FreeTicketConfig
  onFreeTicketChange: (cfg: FreeTicketConfig) => void
  paidTickets: PaidTicketInput[]
  onPaidTicketsChange: (tickets: PaidTicketInput[]) => void
  linkedBankAccount: LinkedBankAccount | null
  onLinkedBankAccountChange: (acc: LinkedBankAccount | null) => void
}

const emptyPaidTicket: PaidTicketInput = {
  name: '',
  description: '',
  price: '0',
  discount_perc: '0',
  quantity: 100,
  sales_start: '',
  sales_end: '',
  is_active: true,
}

/**
 * Unified tickets configuration block used by both Create and Edit Event pages.
 * Supports 3 scenarios per the API:
 *   1. Free tickets only        → free_ticket: { required: true, quantity }
 *   2. Free + paid variations   → free_ticket + tickets[]
 *   3. Paid variations only     → tickets[] (free_ticket.required: false)
 *
 * Renders the inline Paystack payout-link UI whenever paid tickets are involved.
 */
export default function TicketsSection({
  scenario,
  onScenarioChange,
  freeTicket,
  onFreeTicketChange,
  paidTickets,
  onPaidTicketsChange,
  linkedBankAccount,
  onLinkedBankAccountChange,
}: TicketsSectionProps) {
  const [draft, setDraft] = useState<PaidTicketInput>(emptyPaidTicket)
  const [draftError, setDraftError] = useState<string | null>(null)

  const showFreeBlock = scenario === 'free' || scenario === 'free_and_paid'
  const showPaidBlock = scenario === 'paid' || scenario === 'free_and_paid'

  const handleAddTicket = () => {
    const result = paidTicketSchema.safeParse(draft)
    if (!result.success) {
      setDraftError(result.error.issues[0]?.message ?? 'Invalid ticket')
      return
    }
    onPaidTicketsChange([...paidTickets, result.data as PaidTicketInput])
    setDraft(emptyPaidTicket)
    setDraftError(null)
  }

  const removeTicket = (index: number) => {
    onPaidTicketsChange(paidTickets.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TicketIcon className="h-5 w-5" />
          Tickets
        </CardTitle>
        <CardDescription>
          Choose how attendees will register for this event.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Scenario picker */}
        <RadioGroup
          value={scenario}
          onValueChange={(v) => onScenarioChange(v as TicketScenario)}
          className="grid sm:grid-cols-3 gap-3"
        >
          {[
            {
              value: 'free' as const,
              title: 'Free only',
              desc: 'Single free RSVP ticket.',
            },
            {
              value: 'free_and_paid' as const,
              title: 'Free + paid',
              desc: 'A free tier plus paid variations.',
            },
            {
              value: 'paid' as const,
              title: 'Paid only',
              desc: 'One or more paid ticket types.',
            },
          ].map((opt) => (
            <Label
              key={opt.value}
              htmlFor={`scenario-${opt.value}`}
              className={`flex flex-col gap-1 rounded-lg border p-3 cursor-pointer transition-colors ${
                scenario === opt.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={opt.value}
                  id={`scenario-${opt.value}`}
                />
                <span className="font-medium text-sm">{opt.title}</span>
              </div>
              <span className="text-xs text-muted-foreground pl-6">
                {opt.desc}
              </span>
            </Label>
          ))}
        </RadioGroup>

        {/* Free ticket configuration */}
        {showFreeBlock && (
          <div className="rounded-lg border p-4 space-y-3">
            <div>
              <h4 className="font-medium text-foreground">Free ticket</h4>
              <p className="text-sm text-muted-foreground">
                Attendees claim one free spot. Set the available quantity.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-sm">Free seats available</Label>
                <Input
                  type="number"
                  min={1}
                  value={freeTicket.quantity || ''}
                  onChange={(e) =>
                    onFreeTicketChange({
                      required: true,
                      quantity: parseInt(e.target.value, 10) || 0,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Paid tickets list + add form */}
        {showPaidBlock && (
          <div className="space-y-4">
            {paidTickets.length > 0 && (
              <div className="space-y-3">
                {paidTickets.map((t, index) => (
                  <div key={index} className="p-4 rounded-lg border space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.description}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTicket(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span>
                        ₦{parseFloat(t.price || '0').toLocaleString()}
                      </span>
                      {t.discount_perc && t.discount_perc !== '0' && (
                        <span>{t.discount_perc}% off</span>
                      )}
                      <span>{t.quantity} available</span>
                      <span>{t.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sales: {new Date(t.sales_start).toLocaleDateString()} –{' '}
                      {new Date(t.sales_end).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 p-4 rounded-lg border border-dashed">
              <p className="text-sm font-medium">Add paid ticket variation</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input
                  placeholder="Name (e.g. VIP)"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
                <Input
                  placeholder="Quantity"
                  type="number"
                  min={1}
                  value={draft.quantity}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      quantity: parseInt(e.target.value, 10) || 1,
                    })
                  }
                />
              </div>
              <Textarea
                placeholder="Description"
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
                className="min-h-[60px]"
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-sm">Price (₦)</Label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={draft.price}
                    onChange={(e) =>
                      setDraft({ ...draft, price: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Discount %</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.discount_perc}
                    onChange={(e) =>
                      setDraft({ ...draft, discount_perc: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-sm">Sales start</Label>
                  <Input
                    type="datetime-local"
                    value={draft.sales_start}
                    onChange={(e) =>
                      setDraft({ ...draft, sales_start: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Sales end</Label>
                  <Input
                    type="datetime-local"
                    value={draft.sales_end}
                    onChange={(e) =>
                      setDraft({ ...draft, sales_end: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={draft.is_active}
                    onCheckedChange={(v) =>
                      setDraft({ ...draft, is_active: v })
                    }
                  />
                  <span className="text-sm">Active</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTicket}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add ticket
                </Button>
              </div>
              {draftError && (
                <p className="text-sm text-destructive">{draftError}</p>
              )}
            </div>

            {/* Inline Paystack payout linking */}
            <PaystackBankLink
              value={linkedBankAccount}
              onLinked={onLinkedBankAccountChange}
              onUnlinked={() => onLinkedBankAccountChange(null)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
