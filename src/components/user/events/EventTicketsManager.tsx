import { useEffect, useMemo, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Users } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { PaidTicketInput, Ticket } from '@/types/event'
import { paidTicketSchema } from '@/components/user/events/TicketsSection'
import { useAddEventTicket, useEvent, useHostedEvents } from '@/hooks/useEvents'

const emptyDraft: PaidTicketInput = {
  name: '',
  description: '',
  price: '0',
  discount_perc: '0',
  quantity: 50,
  sales_start: '',
  sales_end: '',
  is_active: true,
}

interface Props {
  /** When provided, the manager is locked to this event (no selector). */
  eventSqid?: string
  /** Show the event picker; ignored when eventSqid is set. */
  showEventSelector?: boolean
  /** Hide top-level header (use when embedded under another title). */
  hideHeader?: boolean
}

export default function EventTicketsManager({
  eventSqid,
  showEventSelector = true,
  hideHeader = false,
}: Props) {
  const { toast } = useToast()

  const { data: hostedData, isLoading: loadingEvents } = useHostedEvents()
  const hostedEvents = hostedData?.results ?? []

  const [selectedEventSqid, setSelectedEventSqid] = useState<string>(eventSqid ?? '')
  const activeSqid = eventSqid ?? selectedEventSqid

  // Once the event list loads, default to first event if none selected.
  useEffect(() => {
    if (!activeSqid && hostedEvents.length > 0) {
      setSelectedEventSqid(hostedEvents[0].sqid)
    }
  }, [hostedEvents, activeSqid])

  const { data: selectedEvent, isLoading: loadingEvent } = useEvent(activeSqid)

  // Local overrides for quantity/active — applied on top of server data.
  // These are not persisted (no PATCH /api/events/ticket endpoint in spec).
  const [ticketOverrides, setTicketOverrides] = useState<Record<string, Partial<Ticket>>>({})

  const eventTickets: Ticket[] = useMemo(
    () =>
      (selectedEvent?.tickets ?? []).map((t) => ({
        ...t,
        ...(ticketOverrides[t.sqid] ?? {}),
      })),
    [selectedEvent, ticketOverrides],
  )

  const totalQty = eventTickets.reduce((s, t) => s + t.quantity, 0)
  const totalSold = eventTickets.reduce((s, t) => s + t.quantity_sold, 0)

  const [createOpen, setCreateOpen] = useState(false)
  const [draft, setDraft] = useState<PaidTicketInput>(emptyDraft)
  const [draftError, setDraftError] = useState<string | null>(null)

  const addTicketMutation = useAddEventTicket()

  const handleQuantityChange = (ticketSqid: string, value: number) => {
    setTicketOverrides((prev) => ({
      ...prev,
      [ticketSqid]: { ...(prev[ticketSqid] ?? {}), quantity: value },
    }))
  }

  const handleToggleActive = (ticketSqid: string, value: boolean) => {
    setTicketOverrides((prev) => ({
      ...prev,
      [ticketSqid]: { ...(prev[ticketSqid] ?? {}), is_active: value },
    }))
  }

  const handleCreateTicket = async () => {
    const parsed = paidTicketSchema.safeParse(draft)
    if (!parsed.success) {
      setDraftError(parsed.error.issues[0]?.message ?? 'Invalid ticket')
      return
    }
    if (!activeSqid) return

    try {
      await addTicketMutation.mutateAsync({ event: activeSqid, ...parsed.data })
      toast({
        title: 'Ticket created',
        description: `${parsed.data.name} added to ${selectedEvent?.title ?? 'this event'}.`,
      })
      setDraft(emptyDraft)
      setDraftError(null)
      setCreateOpen(false)
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create ticket. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const showSelector = !eventSqid && showEventSelector
  const isLoading = loadingEvents || (!!activeSqid && loadingEvent)

  return (
    <div className="space-y-6">
      {(showSelector || !hideHeader) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {!hideHeader && (
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Ticket management
              </h2>
              <p className="text-sm text-muted-foreground">
                Update variations and review attendees.
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            {showSelector && (
              <Select
                value={selectedEventSqid}
                onValueChange={setSelectedEventSqid}
                disabled={loadingEvents}
              >
                <SelectTrigger className="w-65">
                  <SelectValue placeholder={loadingEvents ? 'Loading…' : 'Select event'} />
                </SelectTrigger>
                <SelectContent>
                  {hostedEvents.map((ev) => (
                    <SelectItem key={ev.sqid} value={ev.sqid}>
                      {ev.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button disabled={!selectedEvent || isLoading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>New ticket variation</DialogTitle>
                  <DialogDescription>
                    Adds a paid ticket to {selectedEvent?.title ?? 'this event'}.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Name</Label>
                      <Input
                        placeholder="e.g. VIP"
                        value={draft.name}
                        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Quantity</Label>
                      <Input
                        type="number"
                        min={1}
                        value={draft.quantity}
                        onChange={(e) =>
                          setDraft({ ...draft, quantity: parseInt(e.target.value, 10) || 1 })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Description</Label>
                    <Textarea
                      placeholder="What's included with this ticket?"
                      value={draft.description}
                      onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Price (₦)</Label>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={draft.price}
                        onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Discount %</Label>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={draft.discount_perc}
                        onChange={(e) => setDraft({ ...draft, discount_perc: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Sales start</Label>
                      <Input
                        type="datetime-local"
                        value={draft.sales_start}
                        onChange={(e) => setDraft({ ...draft, sales_start: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Sales end</Label>
                      <Input
                        type="datetime-local"
                        value={draft.sales_end}
                        onChange={(e) => setDraft({ ...draft, sales_end: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={draft.is_active}
                      onCheckedChange={(v) => setDraft({ ...draft, is_active: v })}
                    />
                    <span className="text-sm">Active immediately</span>
                  </div>
                  {draftError && (
                    <p className="text-sm text-destructive">{draftError}</p>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    variant="ghost"
                    onClick={() => setCreateOpen(false)}
                    disabled={addTicketMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTicket}
                    disabled={addTicketMutation.isPending}
                  >
                    {addTicketMutation.isPending ? 'Creating…' : 'Create ticket'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-48 rounded-lg" />
        </div>
      ) : !selectedEvent ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {hostedEvents.length === 0
              ? 'You have no hosted events yet.'
              : 'Select an event to manage its tickets.'}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-4">
            <StatCard label="Variations" value={eventTickets.length} />
            <StatCard label="Total quantity" value={totalQty} />
            <StatCard label="Sold" value={totalSold} />
            <StatCard label="Remaining" value={Math.max(0, totalQty - totalSold)} />
          </div>

          <Tabs defaultValue="variations">
            <TabsList>
              <TabsTrigger value="variations">
                Variations ({eventTickets.length})
              </TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
            </TabsList>

            <TabsContent value="variations" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket variations</CardTitle>
                  <CardDescription>
                    Update available quantity inline.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {eventTickets.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      No tickets yet — add one to get started.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Sold</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Active</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {eventTickets.map((t) => (
                          <TableRow key={t.sqid}>
                            <TableCell>
                              <div className="font-medium">{t.name}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {t.description}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {t.type.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {parseFloat(t.price) === 0
                                ? 'Free'
                                : `₦${parseFloat(t.price).toLocaleString()}`}
                            </TableCell>
                            <TableCell>{t.quantity_sold}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min={t.quantity_sold}
                                value={t.quantity}
                                className="w-24"
                                onChange={(e) =>
                                  handleQuantityChange(
                                    t.sqid,
                                    Math.max(
                                      t.quantity_sold,
                                      parseInt(e.target.value, 10) || 0,
                                    ),
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={t.is_active}
                                onCheckedChange={(v) => handleToggleActive(t.sqid, v)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendees" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Attendees
                  </CardTitle>
                  <CardDescription>
                    People who have registered for this event.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10 text-muted-foreground">
                    Attendee list coming soon.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  )
}
