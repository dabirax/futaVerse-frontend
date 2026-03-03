import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from '@tanstack/react-router'
import { BackButton } from '../../../../components/BackButton'
import {
  useAlumnusStoreData,
  useHasHydrated,
} from '../hooks/useAlumnusStoreData'
import { LeftContainer } from '../../components/LeftContainer'
import { alumnusSchoolSchema } from '../lib/alumnusSchema'
import type { z } from 'zod'
import Logo from '@/components/logo'
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
import { containerVariants, itemVariants } from '@/animationVariants'
import { MoveLeft } from 'lucide-react'

const AlumnusSchool = () => {
  // Type definitions for form input and output based on the schema
  type AlumnusSchoolInput = z.input<typeof alumnusSchoolSchema>
  type AlumnusSchoolOutput = z.output<typeof alumnusSchoolSchema>

  // Initialize the form with Zod resolver and default values
  const form = useForm<AlumnusSchoolInput, any, AlumnusSchoolOutput>({
    resolver: zodResolver(alumnusSchoolSchema),
    defaultValues: {
      matric_no: '',
      department: '',
      faculty: '',
      grad_year: 2025,
      certificate: null,
    },
  })

  // Extract user data from the alumnus store for validation
  const firstName = useAlumnusStoreData((state) => state.firstname)
  const lastName = useAlumnusStoreData((state) => state.lastname)
  const middleName = useAlumnusStoreData((state) => state.middlename)
  const gender = useAlumnusStoreData((state) => state.gender)
  const address = useAlumnusStoreData((state) => state.address)
  const country = useAlumnusStoreData((state) => state.country)
  const stateOfOrigin = useAlumnusStoreData((state) => state.state)
  const phone = useAlumnusStoreData((state) => state.phone_num)
  const email = useAlumnusStoreData((state) => state.email)
  const password = useAlumnusStoreData((state) => state.password)
  const confirmPassword = useAlumnusStoreData((state) => state.confirmPassword)
  const profilePic = useAlumnusStoreData((state) => state.profilePic)

  // Store setter function and router hook
  const setData = useAlumnusStoreData((state) => state.setData)
  const router = useRouter()

  // Handle form submission: log data, update store, navigate to next step
  const onSubmit = (data: AlumnusSchoolOutput) => {
    setData(data)
    router.navigate({ to: '/signup/alumnusProfessional' })
  }

  // Check if the store has hydrated
  const hasHydrated = useHasHydrated()

  // Redirect to basic info step if required fields are missing. For data persistence.
  useEffect(() => {
    if (!hasHydrated) return
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !country ||
      !stateOfOrigin ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      router.navigate({ to: '/signup/alumnusBasic' })
    }
  }, [
    firstName,
    lastName,
    middleName,
    gender,
    address,
    country,
    stateOfOrigin,
    phone,
    email,
    password,
    confirmPassword,
    profilePic,
    router,
    useAlumnusStoreData.persist.hasHydrated,
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
                School Information
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Tell us about your time at FUTA
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
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="matric_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Matriculation Number{' '}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ABC/01/2345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Department <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your department"
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
                    name="faculty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Faculty <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your faculty" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="grad_year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Graduation Year{' '}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your graduation year"
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
                    name="certificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Certificate (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*,application/pdf"
                            className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 hover:file:bg-primary/20 cursor-pointer flex items-center file:mt-1"
                            onChange={(e) =>
                              field.onChange(
                                e.target.files ? e.target.files[0] : null,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between items-center pt-4"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-slate-500 hover:text-primary transition-colors"
                    onClick={() => router.history.back()}
                  >
                    <MoveLeft strokeWidth={3} />
                    Back
                  </Button>

                  <Button
                    type="submit"
                    className="bg-primary text-white px-10 h-12 rounded-xl shadow-lg shadow-purple-200 transition-all hover:scale-105 duration-500"
                  >
                    Next Step
                  </Button>
                </motion.div>
              </motion.form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AlumnusSchool
