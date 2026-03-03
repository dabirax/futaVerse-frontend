import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { BackButton } from '../../../../components/BackButton'
import { LeftContainer } from '../../components/LeftContainer'
import {
  useAlumnusStoreData,
  useHasHydrated,
} from '../hooks/useAlumnusStoreData'
import { alumnusProfessionalSchema } from '../lib/alumnusSchema'
import { useSignupOTPStore } from '../../hooks/useSignupOTPStore'
import type { AlumnusProfessionalFormData } from '../lib/alumnusSchema'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/lib/api'
import { containerVariants, itemVariants } from '@/animationVariants'
import { MoveLeft } from 'lucide-react'

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

const AlumnusProfessional = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')

  type AlumnusProfessionalFormInput = z.input<typeof alumnusProfessionalSchema>
  type AlumnusProfessionalFormOutput = z.output<
    typeof alumnusProfessionalSchema
  >

  // Form in bnnnitialization
  const form = useForm<
    AlumnusProfessionalFormInput,
    any,
    AlumnusProfessionalFormOutput
  >({
    resolver: zodResolver(alumnusProfessionalSchema),
    defaultValues: {
      current_job_title: '',
      current_company: '',
      previous_comps: [],
      years_of_exp: 0,
      description: '',
      linkedin_url: '',
      x_url: '',
      instagram_url: '',
      facebook_url: '',
      github_url: '',
      website_url: '',
      industry: '',
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
    grad_year,
  } = useAlumnusStoreData.getState()

  const setSignupEmail = useSignupOTPStore((s) => s.setEmail)
  const setUserType = useSignupOTPStore((s) => s.setUserType)

  // Handle Submit
  const onSubmit = async (data: AlumnusProfessionalFormData) => {
    setIsError('')
    setIsLoading(true)
    console.log('Form errors:', form.formState.errors)

    setSignupEmail(email || '')
    setUserType('alumnus')

    // Payload Preparation
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
        grad_year,
        previous_comps: data.previous_comps,
        current_job_title: data.current_job_title,
        current_company: data.current_company,
        years_of_exp: data.years_of_exp,
        industry: data.industry,
        description: data.description,
        linkedin_url: data.linkedin_url,
        company_linkedin_url: '',
        github_url: data.github_url,
        website_url: data.website_url,
        company_website_url: '',
        x_url: data.x_url,
        instagram_url: data.instagram_url,
        facebook_url: data.facebook_url,
        // profile_img: profilePic,
      },
    }
    console.log(payload)

    try {
      const res = await api.post('/api/auth/signup/alumnus', payload)
      console.log('✅ Signup successful:', res.data)
      router.navigate({ to: '/signup/otp' })
    } catch (err: any) {
      console.error('Signup failed:', err.response?.data || err.message)
    }
  }

  // Not allowing users to skip steps (or pages) during the onboarding
  const hasHydrated = useHasHydrated()

  useEffect(() => {
    console.log('useEffect triggered, hasHydrated:', hasHydrated)
    console.log('Store values check:', {
      firstname,
      lastname,
      gender,
      country,
      state,
      phone_num,
      email,
      password,
      confirmPassword,
      matric_no,
      department,
      faculty,
      grad_year,
    })
    if (!hasHydrated) {
      console.log('Not hydrated yet, returning')
      return
    }
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
      !grad_year
    ) {
      console.log(
        'Missing required fields, navigating to /signup/alumnusSchool',
      )
      router.navigate({ to: '/signup/alumnusSchool' })
    } else {
      console.log('All required fields present, staying on page')
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
    grad_year,
    router,
    hasHydrated,
  ])

  return (
    <div className="flex flex-col mlg:flex-row w-full max-w-screen mlg:min-h-145 h-screen mlg:h-auto">
      <div className="w-full h-full grid lg:grid-cols-2 z-10">
        <LeftContainer />

        <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 md:p-12"
          >
            <div className="flex items-center justify-between w-full mb-8">
              <div className="transition-transform hover:-translate-x-1">
                <BackButton />
              </div>
              <Logo />
            </div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-primary-dark">
                Professional Information
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Tell us about your career and social presence
              </p>
            </div>

            <Form {...form}>
              <motion.form
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="current_job_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Current Job Title
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="current_company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Current Company
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Google" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="previous_comps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Previous Companies
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Microsoft, Meta..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Exp and Industry Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="years_of_exp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Years of Experience
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="h-12 rounded-xl bg-white/50 border-slate-200"
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
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Industry Sector{' '}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-white/50 border-slate-200">
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl">
                              {industries.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Personal Description
                        </FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Describe yourself"
                            className="w-full h-28 border border-slate-200 bg-white/50 rounded-xl p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="linkedin_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            LinkedIn
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://linkedin.com/in/..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="github_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            GitHub
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://github.com/..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between pt-4"
                >
                  <Button
                    type="button"
                    className="bg-primary text-white px-10 h-12 rounded-xl shadow-lg shadow-purple-200 transition-all hover:scale-105 duration-500"
                    onClick={() => router.history.back()}
                  >
                    <MoveLeft strokeWidth={3} />
                    Back
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary text-white px-10 h-12 rounded-xl shadow-lg shadow-purple-200 transition-all hover:scale-105 duration-500"
                  >
                    {isLoading ? 'Submitting...' : 'Complete Profile'}
                  </Button>
                </motion.div>

                {isError && (
                  <p className="text-red-500 text-sm text-center font-medium">
                    {isError}
                  </p>
                )}
              </motion.form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AlumnusProfessional
