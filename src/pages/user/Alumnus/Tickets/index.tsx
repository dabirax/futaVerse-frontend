import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Ticket as TicketIcon,
  Calendar,
  MapPin,
  Video,
} from 'lucide-react'
import { format } from 'date-fns'
import { useMyTicketsWithEvents } from '@/hooks/useEvents'
import { Event, PurchasedTicket } from '@/types/event'

interface PurchaseRow extends PurchasedTicket {
  event: Event | undefined
}

export default function AlumnusTickets() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const { data: rows = [], isLoading, isError } = useMyTicketsWithEvents()

  const filtered = (rows as PurchaseRow[]).filter(
    (r) =>
      (r.event?.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
      r.ticket.name.toLowerCase().includes(search.toLowerCase()),
  )

  const today = new Date()
  const upcoming = filtered.filter(
    (r) => r.event && new Date(r.event.date) >= today,
  )
  const past = filtered.filter((r) => r.event && new Date(r.event.date) < today)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <TicketIcon className="h-6 w-6" />
          My tickets
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Tickets you've purchased or registered for.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by event or ticket name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Failed to load tickets. Please refresh and try again.
        </p>
      )}

      <Tabs defaultValue="upcoming">
        <div className="overflow-x-auto -mx-1 px-1 pb-1">
          <TabsList className="inline-flex w-max">
            <TabsTrigger value="upcoming">
              Upcoming ({isLoading ? '…' : upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({isLoading ? '…' : past.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="mt-4">
          {isLoading ? (
            <TicketSkeleton />
          ) : (
            <TicketList
              rows={upcoming}
              onView={(id) => router.navigate({ to: `/alumnus/events/${id}` })}
            />
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          {isLoading ? (
            <TicketSkeleton />
          ) : (
            <TicketList
              rows={past}
              onView={(id) => router.navigate({ to: `/alumnus/events/${id}` })}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TicketSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2].map((i) => (
        <Skeleton key={i} className="h-36 w-full rounded-xl" />
      ))}
    </div>
  )
}

function TicketList({
  rows,
  onView,
}: {
  rows: PurchaseRow[]
  onView: (eventSqid: string) => void
}) {
  if (rows.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No tickets here yet.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {rows.map((r) => (
        <Card key={r.ticket_uid}>
          <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-lg">
                {r.event?.title ?? 'Event'}
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-3 text-xs">
                {r.event && (
                  <>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(r.event.date), 'MMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      {r.event.mode === 'virtual' ? (
                        <Video className="h-3.5 w-3.5" />
                      ) : (
                        <MapPin className="h-3.5 w-3.5" />
                      )}
                      {r.event.venue || r.event.mode}
                    </span>
                  </>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={r.is_paid ? 'default' : 'secondary'}>
                {r.is_paid ? 'Paid' : 'Pending'}
              </Badge>
              <Badge variant={r.checked_in ? 'default' : 'outline'}>
                {r.checked_in ? 'Checked in' : 'Not checked in'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="text-sm font-medium">{r.ticket.name}</div>
              <div className="text-sm text-muted-foreground">
                {parseFloat(r.ticket.price) === 0
                  ? 'Free'
                  : `₦${parseFloat(r.ticket.price).toLocaleString()}`}
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                Ref: {r.ticket_uid.slice(0, 12)}…
              </div>
            </div>
            {r.event && (
              <Button variant="outline" onClick={() => onView(r.event!.sqid)}>
                View event
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
