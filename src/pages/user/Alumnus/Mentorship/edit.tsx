import { useEffect} from 'react'
import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, CalendarIcon} from 'lucide-react'
import { format } from 'date-fns'
import { alumnusEditMentorshipRoute } from '@/routes/user-alumnus'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import {
  useMentorship,
  useUpdateMentorship,
  useDeleteMentorship,
} from '@/hooks/useMentorships'
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
} from '@/components/ui/alert-dialog'

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

export default function EditMentorship() {
  const { id } = alumnusEditMentorshipRoute.useParams()
  const router = useRouter()
  const { toast } = useToast()

  const { data: currentData, isLoading, isError } = useMentorship(Number(id))
  const { mutate: updateMentorship, isPending: isUpdating } =
    useUpdateMentorship()
  const { mutate: deleteMentorship, isPending: isDeleting } =
    useDeleteMentorship()

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

  // Load mentorship data
  useEffect(() => {
    if (!currentData) return

    form.reset({
      title: currentData.title,
      description: currentData.description,
      category: currentData.category,
      work_mode: currentData.work_mode,
      duration_weeks: currentData.duration_weeks,
      start_date: new Date(currentData.start_date),
      end_date: new Date(currentData.end_date),
      available_slots: currentData.available_slots,
    })
  }, [currentData, form])

  const onSubmit = (data: FormValues) => {
    const formatted = {
      ...data,
      start_date: data.start_date
        ? format(data.start_date, 'yyyy-MM-dd')
        : null,
      end_date: data.end_date ? format(data.end_date, 'yyyy-MM-dd') : null,
    }

    updateMentorship(
      { id: Number(id), payload: formatted },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Mentorship updated successfully!',
          })
          router.navigate({ to: `/alumnus/mentorships/${id}` })
        },
        onError: (err: any) => {
          toast({
            title: 'Error',
            description:
              err?.response?.data?.message || 'Failed to update mentorship.',
            variant: 'destructive',
          })
        },
      },
    )
  }

  const handleDelete = () => {
    deleteMentorship(Number(id), {
      onSuccess: () => {
        toast({
          title: 'Deleted',
          description: 'Mentorship removed successfully.',
        })
        router.navigate({ to: '/alumnus/mentorships' })
      },
      onError: (err: any) => {
        toast({
          title: 'Error',
          description: err?.response?.data?.message || 'Delete failed.',
          variant: 'destructive',
        })
      },
    })
  }

  const handleCancel = () => {
    router.navigate({ to: `/alumnus/mentorships/${id}` })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.navigate({ to: `/alumnus/mentorships/${id}` })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Edit Mentorship</h1>
      </div>

      {isLoading && (
        <p className="text-center font-bold text-teal-600 text-2xl">
          Loading...
        </p>
      )}
      {isError && (
        <p className="text-center font-bold text-red-600 text-2xl">
          Error loading mentorship details.
        </p>
      )}

      {!isLoading && !isError && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
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
                          className="min-h-30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              </CardContent>
            </Card>

            {/* Work Details */}
            <Card>
              <CardHeader>
                <CardTitle>Work Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="work_mode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Mode</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                </div>

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
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
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
                                  'w-full pl-3 text-left font-normal',
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
                              initialFocus
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
                                  'w-full pl-3 text-left font-normal',
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4 justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Mentorship</Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete mentorship?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The mentorship will be
                      permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                      onClick={() => {
                        handleDelete()
                      }}
                    >
                      {isDeleting ? 'Deleting...' : 'Confirm'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
