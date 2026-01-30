import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, CalendarIcon, XCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Event } from "@/types/event";
import { alumnusEditEventRoute } from "@/routes/user-alumnus";

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

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().min(1, "Description is required"),
  date: z.date({ required_error: "Date is required" }),
  start_time: z.string().min(1, "Start time is required"),
  duration_mins: z.coerce.number().min(15, "Duration must be at least 15 minutes"),
  venue: z.string().optional(),
  max_capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  allow_sponsorship: z.boolean(),
  allow_donations: z.boolean(),
  is_published: z.boolean(),
  is_cancelled: z.boolean(),
  mode: z.enum(["virtual", "physical", "hybrid"]),
  platform: z.enum(["meet", "zoom", "teams"]).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditEvent() {
  const { id } = alumnusEditEventRoute.useParams();
  const router = useRouter();
  const { toast } = useToast();

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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      date: new Date(event.date),
      start_time: event.start_time.substring(0, 5),
      duration_mins: event.duration_mins,
      venue: event.venue,
      max_capacity: event.max_capacity,
      allow_sponsorship: event.allow_sponsorship,
      allow_donations: event.allow_donations,
      is_published: event.is_published,
      is_cancelled: event.is_cancelled,
      mode: event.mode,
      platform: event.virtual_meeting?.platform || "meet",
    },
  });

  const mode = form.watch("mode");
  const isCancelled = form.watch("is_cancelled");

  const onSubmit = (data: FormData) => {
    console.log("Updating event:", data);
    toast({
      title: "Event Updated",
      description: `"${data.title}" has been updated successfully.`,
    });
    router.navigate({ to: `/alumnus/events/${event.sqid}` });
  };

  const handleCancel = () => {
    form.setValue("is_cancelled", true);
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.navigate({ to: `/alumnus/events/${event.sqid}` })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Event</h1>
          <p className="text-muted-foreground">Update event details</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="max_capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Capacity</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="start_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration_mins"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input type="number" min={15} step={15} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Mode</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="virtual">Virtual</SelectItem>
                            <SelectItem value="physical">Physical</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(mode === "virtual" || mode === "hybrid") && (
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Virtual Platform</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="meet">Google Meet</SelectItem>
                              <SelectItem value="zoom">Zoom</SelectItem>
                              <SelectItem value="teams">Microsoft Teams</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {(mode === "physical" || mode === "hybrid") && (
                    <FormField
                      control={form.control}
                      name="venue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., FUTA Auditorium"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="allow_sponsorship"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Allow Sponsorship</FormLabel>
                          <FormDescription>
                            Let sponsors support your event
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allow_donations"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Allow Donations</FormLabel>
                          <FormDescription>
                            Accept donations from attendees
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_published"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Publish Event</FormLabel>
                          <FormDescription>
                            Make event visible to everyone
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isCancelled}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.navigate({ to: `/alumnus/events/${event.sqid}` })}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              {!isCancelled && (
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Event
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel this event?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will notify all registered attendees and mark
                            the event as cancelled. This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Event</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleCancel}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Cancel Event
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
