import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Ticket as TicketIcon,
  Users,
  Video,
} from 'lucide-react'
import { format } from 'date-fns'
import type { Ticket } from '@/types/event'
import { EventsService } from '@/services/events'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useEvent, useRegisterEvent } from '@/hooks/useEvents'
import { getErrorMessage } from '@/lib/utils'
import { studentEventDetailRoute } from '@/routes/user-student'
import { BackButton2 } from '@/components/BackButtons'
import { EventDetailSkeleton } from '@/components/CardSkeletons'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import logoChip from '@/assets/logos/FV_logo_whitebg.png'

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
  const [checkoutStep, setCheckoutStep] = useState<
    'form' | 'payment' | 'processing' | 'success'
  >('form')
  const [formError, setFormError] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [pollStatus, setPollStatus] = useState<'waiting' | 'timeout'>('waiting')

  const registerMutation = useRegisterEvent()
  const pollInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const pollAttempts = useRef(0)

  const stopPolling = useCallback(() => {
    if (pollInterval.current) {
      clearInterval(pollInterval.current)
      pollInterval.current = null
    }
  }, [])

  useEffect(() => stopPolling, [stopPolling])

  const checkPaidTicket = useCallback(async () => {
    if (!selectedTicket) return false
    try {
      const { results } = await EventsService.myTickets()
      return results.some(
        (item) => item.ticket.event === selectedTicket.event && item.is_paid,
      )
    } catch {
      return false
    }
  }, [selectedTicket])

  const startPolling = useCallback(async () => {
    pollAttempts.current = 0
    setPollStatus('waiting')
    stopPolling()

    const verify = async () => {
      const paid = await checkPaidTicket()
      if (paid) {
        stopPolling()
        setCheckoutStep('success')
        return
      }
      pollAttempts.current += 1
      if (pollAttempts.current >= 30) {
        stopPolling()
        setPollStatus('timeout')
      }
    }

    await verify()
    pollInterval.current = setInterval(verify, 4000)
  }, [checkPaidTicket, stopPolling])

  const handleTicketSelect = (ticket: Ticket) => {
    stopPolling()
    setSelectedTicket(ticket)
    setCheckoutStep('form')
    setIsCheckoutOpen(true)
    setFormError(null)
    setPaymentError(null)
    setCheckoutUrl(null)
  }

  const closeCheckout = () => {
    stopPolling()
    setIsCheckoutOpen(false)
    setSelectedTicket(null)
    setCheckoutStep('form')
    setEmail('')
    setFormError(null)
    setPaymentError(null)
    setCheckoutUrl(null)
  }

  const handleContinue = () => {
    if (!selectedTicket || !email) return
    setFormError(null)

    if (parseFloat(selectedTicket.price) > 0) {
      setCheckoutStep('payment')
      return
    }

    setCheckoutStep('processing')
    registerMutation.mutate(
      { ticket: selectedTicket.sqid, email },
      {
        onSuccess: () => setCheckoutStep('success'),
        onError: (err) => {
          setFormError(
            err instanceof Error
              ? err.message
              : 'Registration failed. Please try again.',
          )
          setCheckoutStep('form')
        },
      },
    )
  }

  const handlePayWithPaystack = () => {
    if (!selectedTicket || !email) return
    setPaymentError(null)
    setCheckoutUrl(null)
    setCheckoutStep('processing')
    setPollStatus('waiting')

    // Open the tab synchronously so the popup isn't blocked by the browser.
    const paystackWin = window.open('', '_blank')

    registerMutation.mutate(
      { ticket: selectedTicket.sqid, email },
      {
        onSuccess: (data) => {
          const url = data.checkout_url
          if (!url) {
            paystackWin?.close()
            setCheckoutStep('success')
            return
          }
          setCheckoutUrl(url)
          if (paystackWin && !paystackWin.closed) {
            paystackWin.location.href = url
          } else {
            window.location.href = url
          }
          void startPolling()
        },
        onError: (err) => {
          paystackWin?.close()
          setPaymentError(
            err instanceof Error
              ? err.message
              : 'Could not start payment. Please try again.',
          )
          setCheckoutStep('payment')
        },
      },
    )
  }

  const handleRecheckPayment = () => {
    void startPolling()
  }

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        <BackButton2 />
        <EventDetailSkeleton />
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
          {getErrorMessage(error, 'Event not found')}
        </h2>
        <p className="text-muted-foreground mb-6">
          The event you are looking for does not exist or has been removed.
        </p>
        <Button onClick={() => router.navigate({ to: '/student/events' })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </div>
    )
  }

  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy')
  const formattedTime = format(
    new Date(`2000-01-01T${event.start_time}`),
    'h:mm a',
  )
  const durationHours = Math.floor(event.duration_mins / 60)
  const durationMins = event.duration_mins % 60
  const durationText = `${durationHours > 0 ? `${durationHours}h ` : ''}${durationMins > 0 ? `${durationMins}m` : ''}`

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-primary/90 to-primary flex flex-col justify-end p-8 min-h-75 text-primary-foreground shadow-lg">
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
            <Badge
              variant="outline"
              className="border-white/30 text-white backdrop-blur-md"
            >
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
            <h2 className="text-2xl font-bold text-foreground mb-4">
              About this Event
            </h2>
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
                  <h3 className="font-semibold text-lg">
                    No tickets available
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Registration hasn't opened yet for this event.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {event.tickets.map((ticket) => {
                  const isPaid = parseFloat(ticket.price) > 0
                  const isSoldOut = ticket.quantity_sold >= ticket.quantity

                  return (
                    <Card
                      key={ticket.sqid}
                      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${isSoldOut ? 'opacity-70 grayscale' : 'border-l-4 border-l-primary'}`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center p-6 gap-6">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-foreground truncate">
                              {ticket.name}
                            </h3>
                            {ticket.type === 'vip' && (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
                                VIP
                              </Badge>
                            )}
                            {ticket.type === 'early_bird' && (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                                Early Bird
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {ticket.description}
                          </p>
                          <div className="text-xs text-muted-foreground pt-1">
                            {ticket.quantity - ticket.quantity_sold} tickets
                            remaining
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-4 sm:gap-2 pl-0 sm:pl-6 sm:border-l">
                          <div className="text-left sm:text-right">
                            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                              Price
                            </div>
                            <div className="text-2xl font-bold text-foreground">
                              {isPaid
                                ? `₦${parseFloat(ticket.price).toLocaleString()}`
                                : 'Free'}
                            </div>
                          </div>
                          <Button
                            className="w-full sm:w-32 rounded-full font-semibold"
                            disabled={isSoldOut}
                            onClick={() => handleTicketSelect(ticket)}
                          >
                            {isSoldOut
                              ? 'Sold Out'
                              : isPaid
                                ? 'Buy Ticket'
                                : 'Register'}
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
                  <p className="font-semibold text-foreground text-sm mb-0.5">
                    Date & Time
                  </p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {formattedDate}
                    <br />
                    {formattedTime}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2.5 rounded-lg shrink-0">
                  {event.mode === 'virtual' ? (
                    <Video className="w-5 h-5 text-primary" />
                  ) : (
                    <MapPin className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-0.5">
                    Location
                  </p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    <span className="capitalize">{event.mode}</span> Event
                    {event.venue && (
                      <>
                        <br />
                        {event.venue}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2.5 rounded-lg shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-0.5">
                    Capacity
                  </p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {event.max_capacity} attendees max
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Multi-step Checkout Dialog */}
      <Dialog
        open={isCheckoutOpen}
        onOpenChange={(open) =>
          !open && checkoutStep !== 'processing' && setIsCheckoutOpen(false)
        }
      >
        <DialogContent className="sm:max-w-130 p-0 overflow-hidden border-0 shadow-2xl">
          {/* Step 1: Email & Attendee */}
          {checkoutStep === 'form' && selectedTicket && (
            <>
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={logoChip}
                      alt="FUTAVerse"
                      className="h-8 w-auto"
                    />
                    <span className="font-montserrat font-semibold text-base tracking-tight bg-linear-to-r from-primary-light to-accent-light bg-clip-text text-transparent">
                      FUTAVerse
                    </span>
                  </div>
                  <span className="text-sm text-slate-400 font-medium">
                    CHECKOUT
                  </span>
                </div>

                <p className="text-slate-400 text-sm mb-1">{event.title}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">
                      {parseFloat(selectedTicket.price) > 0
                        ? `₦${parseFloat(selectedTicket.price).toLocaleString()}`
                        : 'Free'}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                      {selectedTicket.name} Ticket
                    </p>
                  </div>
                  <div className="text-sm text-slate-300">Order summary</div>
                </div>
              </div>

              <div className="p-6 space-y-4 bg-white">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@futa.edu.ng"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 border-slate-200"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    We'll send your ticket to this email.
                  </p>
                </div>

                {formError && (
                  <Alert variant="destructive">
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button
                    className="flex-1 h-11 font-semibold"
                    onClick={handleContinue}
                    disabled={!email || registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : parseFloat(selectedTicket.price) > 0 ? (
                      'Continue to Payment'
                    ) : (
                      'Register Now'
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    className="h-11"
                    onClick={closeCheckout}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pb-2">
                  <span>🔒 Secured by Paystack</span>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Paystack checkout */}
          {checkoutStep === 'payment' && selectedTicket && (
            <>
              <div className="bg-white p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      Order for {selectedTicket.name} — {event.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Amount</div>
                    <div className="text-xl font-bold">
                      ₦{parseFloat(selectedTicket.price).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white space-y-4">
                <div className="rounded-md border bg-slate-50 p-4 text-sm">
                  <p className="font-medium text-slate-700 mb-1">
                    Secure checkout via Paystack
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    You'll be taken to Paystack's secure page to pay by card,
                    bank transfer, or USSD. Keep this tab open — your ticket is
                    confirmed automatically once payment is verified.
                  </p>
                </div>

                {paymentError && (
                  <Alert variant="destructive">
                    <AlertDescription>{paymentError}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button
                    className="flex-1 h-11 bg-[#0BA4DB] text-white font-semibold"
                    onClick={handlePayWithPaystack}
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      `Pay ₦${parseFloat(selectedTicket.price).toLocaleString()}`
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    className="h-11"
                    onClick={() => {
                      setCheckoutStep('form')
                      setPaymentError(null)
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Processing / waiting for payment */}
          {checkoutStep === 'processing' && (
            <div className="p-12 flex flex-col items-center justify-center min-h-55 bg-white">
              <Loader2 className="h-12 w-12 animate-spin text-[#0BA4DB] mb-6" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {pollStatus === 'timeout'
                  ? 'Still waiting for payment...'
                  : checkoutUrl
                    ? 'Awaiting payment confirmation...'
                    : 'Redirecting to Paystack...'}
              </h3>
              <p className="text-slate-500 text-center text-sm max-w-sm">
                {checkoutUrl
                  ? 'Complete payment in the Paystack tab that just opened. Your ticket is confirmed automatically once payment is verified.'
                  : 'Contacting Paystack to start your secure checkout...'}
              </p>
              {checkoutUrl && (
                <p className="text-xs text-slate-400 mt-1.5">
                  Lost the Paystack tab?{' '}
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0BA4DB] underline font-medium"
                  >
                    Open checkout again
                  </a>
                </p>
              )}
              {pollStatus === 'timeout' && (
                <p className="text-sm text-slate-500 mt-4 text-center max-w-sm">
                  Payment is taking longer than expected. If you've paid,
                  confirm below to refresh your ticket.
                </p>
              )}
              <div className="mt-6 space-y-2 w-full max-w-64">
                <Button
                  className="w-full h-11"
                  onClick={handleRecheckPayment}
                  disabled={registerMutation.isPending}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  I've completed payment
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11"
                  onClick={closeCheckout}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Success / Receipt */}
          {checkoutStep === 'success' && selectedTicket && (
            <div className="p-6 bg-white">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {parseFloat(selectedTicket.price) > 0
                    ? 'Payment Successful!'
                    : "You're Registered!"}
                </h3>
                <p className="text-slate-600 mb-4">
                  Your {selectedTicket.name} ticket has been added to your
                  account.
                </p>
              </div>

              <div className="mt-4 border rounded-md p-4 bg-slate-50">
                <div className="flex justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Event</div>
                  <div className="text-sm font-medium">{event.title}</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Ticket</div>
                  <div className="text-sm font-medium">
                    {selectedTicket.name}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="font-semibold">
                    {parseFloat(selectedTicket.price) > 0
                      ? `₦${parseFloat(selectedTicket.price).toLocaleString()}`
                      : 'Free'}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white"
                  onClick={() => {
                    closeCheckout()
                    router.navigate({ to: '/student/tickets' })
                  }}
                >
                  View My Tickets
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11"
                  onClick={closeCheckout}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
