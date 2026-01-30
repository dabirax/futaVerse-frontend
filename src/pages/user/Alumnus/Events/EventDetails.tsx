import { useRouter} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  ExternalLink,
  MapPin,
  Users,
  Video,
  Ticket,
  DollarSign,
  Heart,
} from "lucide-react";
import { format } from "date-fns";
import { Event } from "@/types/event";

import { alumnusEventDetailRoute } from "@/routes/user-alumnus"

const mockEvents: Event[] = [
  {
    sqid: "evt001",
    title: "Tech Career Workshop 2026",
    description: "Join us for an interactive workshop on navigating your tech career. Learn from industry experts about resume building, interview preparation, and networking strategies.",
    category: "workshop",
    mode: "virtual",
    venue: "",
    date: "2026-02-15",
    start_time: "10:00:00",
    duration_mins: 120,
    max_capacity: 100,
    allow_sponsorship: true,
    allow_donations: false,
    is_cancelled: false,
    is_published: true,
    created_at: "2026-01-20T08:00:00Z",
    updated_at: "2026-01-20T08:00:00Z",
    creator: 1,
    virtual_meeting: {
      sqid: "vm001",
      platform: "zoom",
      join_url: "https://zoom.us/j/123456789",
      room_name: "Tech Career Workshop",
    },
    starting_price: "0.00",
    tickets: [
      {
        sqid: "tkt001",
        event: "evt001",
        name: "Free Entry",
        description: "General admission",
        price: "0.00",
        sales_price: "0.00",
        discount_perc: "0",
        quantity: 100,
        quantity_sold: 45,
        type: "default",
        sales_start: "2026-01-20T00:00:00Z",
        sales_end: "2026-02-14T23:59:59Z",
        is_active: true,
        created_at: "2026-01-20T08:00:00Z",
      },
    ],
  },
  {
    sqid: "evt002",
    title: "Alumni Networking Night",
    description: "Connect with fellow FUTA alumni across industries. Share experiences, build connections, and explore collaboration opportunities.",
    category: "networking",
    mode: "physical",
    venue: "FUTA Alumni Center, Main Campus",
    date: "2026-03-10",
    start_time: "18:00:00",
    duration_mins: 180,
    max_capacity: 50,
    allow_sponsorship: true,
    allow_donations: true,
    is_cancelled: false,
    is_published: true,
    created_at: "2026-01-18T10:00:00Z",
    updated_at: "2026-01-18T10:00:00Z",
    creator: 1,
    starting_price: "2500.00",
    tickets: [
      {
        sqid: "tkt002",
        event: "evt002",
        name: "Standard Ticket",
        description: "Includes dinner and networking session",
        price: "2500.00",
        sales_price: "2500.00",
        discount_perc: "0",
        quantity: 40,
        quantity_sold: 28,
        type: "default",
        sales_start: "2026-01-18T00:00:00Z",
        sales_end: "2026-03-09T23:59:59Z",
        is_active: true,
        created_at: "2026-01-18T10:00:00Z",
      },
      {
        sqid: "tkt003",
        event: "evt002",
        name: "VIP Ticket",
        description: "Premium seating and exclusive lounge access",
        price: "5000.00",
        sales_price: "5000.00",
        discount_perc: "0",
        quantity: 10,
        quantity_sold: 5,
        type: "vip",
        sales_start: "2026-01-18T00:00:00Z",
        sales_end: "2026-03-09T23:59:59Z",
        is_active: true,
        created_at: "2026-01-18T10:00:00Z",
      },
    ],
  },
  {
    sqid: "evt003",
    title: "AI & Machine Learning Seminar",
    description: "Explore the latest trends in AI and Machine Learning. This hybrid event features keynote speakers from top tech companies.",
    category: "seminar",
    mode: "hybrid",
    venue: "FUTA Auditorium",
    date: "2026-04-05",
    start_time: "09:00:00",
    duration_mins: 360,
    max_capacity: 200,
    allow_sponsorship: true,
    allow_donations: false,
    is_cancelled: false,
    is_published: true,
    created_at: "2026-01-15T14:00:00Z",
    updated_at: "2026-01-22T09:00:00Z",
    creator: 1,
    virtual_meeting: {
      sqid: "vm002",
      platform: "meet",
      join_url: "https://meet.google.com/abc-defg-hij",
      room_name: "AI Seminar 2026",
    },
    starting_price: "1000.00",
    tickets: [
      {
        sqid: "tkt004",
        event: "evt003",
        name: "Online Access",
        description: "Virtual attendance via Google Meet",
        price: "1000.00",
        sales_price: "1000.00",
        discount_perc: "0",
        quantity: 150,
        quantity_sold: 67,
        type: "default",
        sales_start: "2026-01-15T00:00:00Z",
        sales_end: "2026-04-04T23:59:59Z",
        is_active: true,
        created_at: "2026-01-15T14:00:00Z",
      },
      {
        sqid: "tkt005",
        event: "evt003",
        name: "In-Person Ticket",
        description: "Physical attendance with lunch included",
        price: "3500.00",
        sales_price: "3500.00",
        discount_perc: "0",
        quantity: 50,
        quantity_sold: 30,
        type: "default",
        sales_start: "2026-01-15T00:00:00Z",
        sales_end: "2026-04-04T23:59:59Z",
        is_active: true,
        created_at: "2026-01-15T14:00:00Z",
      },
    ],
  },
  {
    sqid: "evt004",
    title: "FUTA Career Fair 2026",
    description: "Annual career fair connecting students and alumni with top employers. Over 50 companies will be present for recruitment.",
    category: "career_fair",
    mode: "physical",
    venue: "FUTA Sports Complex",
    date: "2026-05-20",
    start_time: "08:00:00",
    duration_mins: 480,
    max_capacity: 500,
    allow_sponsorship: true,
    allow_donations: true,
    is_cancelled: false,
    is_published: false,
    created_at: "2026-01-10T11:00:00Z",
    updated_at: "2026-01-25T16:00:00Z",
    creator: 1,
    starting_price: "0.00",
    tickets: [],
  },
];
const categoryLabels: Record<string, string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  networking: "Networking",
  career_fair: "Career Fair",
  webinar: "Webinar",
  conference: "Conference",
};

const platformLabels: Record<string, string> = {
  meet: "Google Meet",
  zoom: "Zoom",
  teams: "Microsoft Teams",
};

export default function EventDetail() {
  const { id } = alumnusEventDetailRoute.useParams();
  const router = useRouter();

  const event = mockEvents.find((e) => e.sqid === id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold text-foreground">
          Event not found
        </h2>
        <Button
          variant="link"
          onClick={() => router.navigate({ to: "/alumnus/events" })}
          className="mt-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </div>
    );
  }

  const formattedDate = format(new Date(event.date), "EEEE, MMMM d, yyyy");
  const formattedTime = format(
    new Date(`2000-01-01T${event.start_time}`),
    "h:mm a"
  );
  const durationHours = Math.floor(event.duration_mins / 60);
  const durationMins = event.duration_mins % 60;
  const durationText = `${durationHours > 0 ? `${durationHours}h ` : ""}${durationMins > 0 ? `${durationMins}m` : ""}`;

  const totalTickets = event.tickets?.reduce((sum, t) => sum + t.quantity, 0) || 0;
  const soldTickets = event.tickets?.reduce((sum, t) => sum + t.quantity_sold, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.navigate({ to: "/alumnus/events" })}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary">
                {categoryLabels[event.category]}
              </Badge>
              <Badge
                variant={
                  event.is_cancelled
                    ? "destructive"
                    : event.is_published
                      ? "default"
                      : "outline"
                }
              >
                {event.is_cancelled
                  ? "Cancelled"
                  : event.is_published
                    ? "Published"
                    : "Draft"}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{event.title}</h1>
          </div>
        </div>
        <Button onClick={() => router.navigate({ to: `/alumnus/events/${event.sqid}/edit` })}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Event
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About this Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </CardContent>
          </Card>

          {/* Tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              {event.tickets && event.tickets.length > 0 ? (
                <div className="space-y-4">
                  {event.tickets.map((ticket) => (
                    <div
                      key={ticket.sqid}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{ticket.name}</h4>
                          <Badge variant="outline" className="capitalize">
                            {ticket.type.replace("_", " ")}
                          </Badge>
                          {!ticket.is_active && (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {ticket.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Sold: {ticket.quantity_sold} / {ticket.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-primary">
                          {parseFloat(ticket.price) === 0
                            ? "Free"
                            : `₦${parseFloat(ticket.price).toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">
                  No tickets created yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Virtual Meeting */}
          {event.virtual_meeting && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Virtual Meeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Platform</span>
                    <span className="font-medium">
                      {platformLabels[event.virtual_meeting.platform]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Room Name</span>
                    <span className="font-medium">
                      {event.virtual_meeting.room_name}
                    </span>
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={event.virtual_meeting.join_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Meeting Link
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{formattedDate}</p>
                  <p className="text-sm text-muted-foreground">Date</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {formattedTime} ({durationText})
                  </p>
                  <p className="text-sm text-muted-foreground">Time & Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {event.mode === "virtual" ? (
                  <Video className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium capitalize">{event.mode}</p>
                  {event.venue && (
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{event.max_capacity} max</p>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Tickets</span>
                <span className="font-medium">{totalTickets}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tickets Sold</span>
                <span className="font-medium">{soldTickets}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Available</span>
                <span className="font-medium">{totalTickets - soldTickets}</span>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Sponsorship</span>
                </div>
                <Badge variant={event.allow_sponsorship ? "default" : "secondary"}>
                  {event.allow_sponsorship ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Donations</span>
                </div>
                <Badge variant={event.allow_donations ? "default" : "secondary"}>
                  {event.allow_donations ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
