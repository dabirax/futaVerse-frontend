
import { Ticket as TicketIcon } from 'lucide-react'
import EventTicketsManager from '@/components/user/events/EventTicketsManager'
import { BackButton2 } from '@/components/BackButtons'

export default function ManageEventTickets() {

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
                  <BackButton2/>
        
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <TicketIcon className="h-6 w-6" />
            Manage tickets
          </h1>
          <p className="text-muted-foreground">
            Pick any of your events to manage variations and attendees.
          </p>
        </div>
      </div>

      <EventTicketsManager showEventSelector hideHeader />
    </div>
  )
}
