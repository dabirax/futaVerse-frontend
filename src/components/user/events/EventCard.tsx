
import { useRouter } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react";
import { format } from "date-fns";
import { EventListItem } from "@/types/event";

interface EventCardProps {
  event: EventListItem;
}

const categoryLabels: Record<EventListItem["category"], string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  networking: "Networking",
  career_fair: "Career Fair",
  webinar: "Webinar",
  conference: "Conference",
};

const modeIcons: Record<EventListItem["mode"], React.ReactNode> = {
  virtual: <Video className="h-4 w-4" />,
  physical: <MapPin className="h-4 w-4" />,
  hybrid: <><Video className="h-4 w-4" /><MapPin className="h-4 w-4" /></>,
};

export default function EventCard({ event }: EventCardProps) {
    const  router = useRouter();

  const formattedDate = format(new Date(event.date), "MMM d, yyyy");
  const formattedTime = format(
    new Date(`2000-01-01T${event.start_time}`),
    "h:mm a"
  );

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      onClick={() => router.navigate({ to: `/alumnus/events/${event.sqid}` })}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">
                  {categoryLabels[event.category]}
                </Badge>
                {!event.is_published && (
                  <Badge variant="outline" className="text-muted-foreground">
                    Draft
                  </Badge>
                )}
                {event.is_cancelled && (
                  <Badge variant="destructive">Cancelled</Badge>
                )}
              </div>
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {event.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {modeIcons[event.mode]}
              <span className="capitalize">{event.mode}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{event.max_capacity} capacity</span>
            </div>
          </div>

          {event.starting_price && (
            <div className="pt-2 border-t">
              <span className="text-sm font-medium text-primary">
                {parseFloat(event.starting_price) === 0
                  ? "Free"
                  : `From ₦${parseFloat(event.starting_price).toLocaleString()}`}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
