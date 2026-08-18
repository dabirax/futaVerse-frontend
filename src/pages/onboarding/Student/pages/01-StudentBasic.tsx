import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Country, State } from 'country-state-city'
import { useRouter } from '@tanstack/react-router'
import { LeftContainer } from '../../components/LeftContainer'
import { SignupStepIndicator } from '../../components/SignupStepIndicator'
import { BackButton } from '../../../../components/BackButtons'
import { useStudentStoreData } from '../hooks/useStudentStoreData'
import { studentBasicSchema } from '../lib/studentSchema'
import type { StudentBasicFormData } from '../lib/studentSchema'
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

const countryOptions = Country.getAllCountries().map((country) => ({
  label: `${country.name}`,
  value: country.isoCode,
  phoneCode: `+${country.phonecode}`,
}))

const stateOptions = (countryCode: string): Array<string> => {
  return State.getStatesOfCountry(countryCode).map((state) => state.name)
}

const StudentBasic = () => {
  const setData = useStudentStoreData((state) => state.setData)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const _stored = useStudentStoreData.getState()

  const form = useForm<StudentBasicFormData>({
    resolver: zodResolver(studentBasicSchema),
    defaultValues: {
      firstname: _stored.firstname || '',
      lastname: _stored.lastname || '',
      middlename: _stored.middlename || '',
      gender: _stored.gender,
      address: _stored.address || '',
      country: _stored.country || '',
      state: _stored.state || '',
      phone_num: _stored.phone_num || '',
      email: _stored.email || '',
      password: _stored.password || '',
      confirmPassword: _stored.confirmPassword || '',
      profilePic: _stored.profilePic || null,
    },
  })

  const router = useRouter()

  const onSubmit = (data: StudentBasicFormData) => {
    setData(data)
    router.navigate({ to: '/signup/studentSchool' })
  }

  const selectedCountry = form.watch('country')
  const selectedPhoneCode = countryOptions.find(
    (country) => country.value === selectedCountry,
  )?.phoneCode

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <BackButton />
          </div>

          <SignupStepIndicator
            steps={[{ label: 'Personal' }, { label: 'School' }, { label: 'Professional' }]}
            currentStep={0}
            role="student"
          />

          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-semibold text-ink tracking-tight">
              Personal Information
            </h1>
            <p className="text-ink-soft text-sm mt-1.5">
              Tell us about yourself
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        First Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ade"
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
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Last Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Saliu"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="middlename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Middle Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Chukwudi"
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Gender <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-xs bg-surface border border-line text-ink">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xs border border-line bg-surface">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St"
                        className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Country <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-xs bg-surface border border-line text-ink">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-75 rounded-xs border border-line bg-surface">
                          {countryOptions.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                            >
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        State <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedCountry}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-xs bg-surface border border-line text-ink">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-75 rounded-xs border border-line bg-surface">
                          {stateOptions(selectedCountry).map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone_num"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Phone Number <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="h-10 flex items-center px-3 bg-surface-2 border border-line border-r-0 rounded-l-xs text-xs text-ink-soft font-mono">
                          {selectedPhoneCode || '+123'}
                        </span>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="h-10 rounded-l-none rounded-r-xs border-l-0 bg-surface border-line text-ink placeholder:text-ink-faint focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Email <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@example.com"
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
                name="profilePic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      Profile Picture
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Password <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint pr-10 focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink font-medium text-sm">
                        Confirm Password{' '}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="********"
                            className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint pr-10 focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-indigo text-white rounded-sm px-8 h-10 font-medium hover:bg-indigo-hover transition-colors"
              >
                Next Step
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default StudentBasic
