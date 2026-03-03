// External libraries and hooks
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from '@tanstack/react-router'
import { LeftContainer } from '../../components/LeftContainer'
import { BackButton } from '../../../../components/BackButton'
import {
  useHasHydrated,
  useStudentStoreData,
} from '../hooks/useStudentStoreData'
import { studentSchoolSchema } from '../lib/studentSchema'
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
import { containerVariants, itemVariants } from '@/animationVariants'

const StudentSchool = () => {
  // Type definitions for form input and output based on the schema
  type StudentSchoolInput = z.input<typeof studentSchoolSchema>
  type StudentSchoolOutput = z.output<typeof studentSchoolSchema>

  // Initialize the form with Zod resolver and default values
  const form = useForm<StudentSchoolInput, any, StudentSchoolOutput>({
    resolver: zodResolver(studentSchoolSchema),
    defaultValues: {
      matric_no: '',
      department: '',
      faculty: '',
      expected_grad_year: 2025,
      level: undefined,
      cgpa: undefined,
      certificate: null,
    },
  })

  // Extract user data from the Student store for validation
  const firstName = useStudentStoreData((state) => state.firstname)
  const lastName = useStudentStoreData((state) => state.lastname)
  const middleName = useStudentStoreData((state) => state.middlename)
  const gender = useStudentStoreData((state) => state.gender)
  const address = useStudentStoreData((state) => state.address)
  const country = useStudentStoreData((state) => state.country)
  const stateOfOrigin = useStudentStoreData((state) => state.state)
  const phone = useStudentStoreData((state) => state.phone_num)
  const email = useStudentStoreData((state) => state.email)
  const password = useStudentStoreData((state) => state.password)
  const confirmPassword = useStudentStoreData((state) => state.confirmPassword)
  const profilePic = useStudentStoreData((state) => state.profilePic)

  // Store setter function and router hook
  const setData = useStudentStoreData((state) => state.setData)
  const router = useRouter()

  // Handle form submission: log data, update store, navigate to next step
  const onSubmit = (data: StudentSchoolOutput) => {
    setData(data)
    router.navigate({ to: '/signup/StudentProfessional' })
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
      router.navigate({ to: '/signup/StudentBasic' })
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
    useStudentStoreData.persist.hasHydrated,
  ])

  return (
    <div className="flex flex-col mlg:flex-row w-full max-w-screen mlg:min-h-145 h-screen mlg:h-auto bg-[#fafafa] relative overflow-hidden">
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
                Provide your current academic details at FUTA
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
                    name="expected_grad_year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Expected Graduation Year{' '}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your expected graduation year"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Level <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                            defaultValue={
                              field.value ? String(field.value) : undefined
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-white/50 border-slate-200">
                                <SelectValue placeholder="Select Level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="100">100 Level</SelectItem>
                              <SelectItem value="200">200 Level</SelectItem>
                              <SelectItem value="300">300 Level</SelectItem>
                              <SelectItem value="400">400 Level</SelectItem>
                              <SelectItem value="500">500 Level</SelectItem>
                              <SelectItem value="600">600 Level</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="cgpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            CGPA <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              max="5"
                              placeholder="e.g. 4.32"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
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
                            className="h-12 rounded-xl bg-white/50 border-slate-200 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 hover:file:bg-primary/20 cursor-pointer flex items-center file:mt-1"
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

export default StudentSchool
