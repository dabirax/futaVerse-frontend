import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AlertCircle, WifiOff } from 'lucide-react'
import { LeftContainer } from '../../components/LeftContainer'
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
import Logo from '@/components/logo'
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
  const form = useForm<
    StudentProfessionalFormInput,
    any,
    StudentProfessionalFormOutput
  >({
    resolver: zodResolver(studentProfessionalSchema),
    defaultValues: {
      skills: [],
      description: '',
      linkedin_url: '',
      x_url: '',
      instagram_url: '',
      facebook_url: '',
      github_url: '',
      website_url: '',
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

  const setSignupEmail = useSignupOTPStore((s) => s.setEmail)
  const setUserType = useSignupOTPStore((s) => s.setUserType)

  // Handle Submit
  const onSubmit = async (data: StudentProfessionalFormData) => {
    setServerError(null)
    setIsLoading(true)

    setSignupEmail(email || '')
    setUserType('student')

    const payload = {
      email,
      password,
      profile: {
        firstname,
        lastname,
        middlename,
        gender,
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
        previous_comps: data.skills,
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
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <LeftContainer />
        <div className="max-w-md m-auto w-full flex flex-col items-center py-4">
          <div className="flex items-center justify-between w-full text-primary-dark text-2xl px-2">
            <div className="mt-1">
              <BackButton />
            </div>
            <Logo />
          </div>
          <div className="px-5">
            <p className="text-xl font-semibold tracking-tight text-center">
              Professional Information
            </p>

            <Form {...form}>
              <form
                className="w-full space-y-5 mt-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your skills"
                          className="w-full"
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
                      <FormLabel>Personal Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Describe yourself"
                          className="w-full h-20 border border-gray-300 rounded-md p-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className=" grid grid-cols-2 gap-4 ">
                  <FormField
                    control={form.control}
                    name="linkedin_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn </FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="LinkedIn profile URL"
                            className="w-full"
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
                        <FormLabel>X </FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="X profile URL"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" grid grid-cols-2 gap-4 ">
                  <FormField
                    control={form.control}
                    name="instagram_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="Instagram profile URL"
                            className="w-full"
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
                        <FormLabel>Facebook URL</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="Facebook profile URL"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" grid grid-cols-2 gap-4 ">
                  <FormField
                    control={form.control}
                    name="github_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="GitHub profile URL"
                            className="w-full"
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
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="Your website URL"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between py-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ transformOrigin: 'left center' }}
                  >
                    <Button
                      className="bg-primary flex ml-auto"
                      onClick={() => {
                        router.history.back()
                      }}
                    >
                      Back
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ transformOrigin: 'right center' }}
                  >
                    <Button
                      type="submit"
                      className="bg-primary flex ml-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                  </motion.div>
                </div>
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex gap-3"
                  >
                    <div className="shrink-0 mt-0.5 text-red-500">
                      {serverError.isNetwork ? (
                        <WifiOff size={16} />
                      ) : (
                        <AlertCircle size={16} />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-red-700">
                        {serverError.message}
                      </p>
                      {serverError.hint && (
                        <p className="text-xs text-red-500">{serverError.hint}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfessional
