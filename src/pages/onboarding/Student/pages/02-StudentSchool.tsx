// External libraries and hooks
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { LeftContainer } from '../../components/LeftContainer'
import { SignupStepIndicator } from '../../components/SignupStepIndicator'
import { BackButton } from '../../../../components/BackButtons'
import {
  useHasHydrated,
  useStudentStoreData,
} from '../hooks/useStudentStoreData'
import { studentSchoolSchema } from '../lib/studentSchema'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const StudentSchool = () => {
  // Type definitions for form input and output based on the schema
  type StudentSchoolInput = z.input<typeof studentSchoolSchema>
  type StudentSchoolOutput = z.output<typeof studentSchoolSchema>

  // Initialize the form with Zod resolver and default values
  const form = useForm<StudentSchoolInput, any, StudentSchoolOutput>({
    resolver: zodResolver(studentSchoolSchema),
    defaultValues: (() => {
      const s = useStudentStoreData.getState()
      return {
        matric_no: s.matric_no || '',
        department: s.department || '',
        faculty: s.faculty || '',
        expected_grad_year: s.expected_grad_year ?? 2025,
        level: s.level,
        cgpa: s.cgpa,
        certificate: s.certificate ?? null,
      }
    })(),
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
            currentStep={1}
            role="student"
          />

          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-semibold text-ink tracking-tight">
              School Information
            </h1>
            <p className="text-ink-soft text-sm mt-1.5">
              Provide your current academic details at FUTA
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="matric_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Matriculation Number{' '}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ABC/01/2345"
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Department <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your department"
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
                name="faculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Faculty <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your faculty"
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
                name="expected_grad_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Expected Graduation Year{' '}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your expected graduation year"
                        className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Level <span className="text-destructive">*</span>
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
                          <SelectTrigger className="h-10 rounded-xs bg-surface border border-line text-ink">
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xs border border-line bg-surface">
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

                <FormField
                  control={form.control}
                  name="cgpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        CGPA <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="5"
                          placeholder="e.g. 4.32"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
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
              </div>

              <FormField
                control={form.control}
                name="certificate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Certificate (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,application/pdf"
                        className="h-10 rounded-xs bg-surface border border-line text-ink file:mr-3 file:py-1 file:px-3 file:rounded-xs file:border-0 file:text-xs file:font-medium file:bg-indigo-soft file:text-indigo hover:file:bg-indigo/10 cursor-pointer"
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
                  className="bg-indigo text-white rounded-sm px-8 h-10 font-medium hover:bg-indigo-hover transition-colors"
                >
                  Next Step
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default StudentSchool
