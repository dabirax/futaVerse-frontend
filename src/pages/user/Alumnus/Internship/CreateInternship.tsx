import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, X } from 'lucide-react'
import { format } from 'date-fns'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useCreateInternship } from '@/hooks/useInternships'
import { BackButton2 } from '@/components/BackButtons'

const formSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(2000),
    work_mode: z.enum(['Remote', 'Hybrid', 'Onsite']),
    engagement_type: z.enum(['Full-time', 'Part-time', 'Contract']),
    location: z.string().min(1, 'Location is required'),
    industry: z.string().min(1, 'Industry is required'),
    duration_weeks: z
      .number()
      .min(1, 'Duration must be at least 1 week')
      .max(104),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    is_paid: z.boolean(),
    stipend: z.string().optional(),
    available_slots: z.number().min(1, 'Must have at least 1 slot').max(50),
    remaining_slots: z.number().min(0).max(50),
    require_resume: z.boolean(),
    require_cover_letter: z.boolean(),
    skills_required: z
      .array(z.string())
      .min(1, 'At least one skill is required'),
    levels: z.array(z.number()).min(1, 'Select at least one level'),
    company: z.string().min(1, 'Company is required'),
    company_type: z.string().min(1, 'Company type is required'),
    company_linkedin_url: z.string().optional(),
    company_website_url: z.string().optional(),
  })
  .refine(
    (data) =>
      data.start_date && data.end_date && data.end_date > data.start_date,
    {
      message: 'Start and end dates are required, and end must be after start',
      path: ['end_date'],
    },
  )

type FormValues = z.infer<typeof formSchema>

export default function CreateInternship() {
  const router = useRouter()
  const { toast } = useToast()
  const [skillInput, setSkillInput] = useState('')
  const createInternship = useCreateInternship()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      work_mode: 'Remote',
      engagement_type: 'Full-time',
      location: '',
      industry: '',
      duration_weeks: 12,
      start_date: undefined,
      end_date: undefined,
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

  const isPaid = form.watch('is_paid')
  const skills = form.watch('skills_required')
  const levels = form.watch('levels')

  const onInvalid = () => {
    document
      .querySelector('[aria-invalid="true"]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    toast({
      title: 'Some required fields are incomplete',
      variant: 'destructive',
    })
  }

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

  const removeSkill = (skill: string) => {
    form.setValue(
      'skills_required',
      skills.filter((s) => s !== skill),
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

  const onSubmit = (values: FormValues) => {
    const formatted = {
      ...values,
      start_date: values.start_date
        ? format(values.start_date, 'yyyy-MM-dd')
        : null,
      end_date: values.end_date ? format(values.end_date, 'yyyy-MM-dd') : null,
      stipend: values.is_paid ? values.stipend || '0' : '0',
      remaining_slots: values.available_slots,
      company_linkedin_url: values.company_linkedin_url || undefined,
      company_website_url: values.company_website_url || undefined,
    }
    createInternship.mutate(formatted, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Internship created successfully!',
        })
        router.navigate({ to: '/alumnus/internships' })
      },
      onError: (error: unknown) => {
        toast({
          title: 'Error',
          description: extractApiErrors(error),
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <BackButton2 />
        <h1 className="font-display text-xl text-ink">
          Create New Internship
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-4"
        >
          {/* Basic Information */}
          <section className="rounded-md border border-line bg-surface p-6 space-y-5">
            <h2 className="text-overline text-maroon">Basic Information</h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internship Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Frontend Developer Intern"
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
                      placeholder="Describe the internship role, responsibilities, and what the intern will learn..."
                      className="min-h-30"
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

            <div className="grid md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Acme Inc." {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                      placeholder="e.g., Technology, Finance, Healthcare"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-5">
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

            <div className="grid md:grid-cols-2 gap-5">
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
                        <SelectItem value="Onsite">Onsite</SelectItem>
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select engagement type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
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
                    <Input placeholder="e.g., Lagos, Nigeria" {...field} />
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
                        variant={levels.includes(level) ? 'default' : 'outline'}
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

            <div className="grid md:grid-cols-3 gap-5">
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
                    Number of interns you can accept
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Skills Required */}
          <section className="rounded-md border border-line bg-surface p-6 space-y-5">
            <h2 className="text-overline text-maroon">Skills Required</h2>

            <FormField
              control={form.control}
              name="skills_required"
              render={() => (
                <FormItem>
                  <FormLabel>Add Skills</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., React, TypeScript, Node.js"
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
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Compensation */}
          <section className="rounded-md border border-line bg-surface p-6 space-y-5">
            <h2 className="text-overline text-maroon">Compensation</h2>

            <FormField
              control={form.control}
              name="is_paid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border border-line p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-body">Paid Internship</FormLabel>
                    <FormDescription>
                      Will this internship provide a stipend?
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

            {isPaid && (
              <FormField
                control={form.control}
                name="stipend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stipend Amount (₦)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Monthly stipend in Nigerian Naira
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </section>

          {/* Application Requirements */}
          <section className="rounded-md border border-line bg-surface p-6 space-y-5">
            <h2 className="text-overline text-maroon">
              Application Requirements
            </h2>

            <FormField
              control={form.control}
              name="require_resume"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border border-line p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-body">
                      Require Resume
                    </FormLabel>
                    <FormDescription>
                      Students must upload their resume
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
              name="require_cover_letter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border border-line p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-body">
                      Require Cover Letter
                    </FormLabel>
                    <FormDescription>
                      Students must submit a cover letter
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
          </section>

          {/* Status messages */}
          {createInternship.isPending && (
            <div className="rounded-md border border-line bg-surface-2 p-4 text-body text-ink-soft">
              Creating your internship — please don't refresh the page.
            </div>
          )}

          {createInternship.isError && (
            <div className="rounded-md border border-destructive bg-destructive-soft p-4 text-body text-destructive whitespace-pre-line">
              {extractApiErrors(createInternship.error)}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-4 justify-end pt-2">
            <Link to="/alumnus/internships">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Create Internship</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
