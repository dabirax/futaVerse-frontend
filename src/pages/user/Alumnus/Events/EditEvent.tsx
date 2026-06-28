import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, XCircle } from "lucide-react";

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

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useEvent, useUpdateEvent, useUpdateEventMode, useAddEventTicket } from "@/hooks/useEvents";

import TicketsSection, {
  TicketScenario,
} from "@/components/user/events/TicketsSection";

import ConfirmActionDialog from "@/components/user/ConfirmActionDialog";

import {
  FreeTicketConfig,
  LinkedBankAccount,
  PaidTicketInput,
} from "@/types/event";

import { alumnusEditEventRoute } from "@/routes/user-alumnus";
import { BackButton2 } from "@/components/BackButtons";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().min(1, "Description is required"),
  date: z.date(),
  start_time: z.string().min(1, "Start time is required"),
  duration_mins: z.coerce.number().min(15),
  venue: z.string().optional(),
  category: z.enum([
    "workshop",
    "seminar",
    "networking",
    "career_fair",
    "webinar",
    "conference",
  ]),
  max_capacity: z.coerce.number().min(1),
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

  const { data: event, isLoading, isError, error } = useEvent(id);

  const updateEvent = useUpdateEvent();
  const updateEventMode = useUpdateEventMode();
  const addTicket = useAddEventTicket();

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
      date: new Date(),
      start_time: "09:00",
      duration_mins: 60,
      venue: "",
      category: "workshop",
      max_capacity: 100,
      allow_sponsorship: false,
      allow_donations: false,
      is_published: false,
      is_cancelled: false,
      mode: "virtual",
      platform: "meet",
    },
  });

  const mode = form.watch("mode");
  const isCancelled = form.watch("is_cancelled");

  useEffect(() => {
    if (event) {
      form.reset({
        title: event.title,
        description: event.description,
        date: new Date(event.date),
        start_time: event.start_time?.slice(0, 5) || "09:00",
        duration_mins: event.duration_mins,
        venue: event.venue || "",
        category: event.category,
        max_capacity: event.max_capacity,
        allow_sponsorship: event.allow_sponsorship,
        allow_donations: event.allow_donations,
        is_published: event.is_published,
        is_cancelled: event.is_cancelled,
        mode: event.mode,
        platform: event.virtual_meeting?.platform || "meet",
      });

      const initialPaid = (event.tickets || [])
        .filter((t) => parseFloat(t.price) > 0)
        .map((t) => ({
          name: t.name,
          description: t.description,
          price: t.price,
          discount_perc: t.discount_perc || "0",
          quantity: t.quantity,
          sales_start: t.sales_start.replace("Z", "").slice(0, 16),
          sales_end: t.sales_end.replace("Z", "").slice(0, 16),
          is_active: t.is_active,
        }));
      setPaidTickets(initialPaid);

      const free = event.tickets?.find((t) => parseFloat(t.price) === 0);
      setFreeTicket(
        free
          ? { required: true, quantity: free.quantity }
          : { required: false, quantity: 100 }
      );

      const hasFree = free !== undefined;
      const hasPaid = initialPaid.length > 0;
      setScenario(hasFree && hasPaid ? "free_and_paid" : hasPaid ? "paid" : "free");
    }
  }, [event, form]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Loading event details...</h2>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">
          {error instanceof Error ? error.message : "Event not found"}
        </h2>
        <Button
          variant="link"
          onClick={() => router.navigate({ to: "/alumnus/events" })}
          className="mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    const usesPaid =
      scenario === "paid" || scenario === "free_and_paid";

    if (usesPaid && paidTickets.length === 0) {
      toast({
        title: "Add at least one paid ticket",
        variant: "destructive",
      });
      return;
    }

    if (usesPaid && !linkedBankAccount) {
      toast({
        title: "Link a payout account",
        description:
          "Paid tickets require a linked Paystack account.",
        variant: "destructive",
      });
      return;
    }

    const updatePayload = {
      title: data.title,
      description: data.description,
      date: format(data.date, "yyyy-MM-dd"),
      start_time: data.start_time,
      duration_mins: data.duration_mins,
      venue: data.venue || "",
      max_capacity: data.max_capacity,
      allow_sponsorship: data.allow_sponsorship,
      allow_donations: data.allow_donations,
      is_published: data.is_published,
      is_cancelled: data.is_cancelled,
    };

    try {
      await updateEvent.mutateAsync({ sqid: event.sqid, payload: updatePayload });

      await updateEventMode.mutateAsync({
        sqid: event.sqid,
        payload: {
          mode: data.mode,
          venue: data.venue || "",
          ...(data.mode !== "physical" ? { platform: data.platform } : {}),
        },
      });

      const existingTicketNames = new Set((event.tickets || []).map((t) => t.name));
      const newTickets = paidTickets.filter((t) => !existingTicketNames.has(t.name));

      await Promise.all(
        newTickets.map((ticket) =>
          addTicket.mutateAsync({
            event: event.sqid,
            ...ticket,
            sales_start: new Date(ticket.sales_start).toISOString(),
            sales_end: new Date(ticket.sales_end).toISOString(),
          })
        )
      );

      toast({
        title: "Event Updated",
        description: `"${data.title}" updated successfully.`,
      });

      router.navigate({
        to: `/alumnus/events/${event.sqid}`,
      });
    } catch (err: any) {
      toast({
        title: "Error updating event",
        description: err?.message || "Failed to update event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cancelEvent = async () => {
    form.setValue("is_cancelled", true);
    await form.handleSubmit(onSubmit)();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton2/>

        <div>
          <h1 className="text-2xl font-bold">Edit Event</h1>
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
                            <Input
                              type="number"
                              min={15}
                              step={15}
                              {...field}
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
                  {(updateEvent.isError || updateEventMode.isError || addTicket.isError) && (
                    <div className="text-sm rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-300">
                      {updateEvent.error?.message || updateEventMode.error?.message || addTicket.error?.message || "Failed to update event."}
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={updateEvent.isPending || updateEventMode.isPending || addTicket.isPending}
                  >
                    {updateEvent.isPending || updateEventMode.isPending || addTicket.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.navigate({ to: `/alumnus/events/${event.sqid}` })}
                    disabled={updateEvent.isPending || updateEventMode.isPending || addTicket.isPending}
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
                    <ConfirmActionDialog
                      trigger={
                        <Button variant="destructive" className="w-full">
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Event
                        </Button>
                      }
                      title="Cancel this event?"
                      description="This will notify all registered attendees and mark the event as cancelled. This action cannot be undone."
                      confirmLabel="Yes, cancel event"
                      destructive
                      successTitle="Event cancelled"
                      successDescription="All registered attendees will be notified."
                      onConfirm={cancelEvent}
                    />
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