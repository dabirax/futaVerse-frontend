import { useState } from "react";
import {useRouter} from "@tanstack/react-router";
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
import { ArrowLeft, CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().min(1, "Description is required"),
  category: z.enum([
    "workshop",
    "seminar",
    "networking",
    "career_fair",
    "webinar",
    "conference",
  ]),
  mode: z.enum(["virtual", "physical", "hybrid"]),
  platform: z.enum(["meet", "zoom", "teams"]).optional(),
  venue: z.string().optional(),
  date: z.date({ required_error: "Date is required" }),
  start_time: z.string().min(1, "Start time is required"),
  duration_mins: z.coerce.number().min(15, "Duration must be at least 15 minutes"),
  max_capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  allow_sponsorship: z.boolean(),
  allow_donations: z.boolean(),
  is_published: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;
type TicketData = z.infer<typeof ticketSchema>;

export default function CreateEvent() {
    const router = useRouter();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<TicketData[]>([]);
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "workshop",
      mode: "virtual",
      platform: "meet",
      venue: "",
      start_time: "09:00",
      duration_mins: 60,
      max_capacity: 100,
      allow_sponsorship: false,
      allow_donations: false,
      is_published: false,
    },
  });

  const mode = form.watch("mode");

  const addTicket = () => {
    const result = ticketSchema.safeParse(newTicket);
    if (result.success) {
      setTickets([...tickets, result.data]);
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
  };

  const removeTicket = (index: number) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormData) => {
    console.log("Creating event:", { ...data, tickets });
    toast({
      title: "Event Created",
      description: `"${data.title}" has been created successfully.`,
    });
    router.navigate({ to: "/alumnus/events" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.navigate({ to: '/alumnus/events' })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Event</h1>
          <p className="text-muted-foreground">
            Set up a new event or workshop
          </p>
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
                          <Input
                            placeholder="e.g., Tech Career Workshop 2026"
                            {...field}
                          />
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
                          <Textarea
                            placeholder="Describe your event..."
                            className="min-h-30"
                            {...field}
                          />
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
                                disabled={(date) => date < new Date()}
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
                          defaultValue={field.value}
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
                            defaultValue={field.value}
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
                          <FormDescription>
                            Meeting link will be generated automatically
                          </FormDescription>
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
                            {new Date(ticket.sales_start).toLocaleDateString()}{' '}
                            – {new Date(ticket.sales_end).toLocaleDateString()}
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
                      className="min-h-[60px]"
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
                        <label className="text-sm font-medium">
                          Sales Start
                        </label>
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
                    Create Event
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.navigate({ to: '/alumnus/events' })}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
