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
import { Plus, Search } from "lucide-react";
import EventCard from "@/components/user/EventCard";
import { Event, EventListItem} from "@/types/event";

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

const mockEventListItems: EventListItem[] = mockEvents.map(
  ({ tickets, creator, ...rest }) => rest
);



export default function AlumnusEvents() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [modeFilter, setModeFilter] = useState<string>("all");

  const publishedEvents = mockEventListItems.filter((e) => e.is_published && !e.is_cancelled);
  const draftEvents = mockEventListItems.filter((e) => !e.is_published);
  const cancelledEvents = mockEventListItems.filter((e) => e.is_cancelled);

  const filterEvents = (events: typeof mockEventListItems) => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;
      const matchesMode = modeFilter === "all" || event.mode === modeFilter;
      return matchesSearch && matchesCategory && matchesMode;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">
            Manage your events and workshops
          </p>
        </div>
        <Button onClick={() => router.navigate({ to: "/alumnus/events/create" })}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
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

      {/* Tabs */}
      <Tabs defaultValue="published" className="w-full">
        <TabsList>
          <TabsTrigger value="published">
            Published ({publishedEvents.length})
          </TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftEvents.length})</TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="mt-6">
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
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
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
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
