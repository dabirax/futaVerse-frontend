import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import {
  Calendar,
  MapPin,
  Search,
  Ticket as TicketIcon,
  Video,
} from 'lucide-react'
import { format } from 'date-fns'
import type { Event, PurchasedTicket } from '@/types/event'
import { useMyTicketsWithEvents } from '@/hooks/useEvents'
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
import { TicketCardSkeleton } from '@/components/CardSkeletons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PurchaseRow extends PurchasedTicket {
  event: Event | undefined
}

export default function StudentTickets() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const { data: rows = [], isLoading, isError } = useMyTicketsWithEvents()

  const filtered = (rows as Array<PurchaseRow>).filter(
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
          My Tickets
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          View your registered events and ticket details.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by event or ticket"
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
              Upcoming ({upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="mt-4">
          {isLoading ? (
            <TicketCardSkeleton />
          ) : (
            <TicketList
              rows={upcoming}
              onView={(id) => router.navigate({ to: `/student/events/${id}` })}
            />
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          {isLoading ? (
            <TicketCardSkeleton />
          ) : (
            <TicketList
              rows={past}
              onView={(id) => router.navigate({ to: `/student/events/${id}` })}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TicketList({
  rows,
  onView,
}: {
  rows: Array<PurchaseRow>
  onView: (eventSqid: string) => void
}) {
  if (!rows.length) {
    return (
      <Card className="border-dashed bg-muted/30">
        <CardContent className="py-12 text-center text-muted-foreground">
          No tickets found. Register for an event in the Feed to see them here.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <Card
          key={row.ticket_uid}
          className="cursor-pointer hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-lg">
                {row.event?.title ?? 'Event'}
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                {row.event && (
                  <>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(row.event.date), 'MMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      {row.event.mode === 'virtual' ? (
                        <Video className="h-3.5 w-3.5" />
                      ) : (
                        <MapPin className="h-3.5 w-3.5" />
                      )}
                      {row.event.venue || row.event.mode}
                    </span>
                  </>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={row.is_paid ? 'default' : 'secondary'}>
                {row.is_paid ? 'Paid' : 'Pending'}
              </Badge>
              <Badge variant={row.checked_in ? 'default' : 'outline'}>
                {row.checked_in ? 'Checked in' : 'Not checked in'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="text-sm font-medium">{row.ticket.name}</div>
              <div className="text-sm text-muted-foreground">
                {parseFloat(row.ticket.price) === 0
                  ? 'Free'
                  : `₦${parseFloat(row.ticket.price).toLocaleString()}`}
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                Ref: {row.ticket_uid.slice(0, 12)}…
              </div>
            </div>
            {row.event && (
              <Button variant="outline" onClick={() => onView(row.event!.sqid)}>
                View event
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
