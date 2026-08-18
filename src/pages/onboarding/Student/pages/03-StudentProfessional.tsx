import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AlertCircle, WifiOff } from 'lucide-react'
import { LeftContainer } from '../../components/LeftContainer'
import { SignupStepIndicator } from '../../components/SignupStepIndicator'
import { BackButton } from '../../../../components/BackButtons'
import { useSignupOTPStore } from '../../hooks/useSignupOTPStore'
import {
  useHasHydrated,
  useStudentStoreData,
} from '../hooks/useStudentStoreData'
import { studentProfessionalSchema } from '../lib/studentSchema'
import type { StudentProfessionalFormData } from '../lib/studentSchema'
import type { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { uploadProfileImage } from '@/services/uploads'

const StudentProfessional = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<{
    message: string
    hint?: string
    isNetwork?: boolean
  } | null>(null)

  type StudentProfessionalFormInput = z.input<typeof studentProfessionalSchema>
  type StudentProfessionalFormOutput = z.output<
    typeof studentProfessionalSchema
  >

  // Form initialization
  const _s = useStudentStoreData.getState()

  const form = useForm<
    StudentProfessionalFormInput,
    any,
    StudentProfessionalFormOutput
  >({
    resolver: zodResolver(studentProfessionalSchema),
    defaultValues: {
      skills: Array.isArray(_s.skills)
        ? (_s.skills as Array<string>).join(', ')
        : _s.skills || '',
      description: _s.description || '',
      linkedin_url: _s.linkedin_url || '',
      x_url: _s.x_url || '',
      instagram_url: _s.instagram_url || '',
      facebook_url: _s.facebook_url || '',
      github_url: _s.github_url || '',
      website_url: _s.website_url || '',
    },
  })

  const router = useRouter()

  // Get Stored Data from Zustand
  const {
    firstname,
    lastname,
    middlename,
    gender,
    address,
    country,
    state,
    phone_num,
    email,
    password,
    confirmPassword,
    profilePic,
    matric_no,
    department,
    faculty,
    expected_grad_year,
    level,
    cgpa,
  } = useStudentStoreData.getState()

  const setData = useStudentStoreData((state) => state.setData)
  const setSignupEmail = useSignupOTPStore((s) => s.setEmail)
  const setUserType = useSignupOTPStore((s) => s.setUserType)

  // Handle Submit
  const onSubmit = async (data: StudentProfessionalFormData) => {
    setServerError(null)
    setIsLoading(true)

    setSignupEmail(email || '')
    setUserType('student')

    let profileImgUrl: string | undefined
    if (profilePic instanceof File) {
      try {
        const uploaded = await uploadProfileImage(profilePic)
        profileImgUrl = uploaded.url
      } catch (err: any) {
        setServerError({
          message: err?.message ?? 'Profile picture upload failed.',
          hint: 'Please try again with a different image.',
        })
        setIsLoading(false)
        return
      }
    }

    const payload = {
      email,
      password,
      profile: {
        firstname,
        lastname,
        middlename,
        gender: gender ? gender.charAt(0) + gender.slice(1) : gender,
        phone_num,
        address,
        street: '',
        city: '',
        state,
        country,
        matric_no,
        department,
        faculty,
        expected_grad_year,
        level,
        cgpa,
        profile_img: profileImgUrl,
        previous_comps: data.skills
          ? data.skills
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        description: data.description,
        linkedin_url: data.linkedin_url,
        company_linkedin_url: '',
        github_url: data.github_url,
        website_url: data.website_url,
        company_website_url: '',
        x_url: data.x_url,
        instagram_url: data.instagram_url,
        facebook_url: data.facebook_url,
      },
    }

    console.log(payload)

    setData(data)

    try {
      await api.post('/api/auth/signup/student', payload)
      router.navigate({ to: '/signup/otp' })
    } catch (err: any) {
      const status = err.response?.status
      const data = err.response?.data

      if (!err.response) {
        setServerError({
          message: "Can't reach the server.",
          hint: 'Check your internet connection and try again.',
          isNetwork: true,
        })
      } else if (status === 409) {
        setServerError({
          message: data?.detail ?? 'An account with this email already exists.',
          hint: 'Try logging in instead, or use a different email address.',
        })
      } else if (status === 400) {
        const detail =
          data?.detail ??
          data?.email?.[0] ??
          data?.password?.[0] ??
          data?.non_field_errors?.[0] ??
          "Some of the information you entered doesn't look right."
        setServerError({
          message: detail,
          hint: 'Please go back and review your details.',
        })
      } else if (status === 429) {
        setServerError({
          message: 'Too many signup attempts.',
          hint: 'Please wait a few minutes before trying again.',
        })
      } else {
        setServerError({
          message: 'Something went wrong on our end.',
          hint: 'Please try again in a moment.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Not allowing users to skip steps (or pages) during the onboarding
  const hasHydrated = useHasHydrated()

  useEffect(() => {
    if (!hasHydrated) return
    if (
      !firstname ||
      !lastname ||
      !gender ||
      !country ||
      !state ||
      !phone_num ||
      !email ||
      !password ||
      !confirmPassword ||
      !matric_no ||
      !department ||
      !faculty ||
      !expected_grad_year
    ) {
      router.navigate({ to: '/signup/StudentSchool' })
    }
  }, [
    firstname,
    lastname,
    middlename,
    gender,
    address,
    country,
    state,
    phone_num,
    email,
    password,
    confirmPassword,
    profilePic,
    matric_no,
    department,
    faculty,
    expected_grad_year,
    router,
    hasHydrated,
  ])

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <BackButton />
          </div>

          <SignupStepIndicator
            steps={[
              { label: 'Personal' },
              { label: 'School' },
              { label: 'Professional' },
            ]}
            currentStep={2}
            role="student"
          />

          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-semibold text-ink tracking-tight">
              Professional Information
            </h1>
            <p className="text-ink-soft text-sm mt-1.5">
              Tell us about your skills and social presence
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Skills
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your skills"
                        className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
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
                    <FormLabel className="text-ink font-medium text-sm">
                      Personal Description
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Describe yourself"
                        className="w-full h-20 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint p-3 text-sm focus-visible:outline-none focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px] transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="linkedin_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        LinkedIn
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="LinkedIn profile URL"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="x_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        X
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="X profile URL"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="instagram_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Instagram URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Instagram profile URL"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facebook_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Facebook URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Facebook profile URL"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="github_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        GitHub URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="GitHub profile URL"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Website URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Your website URL"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-ink-soft hover:text-ink"
                  onClick={() => router.history.back()}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-indigo text-white rounded-sm px-8 h-10 font-medium hover:bg-indigo-hover transition-colors"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>

              {serverError && (
                <div className="rounded-xs bg-destructive-soft border border-destructive px-4 py-3 flex gap-3 mt-4">
                  <div className="shrink-0 mt-0.5 text-destructive">
                    {serverError.isNetwork ? (
                      <WifiOff size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-destructive">
                      {serverError.message}
                    </p>
                    {serverError.hint && (
                      <p className="text-xs text-destructive/70">
                        {serverError.hint}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default StudentProfessional
