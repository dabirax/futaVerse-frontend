import { useRouter } from "@tanstack/react-router";
import {useState} from "react"
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
import { ArrowLeft, CalendarIcon,Trash2, XCircle, Plus } from "lucide-react";
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

const ticketSchema = z.object({
  name: z.string().min(1, 'Ticket name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  discount_perc: z.string().optional().default('0'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  type: z.enum(['default', 'vip', 'early_bird']),
  sales_start: z.string().min(1, 'Sales start date is required'),
  sales_end: z.string().min(1, 'Sales end date is required'),
  is_active: z.boolean().default(true),
})

type TicketData = z.infer<typeof ticketSchema>

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required'),
  date: z.date({ required_error: 'Date is required' }),
  start_time: z.string().min(1, 'Start time is required'),
  duration_mins: z.coerce
    .number()
    .min(15, 'Duration must be at least 15 minutes'),
  venue: z.string().optional(),
  category: z.enum([
    'workshop',
    'seminar',
    'networking',
    'career_fair',
    'webinar',
    'conference',
  ]),
  max_capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  allow_sponsorship: z.boolean(),
  allow_donations: z.boolean(),
  is_published: z.boolean(),
  is_cancelled: z.boolean(),
  mode: z.enum(['virtual', 'physical', 'hybrid']),
  platform: z.enum(['meet', 'zoom', 'teams']).optional(),
})

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
      category: event.category,
      max_capacity: event.max_capacity,
      allow_sponsorship: event.allow_sponsorship,
      allow_donations: event.allow_donations,
      is_published: event.is_published,
      is_cancelled: event.is_cancelled,
      mode: event.mode,
      platform: event.virtual_meeting?.platform || "meet",
    },
  });

 const [tickets, setTickets] = useState<TicketData[]>(
   (event?.tickets || []).map((t) => ({
     name: t.name,
     description: t.description,
     price: t.price,
     discount_perc: t.discount_perc || '0',
     quantity: t.quantity,
     type: t.type,
     sales_start: t.sales_start.replace('Z', '').substring(0, 16),
     sales_end: t.sales_end.replace('Z', '').substring(0, 16),
     is_active: t.is_active,
   })),
 )
 const [newTicket, setNewTicket] = useState<Partial<TicketData>>({
   name: '',
   description: '',
   price: '0',
   discount_perc: '0',
   quantity: 100,
   type: 'default',
   sales_start: '',
   sales_end: '',
   is_active: true,
 })


  const mode = form.watch("mode");
  const isCancelled = form.watch("is_cancelled");

const addTicket = () => {
  const result = ticketSchema.safeParse(newTicket)
  if (result.success) {
    setTickets([...tickets, result.data])
    setNewTicket({
      name: '',
      description: '',
      price: '0',
      discount_perc: '0',
      quantity: 100,
      type: 'default',
      sales_start: '',
      sales_end: '',
      is_active: true,
    })
  }
}

const removeTicket = (index: number) => {
  setTickets(tickets.filter((_, i) => i !== index))
}


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
          onClick={() =>
            router.navigate({ to: `/alumnus/events/${event.sqid}` })
          }
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="seminar">Seminar</SelectItem>
                              <SelectItem value="networking">
                                Networking
                              </SelectItem>
                              <SelectItem value="career_fair">
                                Career Fair
                              </SelectItem>
                              <SelectItem value="webinar">Webinar</SelectItem>
                              <SelectItem value="conference">
                                Conference
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
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
                                    'pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                            <Input type="time" {...field} className="w-fit" />
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
                            <Input
                              type="number"
                              min={15}
                              step={15}
                              {...field}
                              className="w-fit"
                            />
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

                  {(mode === 'virtual' || mode === 'hybrid') && (
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
                              <SelectItem value="teams">
                                Microsoft Teams
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {(mode === 'physical' || mode === 'hybrid') && (
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

            {/* Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tickets.length > 0 && (
                  <div className="space-y-3">
                    {tickets.map((ticket, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{ticket.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {ticket.description}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTicket(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span>
                            ₦{parseFloat(ticket.price).toLocaleString()}
                          </span>
                          {ticket.discount_perc &&
                            ticket.discount_perc !== '0' && (
                              <span>{ticket.discount_perc}% off</span>
                            )}
                          <span>{ticket.quantity} available</span>
                          <span className="capitalize">
                            {ticket.type.replace('_', ' ')}
                          </span>
                          <span>
                            {ticket.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Sales:{' '}
                          {new Date(ticket.sales_start).toLocaleDateString()} –{' '}
                          {new Date(ticket.sales_end).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4 p-4 rounded-lg border border-dashed">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Ticket name"
                      value={newTicket.name}
                      onChange={(e) =>
                        setNewTicket({ ...newTicket, name: e.target.value })
                      }
                    />
                    <Select
                      value={newTicket.type}
                      onValueChange={(value: TicketData['type']) =>
                        setNewTicket({ ...newTicket, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Standard</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="early_bird">Early Bird</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Ticket description"
                    value={newTicket.description}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        description: e.target.value,
                      })
                    }
                    className="min-h-15"
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input
                      placeholder="Price (0 for free)"
                      type="number"
                      min={0}
                      step="0.01"
                      value={newTicket.price}
                      onChange={(e) =>
                        setNewTicket({ ...newTicket, price: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Discount %"
                      type="number"
                      min={0}
                      max={100}
                      value={newTicket.discount_perc}
                      onChange={(e) =>
                        setNewTicket({
                          ...newTicket,
                          discount_perc: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Quantity"
                      type="number"
                      min={1}
                      value={newTicket.quantity}
                      onChange={(e) =>
                        setNewTicket({
                          ...newTicket,
                          quantity: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Sales Start</label>
                      <Input
                        type="datetime-local"
                        value={newTicket.sales_start}
                        onChange={(e) =>
                          setNewTicket({
                            ...newTicket,
                            sales_start: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Sales End</label>
                      <Input
                        type="datetime-local"
                        value={newTicket.sales_end}
                        onChange={(e) =>
                          setNewTicket({
                            ...newTicket,
                            sales_end: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={newTicket.is_active ?? true}
                        onCheckedChange={(checked) =>
                          setNewTicket({ ...newTicket, is_active: checked })
                        }
                      />
                      <label className="text-sm font-medium">Active</label>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTicket}
                      disabled={
                        !newTicket.name ||
                        !newTicket.sales_start ||
                        !newTicket.sales_end
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Ticket
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    onClick={() =>
                      router.navigate({ to: `/alumnus/events/${event.sqid}` })
                    }
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              {!isCancelled && (
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive">
                      Danger Zone
                    </CardTitle>
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
                          <AlertDialogTitle>
                            Cancel this event?
                          </AlertDialogTitle>
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
  )
}
