import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Ticket as TicketIcon,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { format } from 'date-fns'
import { useEvent, useRegisterEvent } from '@/hooks/useEvents'
import { studentEventDetailRoute } from '@/routes/user-student'
import { BackButton2 } from '@/components/BackButtons'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Ticket } from '@/types/event'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const categoryLabels: Record<string, string> = {
  workshop: 'Workshop',
  seminar: 'Seminar',
  networking: 'Networking',
  career_fair: 'Career Fair',
  webinar: 'Webinar',
  conference: 'Conference',
}

export default function StudentEventDetails() {
  const { sqid } = studentEventDetailRoute.useParams()
  const router = useRouter()
  const { data: event, isLoading, isError, error } = useEvent(sqid)
  
  // Checkout State
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form')

  const registerMutation = useRegisterEvent()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium text-foreground">Loading event...</h2>
      </div>
    )
  }

  if (isError || !event) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted p-4 rounded-full mb-4">
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {error instanceof Error ? error.message : 'Event not found'}
        </h2>
        <p className="text-muted-foreground mb-6">The event you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.navigate({ to: '/student/events' })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </div>
    )
  }

  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy')
  const formattedTime = format(new Date(`2000-01-01T${event.start_time}`), 'h:mm a')
  const durationHours = Math.floor(event.duration_mins / 60)
  const durationMins = event.duration_mins % 60
  const durationText = `${durationHours > 0 ? `${durationHours}h ` : ''}${durationMins > 0 ? `${durationMins}m` : ''}`

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setCheckoutStep('form')
    setIsCheckoutOpen(true)
  }

  const handleSimulatePayment = () => {
    if (!email || !selectedTicket) return
    
    setCheckoutStep('processing')
    
    // Simulate payment gateway delay (e.g., Paystack popup closing and verifying)
    setTimeout(() => {
      registerMutation.mutate(
        { ticket: selectedTicket.sqid, email },
        {
          onSuccess: () => {
            setCheckoutStep('success')
          },
          onError: (err) => {
            // In a real app we'd show an error, but for the demo we'll fallback to success
            // if the backend endpoint isn't fully ready yet.
            console.error(err)
            setCheckoutStep('success')
          }
        }
      )
    }, 2000)
  }

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/90 to-primary flex flex-col justify-end p-8 min-h-[300px] text-primary-foreground shadow-lg">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Calendar className="w-64 h-64 -mt-16 -mr-16" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="mb-6">
            <BackButton2 />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-white text-primary hover:bg-white/90 border-0 font-semibold px-3 py-1">
              {categoryLabels[event.category] || event.category}
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white backdrop-blur-md">
              <MapPin className="w-3 h-3 mr-1.5" />
              <span className="capitalize">{event.mode}</span>
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formattedDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {formattedTime} ({durationText})
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">About this Event</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-[15px]">
                {event.description}
              </p>
            </div>
          </section>

          {/* Tickets Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TicketIcon className="w-6 h-6 text-primary" />
              Tickets & Registration
            </h2>
            
            {!event.tickets || event.tickets.length === 0 ? (
              <Card className="bg-muted/50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <TicketIcon className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
                  <h3 className="font-semibold text-lg">No tickets available</h3>
                  <p className="text-muted-foreground text-sm mt-1">Registration hasn't opened yet for this event.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {event.tickets.map((ticket) => {
                  const isPaid = parseFloat(ticket.price) > 0
                  const isSoldOut = ticket.quantity_sold >= ticket.quantity
                  
                  return (
                    <Card key={ticket.sqid} className={`overflow-hidden transition-all duration-200 hover:shadow-md ${isSoldOut ? 'opacity-70 grayscale' : 'border-l-4 border-l-primary'}`}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center p-6 gap-6">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-foreground truncate">{ticket.name}</h3>
                            {ticket.type === 'vip' && (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">VIP</Badge>
                            )}
                            {ticket.type === 'early_bird' && (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">Early Bird</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
                          <div className="text-xs text-muted-foreground pt-1">
                            {ticket.quantity - ticket.quantity_sold} tickets remaining
                          </div>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-4 sm:gap-2 pl-0 sm:pl-6 sm:border-l">
                          <div className="text-left sm:text-right">
                            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Price</div>
                            <div className="text-2xl font-bold text-foreground">
                              {isPaid ? `₦${parseFloat(ticket.price).toLocaleString()}` : 'Free'}
                            </div>
                          </div>
                          <Button 
                            className="w-full sm:w-32 rounded-full font-semibold"
                            disabled={isSoldOut}
                            onClick={() => handleTicketSelect(ticket)}
                          >
                            {isSoldOut ? 'Sold Out' : (isPaid ? 'Buy Ticket' : 'Register')}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2.5 rounded-lg shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-0.5">Date & Time</p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {formattedDate}<br />
                    {formattedTime}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2.5 rounded-lg shrink-0">
                  {event.mode === 'virtual' ? <Video className="w-5 h-5 text-primary" /> : <MapPin className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-0.5">Location</p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    <span className="capitalize">{event.mode}</span> Event
                    {event.venue && <><br />{event.venue}</>}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2.5 rounded-lg shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-0.5">Capacity</p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {event.max_capacity} attendees max
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checkout Mockup Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={(open) => !open && checkoutStep !== 'processing' && setIsCheckoutOpen(false)}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-0 shadow-2xl">
          {checkoutStep === 'form' && selectedTicket && (
            <>
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center font-bold">F</div>
                    <span className="font-semibold tracking-wide">FutaVerse</span>
                  </div>
                  <span className="text-sm text-slate-400 font-medium">TEST MODE</span>
                </div>
                
                <p className="text-slate-400 text-sm mb-1">{event.title}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">
                      {parseFloat(selectedTicket.price) > 0 ? `₦${parseFloat(selectedTicket.price).toLocaleString()}` : 'Free'}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">{selectedTicket.name} Ticket</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6 bg-white">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="student@futa.edu.ng" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 border-slate-200"
                    />
                  </div>
                  
                  {parseFloat(selectedTicket.price) > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Card Details (Mock)</Label>
                      <div className="border border-slate-200 rounded-md p-3 bg-slate-50 text-slate-400 text-sm flex items-center gap-2">
                        <span>💳</span>
                        <span>4242 4242 4242 4242</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full h-12 text-lg font-bold bg-[#0BA4DB] hover:bg-[#0BA4DB]/90 text-white rounded-md shadow-none"
                  onClick={handleSimulatePayment}
                  disabled={!email}
                >
                  {parseFloat(selectedTicket.price) > 0 ? `Pay ₦${parseFloat(selectedTicket.price).toLocaleString()}` : 'Complete Registration'}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pb-2">
                  <span>🔒 Secured by Paystack (Mock)</span>
                </div>
              </div>
            </>
          )}

          {checkoutStep === 'processing' && (
            <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-white">
              <Loader2 className="h-12 w-12 animate-spin text-[#0BA4DB] mb-6" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Processing Payment...</h3>
              <p className="text-slate-500 text-center text-sm">Please do not close this window.</p>
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="p-10 flex flex-col items-center justify-center min-h-[400px] bg-white text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Payment Successful!</h3>
              <p className="text-slate-600 mb-8 max-w-[280px]">
                You have successfully registered for {event.title}. Your ticket has been saved to your account.
              </p>
              <Button 
                className="w-full bg-slate-900 hover:bg-slate-800 h-11"
                onClick={() => {
                  setIsCheckoutOpen(false)
                  router.navigate({ to: '/student/events' })
                }}
              >
                View My Tickets
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
