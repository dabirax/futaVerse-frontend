import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useCreateMentorship } from '@/hooks/useMentorships'

const formSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(2000),
    category: z.string().min(1, 'Category is required'),
    work_mode: z.enum(['Remote', 'Hybrid', 'On-site']),
    duration_weeks: z
      .number()
      .min(1, 'Duration must be at least 1 week')
      .max(104),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    available_slots: z.number().min(1, 'Must have at least 1 slot').max(50),
  })
  .refine(
    (data) =>
      data.start_date && data.end_date && data.end_date > data.start_date,
    {
      message: 'End date must be after start date',
      path: ['end_date'],
    },
  )

type FormValues = z.infer<typeof formSchema>

export default function CreateMentorship() {
  const router = useRouter()
  const { toast } = useToast()
  const createMentorship = useCreateMentorship()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      work_mode: 'Remote',
      duration_weeks: 12,
      start_date: undefined,
      end_date: undefined,
      available_slots: 1,
    },
  })

  const getErrorMessage = (error: unknown) => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || 'Request failed'
    }
    return 'Unexpected error occurred.'
  }

  const onSubmit = (values: FormValues) => {
    const formatted = {
      ...values,
      start_date: values.start_date
        ? format(values.start_date, 'yyyy-MM-dd')
        : null,
      end_date: values.end_date ? format(values.end_date, 'yyyy-MM-dd') : null,
    }

    createMentorship.mutate(formatted, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Mentorship created successfully!',
        })
        router.navigate({ to: '/alumnus/mentorships' })
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description:
            error?.response?.data?.message || 'Failed to create mentorship.',
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.navigate({ to: '/alumnus/mentorships' })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">
          Create New Mentorship
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Basic Information
            </h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentorship Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Frontend Development Mentorship"
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
                      placeholder="Describe the mentorship program, goals, and what mentees will learn..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Technology, Business, Design"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="work_mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Mode</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="On-site">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Duration & Dates */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Duration & Schedule
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="duration_weeks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Weeks)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="104"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Available Slots */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Availability
            </h2>

            <FormField
              control={form.control}
              name="available_slots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Slots</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Number of mentees you can accept
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            {/* Loading State */}
            {createMentorship.isPending && (
              <div className="rounded-lg border border-border bg-yellow-50 text-yellow-800 p-4">
                Creating your mentorship… try not to refresh the page.
              </div>
            )}

            {/* Error State */}
            {createMentorship.isError && (
              <div className="rounded-lg border border-border bg-red-50 text-red-700 p-4">
                {getErrorMessage(createMentorship.error)}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => router.navigate({ to: '/alumnus/mentorships' })}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={createMentorship.isPending}
            >
              Create Mentorship
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
