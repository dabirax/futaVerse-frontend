import { useState, useMemo } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useMyTicketsWithEvents } from '@/hooks/useEvents'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Clock,
  MapPin,
  Video,
  Ticket as TicketIcon,
  Search,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Loader2,
} from 'lucide-react'
import { format, isPast } from 'date-fns'

export default function StudentEvents() {
  const router = useRouter()
  const { data: tickets, isLoading, isError } = useMyTicketsWithEvents()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const items = useMemo(() => {
    if (!tickets) return []

    let filtered = tickets.filter(ticketInfo => {
      // Basic search on event title
      if (search && ticketInfo.event) {
        return ticketInfo.event.title.toLowerCase().includes(search.toLowerCase())
      }
      return true
    })

    // Sort by event date (ascending for upcoming, descending for past)
    filtered.sort((a, b) => {
      if (!a.event || !b.event) return 0
      const dateA = new Date(`${a.event.date}T${a.event.start_time}`)
      const dateB = new Date(`${b.event.date}T${b.event.start_time}`)
      return activeTab === 'upcoming' 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })

    return filtered
  }, [tickets, search, activeTab])

  const upcomingTickets = useMemo(() => {
    return items.filter(t => t.event && !isPast(new Date(`${t.event.date}T${t.event.start_time}`)))
  }, [items])

  const pastTickets = useMemo(() => {
    return items.filter(t => t.event && isPast(new Date(`${t.event.date}T${t.event.start_time}`)))
  }, [items])

  const displayedTickets = activeTab === 'upcoming' ? upcomingTickets : pastTickets

  return (
    <div className="space-y-6">
      <div className="md:flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage your registered events and tickets
          </p>
        </div>

        <div className="relative mt-4 md:mt-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search my events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full md:w-72"
          />
        </div>
      </div>

      {isError && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm font-medium">
          Failed to load your events. Please try again later.
        </div>
      )}

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upcoming' | 'past')}>
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="upcoming" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent px-6 py-3"
          >
            Upcoming ({upcomingTickets.length})
          </TabsTrigger>
          <TabsTrigger 
            value="past"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent px-6 py-3"
          >
            Past ({pastTickets.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading your tickets...</p>
            </div>
          ) : displayedTickets.length === 0 ? (
            <Card className="border-dashed bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <CalendarDays className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  No {activeTab} events found
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm mb-6">
                  {search 
                    ? "We couldn't find any events matching your search." 
                    : "You haven't registered for any events yet. Discover new events in your feed!"}
                </p>
                {!search && (
                  <Button onClick={() => router.navigate({ to: '/student/feed' })}>
                    Discover Events
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {displayedTickets.map((item) => {
                const event = item.event
                if (!event) return null

                const formattedTime = format(new Date(`2000-01-01T${event.start_time}`), 'h:mm a')
                const isFree = parseFloat(item.ticket.price) === 0

                return (
                  <Card 
                    key={item.ticket_uid} 
                    className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border-l-4 border-l-primary group"
                    onClick={() => router.navigate({ to: `/student/events/${event.sqid}` })}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center p-0">
                      {/* Left: Date Box */}
                      <div className="bg-primary/5 p-6 sm:w-32 flex flex-row sm:flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-border self-stretch gap-2 sm:gap-0">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                          {format(new Date(event.date), 'MMM')}
                        </span>
                        <span className="text-3xl font-black text-foreground">
                          {format(new Date(event.date), 'dd')}
                        </span>
                      </div>
                      
                      {/* Middle: Event Info */}
                      <div className="flex-1 p-5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.category.replace('_', ' ')}
                          </Badge>
                          {item.checked_in && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 flex items-center gap-1 text-xs">
                              <CheckCircle2 className="w-3 h-3" /> Checked In
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-bold text-lg text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> {formattedTime}
                          </span>
                          <span className="flex items-center gap-1.5 capitalize">
                            {event.mode === 'virtual' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                            {event.mode} {event.venue && event.mode !== 'virtual' ? `• ${event.venue}` : ''}
                          </span>
                        </div>
                      </div>
                      
                      {/* Right: Ticket Info */}
                      <div className="p-5 sm:pl-0 sm:w-48 flex sm:flex-col items-center sm:items-end justify-between self-stretch sm:justify-center border-t sm:border-t-0 border-border bg-muted/10">
                        <div className="text-left sm:text-right">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 justify-start sm:justify-end">
                            <TicketIcon className="w-3.5 h-3.5" /> 
                            {item.ticket.name}
                          </div>
                          <div className="font-medium text-sm">
                            {isFree ? 'Free Ticket' : `₦${parseFloat(item.ticket.price).toLocaleString()}`}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 truncate max-w-[120px]" title={item.ticket_uid}>
                            ID: {item.ticket_uid.split('-')[0].toUpperCase()}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  )
}