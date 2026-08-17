import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Country, State } from 'country-state-city'
import { Loader2, Save, UploadCloud } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import type { z } from 'zod'
import {
  alumnusBasicRaw,
  alumnusProfessionalSchema,
  alumnusSchoolSchema,
} from '@/pages/onboarding/Alumnus/lib/alumnusSchema'
import { updateAlumnusProfile } from '@/services/profile'
import { BackButton2 } from '@/components/BackButtons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import PaystackBankLink from '@/components/user/events/PaystackBankLink'
import { useMe } from '@/hooks/useMe'
import { useToast } from '@/hooks/use-toast'
import { uploadProfileImage } from '@/services/uploads'

const alumnusBasicEditSchema = alumnusBasicRaw.omit({
  email: true,
  password: true,
  confirmPassword: true,
})

type AlumnusBasicEdit = z.infer<typeof alumnusBasicEditSchema>
type AlumnusSchoolEdit = z.infer<typeof alumnusSchoolSchema>
type AlumnusProfEdit = z.infer<typeof alumnusProfessionalSchema>

const countryOptions = Country.getAllCountries().map((c) => ({
  label: c.name,
  value: c.isoCode,
}))

const stateOptions = (code: string) =>
  State.getStatesOfCountry(code).map((s) => s.name)

const industries = [
  'Information Technology',
  'Software Development',
  'Cybersecurity',
  'Data Science & Analytics',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Renewable Energy',
  'Banking & Finance',
  'Digital Marketing',
  'Healthcare',
  'Education',
  'Agriculture',
  'Media & Entertainment',
  'Construction & Real Estate',
  'NGO / Nonprofit',
  'Government & Public Sector',
]

const AlumnusSettings = () => {
  const { data: me, isLoading: meLoading } = useMe()
  const qc = useQueryClient()
  const { toast } = useToast()
  const profile = me?.role === 'alumni' ? me.profile : undefined

  const initials =
    profile?.firstname || profile?.lastname
      ? `${profile.firstname.charAt(0)}${profile.lastname.charAt(0)}`.toUpperCase()
      : 'AL'

  // Profile image state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(
    sessionStorage.getItem('profile_img') ?? '',
  )
  const [isUploading, setIsUploading] = useState(false)
  const [imageStatus, setImageStatus] = useState<{
    type: 'error' | 'success'
    message: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (profile?.profile_img_url && !selectedFile) {
      setPreviewUrl(profile.profile_img_url)
    }
  }, [profile?.profile_img_url, selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setSelectedFile(file)
    setImageStatus(null)
    if (file) setPreviewUrl(URL.createObjectURL(file))
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setIsUploading(true)
    setImageStatus(null)
    try {
      const uploaded = await uploadProfileImage(selectedFile)
      sessionStorage.setItem('profile_img', uploaded.url)
      setPreviewUrl(uploaded.url)
      setSelectedFile(null)
      qc.invalidateQueries({ queryKey: ['me'] })
      setImageStatus({ type: 'success', message: 'Profile picture updated.' })
    } catch (err: any) {
      setImageStatus({
        type: 'error',
        message: err?.message ?? 'Upload failed. Please try again.',
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Forms
  const basicForm = useForm<AlumnusBasicEdit>({
    resolver: zodResolver(alumnusBasicEditSchema),
    defaultValues: {
      firstname: profile?.firstname ?? '',
      lastname: profile?.lastname ?? '',
      middlename: profile?.middlename ?? '',
      gender: (profile?.gender as any) ?? 'male',
      address: profile?.address ?? '',
      country: profile?.country ?? '',
      state: profile?.state ?? '',
      phone_num: profile?.phone_num ?? '',
      profilePic: undefined,
    },
  })

  const schoolForm = useForm<AlumnusSchoolEdit>({
    resolver: zodResolver(alumnusSchoolSchema),
    defaultValues: {
      matric_no: profile?.matric_no ?? '',
      department: profile?.department ?? '',
      faculty: profile?.faculty ?? '',
      grad_year: profile?.grad_year ? Number(profile.grad_year) : 2025,
      certificate: undefined,
    },
  })

  const profForm = useForm<
    z.input<typeof alumnusProfessionalSchema>,
    any,
    z.output<typeof alumnusProfessionalSchema>
  >({
    resolver: zodResolver(alumnusProfessionalSchema),
    defaultValues: {
      current_job_title: profile?.current_job_title ?? '',
      current_company: profile?.current_company ?? '',
      previous_comps: '',
      years_of_exp: profile?.years_of_exp ?? 0,
      industry: (profile?.industry as any) ?? '',
      description: profile?.description ?? '',
      linkedin_url: profile?.linkedin_url ?? '',
      x_url: profile?.x_url ?? '',
      instagram_url: profile?.instagram_url ?? '',
      facebook_url: profile?.facebook_url ?? '',
      github_url: profile?.github_url ?? '',
      website_url: profile?.website_url ?? '',
    },
  })

  // Re-sync forms when profile loads
  useEffect(() => {
    if (!profile) return
    basicForm.reset({
      firstname: profile.firstname,
      lastname: profile.lastname,
      middlename: profile.middlename ?? '',
      gender: (profile.gender as any) ?? 'male',
      address: profile.address ?? '',
      country: profile.country ?? '',
      state: profile.state ?? '',
      phone_num: profile.phone_num ?? '',
      profilePic: undefined,
    })
    schoolForm.reset({
      matric_no: profile.matric_no ?? '',
      department: profile.department ?? '',
      faculty: profile.faculty ?? '',
      grad_year: profile.grad_year ? Number(profile.grad_year) : 2025,
      certificate: undefined,
    })
    profForm.reset({
      current_job_title: profile.current_job_title ?? '',
      current_company: profile.current_company ?? '',
      previous_comps: '',
      years_of_exp: profile.years_of_exp ?? 0,
      industry: (profile.industry as any) ?? '',
      description: profile.description,
      linkedin_url: profile.linkedin_url ?? '',
      x_url: profile.x_url ?? '',
      instagram_url: profile.instagram_url ?? '',
      facebook_url: profile.facebook_url ?? '',
      github_url: profile.github_url ?? '',
      website_url: profile.website_url ?? '',
    })
  }, [profile?.sqid])

  const [basicSaving, setBasicSaving] = useState(false)
  const [schoolSaving, setSchoolSaving] = useState(false)
  const [profSaving, setProfSaving] = useState(false)

  const onBasicSubmit = async (data: AlumnusBasicEdit) => {
    setBasicSaving(true)
    try {
      await updateAlumnusProfile(data)
      qc.invalidateQueries({ queryKey: ['me'] })
      toast({ title: 'Saved', description: 'Basic information updated.' })
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.message ?? 'Failed to save.',
        variant: 'destructive',
      })
    } finally {
      setBasicSaving(false)
    }
  }

  const onSchoolSubmit = async (data: AlumnusSchoolEdit) => {
    setSchoolSaving(true)
    try {
      await updateAlumnusProfile({ ...data, grad_year: String(data.grad_year) })
      qc.invalidateQueries({ queryKey: ['me'] })
      toast({ title: 'Saved', description: 'School information updated.' })
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.message ?? 'Failed to save.',
        variant: 'destructive',
      })
    } finally {
      setSchoolSaving(false)
    }
  }

  const onProfSubmit = async (data: AlumnusProfEdit) => {
    setProfSaving(true)
    try {
      await updateAlumnusProfile(data)
      qc.invalidateQueries({ queryKey: ['me'] })
      toast({
        title: 'Saved',
        description: 'Professional information updated.',
      })
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.message ?? 'Failed to save.',
        variant: 'destructive',
      })
    } finally {
      setProfSaving(false)
    }
  }

  const watchedCountry = basicForm.watch('country')

  if (meLoading || !profile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <BackButton2 />
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton2 />
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your profile and preferences
          </p>
        </div>
      </div>

      {/* ─────────────────────── Profile Card ─────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Your personal, school, and professional information.
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={previewUrl || undefined} alt="Profile" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="max-w-xs text-sm"
                  onChange={handleFileChange}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="gap-1.5"
                  >
                    {isUploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <UploadCloud className="h-3.5 w-3.5" />
                    )}
                    {isUploading ? 'Uploading...' : 'Upload photo'}
                  </Button>
                  {selectedFile && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(null)
                        if (fileInputRef.current)
                          fileInputRef.current.value = ''
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                {imageStatus && (
                  <p
                    className={`text-xs font-medium ${imageStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}
                  >
                    {imageStatus.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="school">School</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
            </TabsList>

            {/* ── Basic Tab ── */}
            <TabsContent value="basic">
              <Form {...basicForm}>
                <form
                  onSubmit={basicForm.handleSubmit(onBasicSubmit)}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={basicForm.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicForm.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicForm.control}
                      name="middlename"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicForm.control}
                      name="phone_num"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={(val) => {
                              field.onChange(val)
                              basicForm.setValue('state', '')
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countryOptions.map((c) => (
                                <SelectItem key={c.value} value={c.value}>
                                  {c.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!watchedCountry}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {watchedCountry
                                ? stateOptions(watchedCountry).map((s) => (
                                    <SelectItem key={s} value={s}>
                                      {s}
                                    </SelectItem>
                                  ))
                                : []}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={basicSaving}
                      className="gap-1.5"
                    >
                      {basicSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {basicSaving ? 'Saving...' : 'Save basic info'}
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>

            {/* ── School Tab ── */}
            <TabsContent value="school">
              <Form {...schoolForm}>
                <form
                  onSubmit={schoolForm.handleSubmit(onSchoolSubmit)}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={schoolForm.control}
                      name="matric_no"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Matriculation number</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC/01/2345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={schoolForm.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={schoolForm.control}
                      name="faculty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Faculty</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={schoolForm.control}
                      name="grad_year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Graduation year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={Number(field.value) || ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : '',
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={schoolSaving}
                      className="gap-1.5"
                    >
                      {schoolSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {schoolSaving ? 'Saving...' : 'Save school info'}
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>

            {/* ── Professional Tab ── */}
            <TabsContent value="professional">
              <Form {...profForm}>
                <form
                  onSubmit={profForm.handleSubmit(onProfSubmit)}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={profForm.control}
                      name="current_job_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profForm.control}
                      name="current_company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profForm.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries.map((ind) => (
                                <SelectItem key={ind} value={ind}>
                                  {ind}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profForm.control}
                      name="years_of_exp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of experience</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              value={Number(field.value) || ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : 0,
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={profForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell others about yourself..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <p className="text-sm font-medium text-muted-foreground">
                    Social links
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(
                      [
                        'linkedin_url',
                        'x_url',
                        'instagram_url',
                        'facebook_url',
                        'github_url',
                        'website_url',
                      ] as const
                    ).map((name) => (
                      <FormField
                        key={name}
                        control={profForm.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">
                              {name.replace('_url', '').replace('_', ' ')}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <Separator />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={profSaving}
                      className="gap-1.5"
                    >
                      {profSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {profSaving ? 'Saving...' : 'Save professional info'}
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* ─────────────────────── Account Bank Card ─────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Account Bank</CardTitle>
          <CardDescription>
            Link a bank account to receive payouts from paid event tickets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaystackBankLink
            value={null}
            onLinked={(account) => {
              toast({
                title: 'Account linked',
                description: `${account.account_name} — ${account.bank_name}`,
              })
            }}
          />
        </CardContent>
      </Card>

      {/* ─────────────────────── Resumes Card ─────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Resumes</CardTitle>
          <CardDescription>
            Upload resumes to share with prospective employers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Resume upload will be available here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AlumnusSettings
