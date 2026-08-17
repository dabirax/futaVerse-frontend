import { useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarIcon, X } from 'lucide-react'
import { format } from 'date-fns'
import { alumnusEditInternshipRoute } from '@/routes/user-alumnus'
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
import { Switch } from '@/components/ui/switch'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import {
  useDeleteInternship,
  useInternship,
  useUpdateInternship,
} from '@/hooks/useInternships'
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
import { BackButton2 } from '@/components/BackButtons'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  work_mode: z.enum(['Remote', 'Onsite', 'Hybrid']),
  engagement_type: z.enum(['Full-time', 'Part-time']),
  location: z.string().min(1, 'Location is required'),
  industry: z.string().min(1, 'Industry is required'),
  duration_weeks: z.number().min(1, 'Duration must be at least 1 week'),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  is_paid: z.boolean(),
  stipend: z.string().optional(),
  available_slots: z.number().min(1, 'At least 1 slot is required'),
  remaining_slots: z.number().min(0),
  require_resume: z.boolean(),
  require_cover_letter: z.boolean(),
  skills_required: z.array(z.string()).min(1, 'At least one skill is required'),
  levels: z.array(z.number()).min(1, 'Select at least one level'),
  company: z.string().min(1, 'Company is required'),
  company_type: z.string().min(1, 'Company type is required'),
  company_linkedin_url: z.string().optional(),
  company_website_url: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function EditInternship() {
  const { sqid } = alumnusEditInternshipRoute.useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [skillInput, setSkillInput] = useState('')

  const { data: currentData, isLoading, isError } = useInternship(sqid)

  const {
    mutate,
    isPending: isUpdating,
    isError: isUpdateError,
  } = useUpdateInternship()
  const { mutate: deleteInternship, isPending: isDeleting } =
    useDeleteInternship()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      work_mode: currentData.work_mode,
      engagement_type: currentData.engagement_type,
      location: '',
      industry: '',
      duration_weeks: 8,
      start_date: new Date(),
      end_date: new Date(),
      is_paid: false,
      stipend: '',
      available_slots: 1,
      remaining_slots: 1,
      require_resume: true,
      require_cover_letter: false,
      skills_required: [],
      levels: [],
      company: '',
      company_type: '',
      company_linkedin_url: '',
      company_website_url: '',
    },
  })

  useEffect(() => {
    if (!currentData) return

    form.reset({
      title: currentData.title,
      description: currentData.description,
      work_mode: currentData.work_mode,
      engagement_type: currentData.engagement_type,
      location: currentData.location,
      industry: currentData.industry,
      duration_weeks: currentData.duration_weeks,
      start_date: new Date(currentData.start_date),
      end_date: new Date(currentData.end_date),
      is_paid: currentData.is_paid,
      stipend: currentData.stipend,
      available_slots: currentData.available_slots,
      remaining_slots: currentData.remaining_slots,
      require_resume: currentData.require_resume,
      require_cover_letter: currentData.require_cover_letter,
      skills_required: currentData.skills_required,
      levels: currentData.levels || [],
      company: currentData.company || '',
      company_type: currentData.company_type || '',
      company_linkedin_url: currentData.company_linkedin_url || '',
      company_website_url: currentData.company_website_url || '',
    })
  }, [currentData, form])

  const isPaid = form.watch('is_paid')
  const skills = form.watch('skills_required')
  const levels = form.watch('levels')

  const extractApiErrors = (error: unknown): string => {
    if (error instanceof AxiosError) {
      const data = error.response?.data
      if (!data) return 'Request failed'
      if (typeof data.message === 'string') return data.message
      if (typeof data === 'object' && data !== null) {
        const entries = Object.entries(data)
        if (entries.length > 0) {
          return entries
            .map(([key, val]) => {
              const msg = Array.isArray(val) ? val[0] : val
              return `${key}: ${msg}`
            })
            .join('\n')
        }
      }
      return 'Request failed'
    }
    return 'An unexpected error occurred.'
  }

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      form.setValue('skills_required', [...skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      'skills_required',
      skills.filter((skill) => skill !== skillToRemove),
    )
  }

  const toggleLevel = (level: number) => {
    form.setValue(
      'levels',
      levels.includes(level)
        ? levels.filter((l) => l !== level)
        : [...levels, level],
    )
  }

  const onSubmit = (data: FormValues) => {
    const formatted = {
      ...data,
      remaining_slots: data.available_slots,
      start_date: data.start_date
        ? format(data.start_date, 'yyyy-MM-dd')
        : null,
      end_date: data.end_date ? format(data.end_date, 'yyyy-MM-dd') : null,
      stipend: data.is_paid ? data.stipend || '0' : '0',
      company_linkedin_url: data.company_linkedin_url || undefined,
      company_website_url: data.company_website_url || undefined,
    }

    mutate(
      { id: sqid, payload: formatted },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Internship updated successfully!',
          })
          router.navigate({ to: `/alumnus/internships/${sqid}` })
        },
        onError: (err: unknown) => {
          toast({
            title: 'Error',
            description: extractApiErrors(err),
            variant: 'destructive',
          })
        },
      },
    )
  }

  const handleDelete = () => {
    deleteInternship(sqid, {
      onSuccess: () => {
        toast({
          title: 'Deleted',
          description: 'Internship removed successfully.',
          variant: 'destructive',
        })
        router.navigate({ to: '/alumnus/internships' })
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
    router.navigate({ to: `/alumnus/internships/${sqid}` })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton2 />
        <h1 className="font-display text-xl text-ink">Edit Internship</h1>
      </div>

      {isLoading && (
        <div className="rounded-md border border-line bg-surface-2 p-4 text-body text-ink-soft">
          Loading...
        </div>
      )}
      {isError && (
        <div className="rounded-md border border-destructive bg-destructive-soft p-4 text-body text-destructive">
          Error loading internship details.
        </div>
      )}

      {!isLoading && !isError && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Information */}
            <section className="rounded-md border border-line bg-surface p-6 space-y-5">
              <h2 className="text-overline text-maroon">Basic Information</h2>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Frontend Developer Intern"
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
                        placeholder="Describe the internship responsibilities and expectations..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* Company Information */}
            <section className="rounded-md border border-line bg-surface p-6 space-y-5">
              <h2 className="text-overline text-maroon">Company Information</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Startup">Startup</SelectItem>
                          <SelectItem value="SME">SME</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="NGO / Non-profit">
                            NGO / Non-profit
                          </SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                          <SelectItem value="Educational Institution">
                            Educational Institution
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Technology, Finance, Healthcare"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company_linkedin_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/company/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_website_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* Work Details */}
            <section className="rounded-md border border-line bg-surface p-6 space-y-5">
              <h2 className="text-overline text-maroon">Work Details</h2>
              <div className="grid gap-5 md:grid-cols-2">
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
                          <SelectItem value="Onsite">Onsite</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="engagement_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engagement Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select engagement type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Lagos, Nigeria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="levels"
                render={() => (
                  <FormItem>
                    <FormLabel>Target Levels</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {[100, 200, 300, 400, 500, 600].map((level) => (
                        <Badge
                          key={level}
                          variant={
                            levels.includes(level) ? 'default' : 'outline'
                          }
                          className="cursor-pointer select-none"
                          onClick={() => toggleLevel(level)}
                        >
                          {level} Level
                        </Badge>
                      ))}
                    </div>
                    <FormDescription>
                      Select which academic levels this internship targets
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration_weeks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (weeks)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* Timeline */}
            <section className="rounded-md border border-line bg-surface p-6 space-y-5">
              <h2 className="text-overline text-maroon">Timeline</h2>
              <div className="grid gap-5 md:grid-cols-2">
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
            </section>

            {/* Compensation */}
            <section className="rounded-md border border-line bg-surface p-6 space-y-5">
              <h2 className="text-overline text-maroon">Compensation</h2>
              <FormField
                control={form.control}
                name="is_paid"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-md border border-line p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-body">
                        Paid Internship
                      </FormLabel>
                      <div className="text-body-sm text-ink-soft">
                        Does this internship offer a stipend?
                      </div>
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
              {isPaid && (
                <FormField
                  control={form.control}
                  name="stipend"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stipend Amount (₦)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g. 50000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* Skills & Requirements */}
            <section className="rounded-md border border-line bg-surface p-6 space-y-5">
              <h2 className="text-overline text-maroon">
                Skills & Requirements
              </h2>
              <div>
                <FormLabel>Required Skills</FormLabel>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
                {form.formState.errors.skills_required && (
                  <p className="text-body-sm text-destructive mt-2">
                    {form.formState.errors.skills_required.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="require_resume"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-md border border-line p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-body">
                        Require Resume
                      </FormLabel>
                      <div className="text-body-sm text-ink-soft">
                        Applicants must submit a resume
                      </div>
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
                name="require_cover_letter"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-md border border-line p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-body">
                        Require Cover Letter
                      </FormLabel>
                      <div className="text-body-sm text-ink-soft">
                        Applicants must submit a cover letter
                      </div>
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
            </section>

            {/* Error state */}
            {isUpdateError && (
              <div className="rounded-md border border-destructive bg-destructive-soft p-4 text-body text-destructive">
                Error updating internship.
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-4 justify-between pt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Internship</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete internship?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The internship will be
                      permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
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
