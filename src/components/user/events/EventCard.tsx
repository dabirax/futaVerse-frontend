import { useRouter } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const categoryColors: Record<EventListItem["category"], string> = {
  workshop: "bg-blue-100 text-blue-700",
  seminar: "bg-purple-100 text-purple-700",
  networking: "bg-green-100 text-green-700",
  career_fair: "bg-orange-100 text-orange-700",
  webinar: "bg-indigo-100 text-indigo-700",
  conference: "bg-rose-100 text-rose-700",
};

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  const formattedDate = format(new Date(event.date), "EEE, MMM d, yyyy");
  const formattedTime = format(
    new Date(`2000-01-01T${event.start_time}`),
    "h:mm a"
  );

  const modeLabel =
    event.mode === "virtual"
      ? "Virtual"
      : event.mode === "physical"
        ? event.venue || "In-person"
        : "Hybrid";

  const ModeIcon = event.mode === "virtual" ? Video : MapPin;

  return (
    <div
      className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => router.navigate({ to: `/alumnus/events/${event.sqid}` })}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Left content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColors[event.category]}`}
              >
                {categoryLabels[event.category]}
              </span>
              {!event.is_published && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Draft
                </Badge>
              )}
              {event.is_cancelled && (
                <Badge variant="destructive" className="text-xs">
                  Cancelled
                </Badge>
              )}
            </div>

            {/* Title */}
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {event.description}
              </p>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {formattedTime}
              </span>
              <span className="flex items-center gap-1.5">
                <ModeIcon className="h-3.5 w-3.5 shrink-0" />
                {modeLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 shrink-0" />
                {event.max_capacity} capacity
              </span>
            </div>
          </div>

          {/* Right: price + action */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            {event.starting_price && (
              <span className="text-sm font-semibold text-primary">
                {parseFloat(event.starting_price) === 0
                  ? "Free"
                  : `From ₦${parseFloat(event.starting_price).toLocaleString()}`}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={(e) => {
                e.stopPropagation();
                router.navigate({ to: `/alumnus/events/${event.sqid}` });
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
