import { useMemo, useState } from 'react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search, Plus, Users } from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { mockEvents, mockPurchasedTickets } from '@/data/mockEvents'
import { Event, PaidTicketInput, PurchasedTicket, Ticket } from '@/types/event'
import { paidTicketSchema } from '@/components/user/events/TicketsSection'



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

  // Local mock state — swap for API queries when wiring up:
  //   GET  /api/events/tickets?event=<sqid>
  //   POST /api/events/ticket
  const [eventsState, setEventsState] = useState<Event[]>(mockEvents)
  const [purchases] = useState<PurchasedTicket[]>(mockPurchasedTickets)

  const [selectedEventSqid, setSelectedEventSqid] = useState<string>(
    eventSqid ?? mockEvents[0]?.sqid ?? '',
  )
  const activeSqid = eventSqid ?? selectedEventSqid

  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [draft, setDraft] = useState<PaidTicketInput>(emptyDraft)
  const [draftError, setDraftError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const selectedEvent = useMemo(
    () => eventsState.find((e) => e.sqid === activeSqid),
    [eventsState, activeSqid],
  )

  const eventTickets: Ticket[] = selectedEvent?.tickets ?? []

  const eventAttendees = useMemo(
    () =>
      purchases.filter((p) =>
        eventTickets.some((t) => t.sqid === p.ticket.sqid),
      ),
    [purchases, eventTickets],
  )

  const filteredAttendees = eventAttendees.filter((a) =>
    a.email.toLowerCase().includes(search.toLowerCase()),
  )

  const totalQty = eventTickets.reduce((s, t) => s + t.quantity, 0)
  const totalSold = eventTickets.reduce((s, t) => s + t.quantity_sold, 0)
  const checkedIn = eventAttendees.filter((a) => a.checked_in).length

  const handleQuantityChange = (ticketSqid: string, value: number) => {
    setEventsState((prev) =>
      prev.map((ev) =>
        ev.sqid !== activeSqid
          ? ev
          : {
              ...ev,
              tickets: ev.tickets?.map((t) =>
                t.sqid === ticketSqid ? { ...t, quantity: value } : t,
              ),
            },
      ),
    )
  }

  const handleToggleActive = (ticketSqid: string, value: boolean) => {
    setEventsState((prev) =>
      prev.map((ev) =>
        ev.sqid !== activeSqid
          ? ev
          : {
              ...ev,
              tickets: ev.tickets?.map((t) =>
                t.sqid === ticketSqid ? { ...t, is_active: value } : t,
              ),
            },
      ),
    )
  }

  const handleCreateTicket = async () => {
    const parsed = paidTicketSchema.safeParse(draft)
    if (!parsed.success) {
      setDraftError(parsed.error.issues[0]?.message ?? 'Invalid ticket')
      return
    }
    if (!selectedEvent) return

    setSubmitting(true)
    try {
      // TODO: POST /api/events/ticket
      const newTicket: Ticket = {
        sqid: `tkt_${Date.now()}`,
        event: selectedEvent.sqid,
        name: parsed.data.name,
        description: parsed.data.description,
        price: parsed.data.price,
        sales_price: parsed.data.price,
        discount_perc: parsed.data.discount_perc ?? '0',
        quantity: parsed.data.quantity,
        quantity_sold: 0,
        type: 'default',
        sales_start: parsed.data.sales_start,
        sales_end: parsed.data.sales_end,
        is_active: parsed.data.is_active,
        created_at: new Date().toISOString(),
      }

      setEventsState((prev) =>
        prev.map((ev) =>
          ev.sqid !== selectedEvent.sqid
            ? ev
            : { ...ev, tickets: [...(ev.tickets ?? []), newTicket] },
        ),
      )

      toast({
        title: 'Ticket created',
        description: `${newTicket.name} added to ${selectedEvent.title}.`,
      })
      setDraft(emptyDraft)
      setDraftError(null)
      setCreateOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  const showSelector = !eventSqid && showEventSelector

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
              >
                <SelectTrigger className="w-65">
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  {eventsState.map((ev) => (
                    <SelectItem key={ev.sqid} value={ev.sqid}>
                      {ev.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button disabled={!selectedEvent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>New ticket variation</DialogTitle>
                  <DialogDescription>
                    Adds a paid ticket to {selectedEvent?.title ?? 'this event'}
                    .
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Name</Label>
                      <Input
                        placeholder="e.g. VIP"
                        value={draft.name}
                        onChange={(e) =>
                          setDraft({ ...draft, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Quantity</Label>
                      <Input
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
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Description</Label>
                    <Textarea
                      placeholder="What's included with this ticket?"
                      value={draft.description}
                      onChange={(e) =>
                        setDraft({ ...draft, description: e.target.value })
                      }
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
                          setDraft({
                            ...draft,
                            discount_perc: e.target.value,
                          })
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
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={draft.is_active}
                      onCheckedChange={(v) =>
                        setDraft({ ...draft, is_active: v })
                      }
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
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTicket} disabled={submitting}>
                    {submitting ? 'Creating...' : 'Create ticket'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}

      {!selectedEvent ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Select an event to manage its tickets.
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-4">
            <StatCard label="Variations" value={eventTickets.length} />
            <StatCard label="Total quantity" value={totalQty} />
            <StatCard label="Sold" value={totalSold} />
            <StatCard label="Checked in" value={checkedIn} />
          </div>

          <Tabs defaultValue="variations">
            <TabsList>
              <TabsTrigger value="variations">
                Variations ({eventTickets.length})
              </TabsTrigger>
              <TabsTrigger value="attendees">
                Attendees ({eventAttendees.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="variations" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket variations</CardTitle>
                  <CardDescription>
                    Update available quantity inline. Quantity can't go below
                    sold count.
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
                                onCheckedChange={(v) =>
                                  handleToggleActive(t.sqid, v)
                                }
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
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Attendees
                    </CardTitle>
                    <CardDescription>
                      People who have registered for this event.
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by email"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredAttendees.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      {eventAttendees.length === 0
                        ? 'No attendees yet.'
                        : 'No attendees match your search.'}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Ticket</TableHead>
                          <TableHead>Paid</TableHead>
                          <TableHead>Checked in</TableHead>
                          <TableHead>Reference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAttendees.map((a) => (
                          <TableRow key={a.ticket_uid}>
                            <TableCell className="font-medium">
                              {a.email}
                            </TableCell>
                            <TableCell>{a.ticket.name}</TableCell>
                            <TableCell>
                              <Badge
                                variant={a.is_paid ? 'default' : 'secondary'}
                              >
                                {a.is_paid ? 'Paid' : 'Pending'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {a.checked_in ? (
                                <Badge>
                                  {a.checked_in_at
                                    ? format(
                                        new Date(a.checked_in_at),
                                        'MMM d, h:mm a',
                                      )
                                    : 'Yes'}
                                </Badge>
                              ) : (
                                <Badge variant="outline">No</Badge>
                              )}
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              {a.ticket_uid.slice(0, 8)}…
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
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
