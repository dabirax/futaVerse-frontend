import { useState } from "react";
import { useRouter} from "@tanstack/react-router";
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
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import TicketsSection, {
  TicketScenario,
} from "@/components/user/events/TicketsSection";
import {
  CreateEventPayload,
  FreeTicketConfig,
  LinkedBankAccount,
  PaidTicketInput,
} from "@/types/event";


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

export default function CreateEvent() {
    const router = useRouter();
  const { toast } = useToast();
  const [scenario, setScenario] = useState<TicketScenario>("free");
  const [freeTicket, setFreeTicket] = useState<FreeTicketConfig>({
    required: true,
    quantity: 100,
  });
  const [paidTickets, setPaidTickets] = useState<PaidTicketInput[]>([]);
  const [linkedBankAccount, setLinkedBankAccount] =
    useState<LinkedBankAccount | null>(null);

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

  const onSubmit = (data: FormData) => {
    // Validate scenario-specific requirements before submitting.
    const usesPaid = scenario === "paid" || scenario === "free_and_paid";
    if (usesPaid && paidTickets.length === 0) {
      toast({
        title: "Add at least one paid ticket",
        description: "You picked a scenario that requires paid tickets.",
        variant: "destructive",
      });
      return;
    }
    if (usesPaid && !linkedBankAccount) {
      toast({
        title: "Link a payout account",
        description: "Paid ticket sales require a linked Paystack account.",
        variant: "destructive",
      });
      return;
    }
    if (
      (scenario === "free" || scenario === "free_and_paid") &&
      freeTicket.quantity <= 0
    ) {
      toast({
        title: "Set free ticket quantity",
        description: "Free tickets must have at least 1 available seat.",
        variant: "destructive",
      });
      return;
    }

    const payload: CreateEventPayload = {
      title: data.title,
      description: data.description,
      category: data.category,
      mode: data.mode,
      venue: data.venue || "",
      date: format(data.date, "yyyy-MM-dd"),
      start_time: data.start_time,
      duration_mins: data.duration_mins,
      max_capacity: data.max_capacity,
      allow_sponsorship: data.allow_sponsorship,
      allow_donations: data.allow_donations,
      is_published: data.is_published,
      ...(mode !== "physical" ? { platform: data.platform } : {}),
      free_ticket:
        scenario === "free" || scenario === "free_and_paid"
          ? { required: true, quantity: freeTicket.quantity }
          : { required: false, quantity: 0 },
      ...(usesPaid
        ? {
            tickets: paidTickets.map((t) => ({
              ...t,
              sales_start: new Date(t.sales_start).toISOString(),
              sales_end: new Date(t.sales_end).toISOString(),
            })),
          }
        : {}),
    };

    console.log("POST /api/events/", payload);
    toast({
      title: "Event Created",
      description: `"${data.title}" has been created successfully.`,
    });
    router.navigate({to: "/alumnus/events"});
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
                  
              {/* Tickets (3 scenarios + inline Paystack link) */}
              <TicketsSection
                scenario={scenario}
                onScenarioChange={setScenario}
                freeTicket={freeTicket}
                onFreeTicketChange={setFreeTicket}
                paidTickets={paidTickets}
                onPaidTicketsChange={setPaidTickets}
                linkedBankAccount={linkedBankAccount}
                onLinkedBankAccountChange={setLinkedBankAccount}
              />
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
  );
}
