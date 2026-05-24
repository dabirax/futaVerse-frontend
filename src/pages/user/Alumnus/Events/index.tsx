import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Ticket } from "lucide-react";
import EventCard from "@/components/user/events/EventCard";
import { EventListItem } from "@/types/event";
import { useHostedEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";

function EventListSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  );
}

export default function AlumnusEvents() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [modeFilter, setModeFilter] = useState<string>("all");

  const { data, isLoading, isError } = useHostedEvents();
  const events: EventListItem[] = data?.results ?? [];

  const publishedEvents = events.filter((e) => e.is_published && !e.is_cancelled);
  const draftEvents = events.filter((e) => !e.is_published && !e.is_cancelled);
  const cancelledEvents = events.filter((e) => e.is_cancelled);

  const filterEvents = (list: EventListItem[]) =>
    list.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;
      const matchesMode = modeFilter === "all" || event.mode === modeFilter;
      return matchesSearch && matchesCategory && matchesMode;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage your events and workshops
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => router.navigate({ to: "/alumnus/events/tickets" })}
          >
            <Ticket className="h-4 w-4 mr-2" />
            My tickets
          </Button>
          <Button onClick={() => router.navigate({ to: "/alumnus/events/create" })}>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="seminar">Seminar</SelectItem>
            <SelectItem value="networking">Networking</SelectItem>
            <SelectItem value="career_fair">Career Fair</SelectItem>
            <SelectItem value="webinar">Webinar</SelectItem>
            <SelectItem value="conference">Conference</SelectItem>
          </SelectContent>
        </Select>
        <Select value={modeFilter} onValueChange={setModeFilter}>
          <SelectTrigger className="w-full sm:w-37.5">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="virtual">Virtual</SelectItem>
            <SelectItem value="physical">Physical</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Failed to load events. Please refresh and try again.
        </p>
      )}

      {/* Tabs */}
      <Tabs defaultValue="published" className="w-full">
        <div className="overflow-x-auto -mx-1 px-1 pb-1">
          <TabsList className="inline-flex w-max">
            <TabsTrigger value="published">
              Published ({publishedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts ({draftEvents.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledEvents.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="published" className="mt-6">
          {isLoading ? (
            <EventListSkeleton />
          ) : (
            <div className="grid gap-4">
              {filterEvents(publishedEvents).length > 0 ? (
                filterEvents(publishedEvents).map((event) => (
                  <EventCard key={event.sqid} event={event} />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No published events found
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          {isLoading ? (
            <EventListSkeleton />
          ) : (
            <div className="grid gap-4">
              {filterEvents(draftEvents).length > 0 ? (
                filterEvents(draftEvents).map((event) => (
                  <EventCard key={event.sqid} event={event} />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No draft events found
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          {isLoading ? (
            <EventListSkeleton />
          ) : (
            <div className="grid gap-4">
              {filterEvents(cancelledEvents).length > 0 ? (
                filterEvents(cancelledEvents).map((event) => (
                  <EventCard key={event.sqid} event={event} />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No cancelled events
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
