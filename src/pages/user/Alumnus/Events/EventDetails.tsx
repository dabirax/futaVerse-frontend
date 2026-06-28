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
  DollarSign,
  Heart,
} from "lucide-react";
import { format } from "date-fns";
import { useEvent } from "@/hooks/useEvents";

import { alumnusEventDetailRoute } from "@/routes/user-alumnus"
import EventTicketsManager from "@/components/user/events/EventTicketsManager";
import { BackButton2 } from "@/components/BackButtons";


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
  const { data: event, isLoading, isError, error } = useEvent(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold text-foreground">Loading event details...</h2>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold text-foreground">
          {error instanceof Error ? error.message : "Event not found"}
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
          <BackButton2/>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary">
                {categoryLabels[event.category]}
              </Badge>
              <Badge
                variant={
                  event.is_cancelled
                    ? 'destructive'
                    : event.is_published
                      ? 'default'
                      : 'outline'
                }
              >
                {event.is_cancelled
                  ? 'Cancelled'
                  : event.is_published
                    ? 'Published'
                    : 'Draft'}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {event.title}
            </h1>
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

          {/* Tickets management (inline) */}
          <EventTicketsManager
            eventSqid={event.sqid}
            showEventSelector={false}
            hideHeader
          />

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
                  <p className="text-sm text-muted-foreground">
                    Time & Duration
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {event.mode === 'virtual' ? (
                  <Video className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium capitalize">{event.mode}</p>
                  {event.venue && (
                    <p className="text-sm text-muted-foreground">
                      {event.venue}
                    </p>
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
                <span className="font-medium">
                  {totalTickets - soldTickets}
                </span>
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
                <Badge
                  variant={event.allow_sponsorship ? 'default' : 'secondary'}
                >
                  {event.allow_sponsorship ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Donations</span>
                </div>
                <Badge
                  variant={event.allow_donations ? 'default' : 'secondary'}
                >
                  {event.allow_donations ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
