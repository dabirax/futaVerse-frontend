import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Country, State } from 'country-state-city'
import { useRouter } from '@tanstack/react-router'
import { AuthLayout } from '../../components/AuthLayout'
import { BackButton } from '../../../../components/BackButtons'
import { SignupStepIndicator } from '../../components/SignupStepIndicator'
import { useAlumnusStoreData } from '../hooks/useAlumnusStoreData'
import { alumnusBasicSchema } from '../lib/alumnusSchema'
import type { AlumnusBasicFormData } from '../lib/alumnusSchema'
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

const AlumnusBasic = () => {
  const setData = useAlumnusStoreData((state) => state.setData)
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const _stored = useAlumnusStoreData.getState()

  const form = useForm<AlumnusBasicFormData>({
    resolver: zodResolver(alumnusBasicSchema),
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

  const onSubmit = (data: AlumnusBasicFormData) => {
    setData(data)
    router.navigate({ to: '/signup/alumnusSchool' })
  }

  const selectedCountry = form.watch('country')
  const selectedPhoneCode = countryOptions.find(
    (country) => country.value === selectedCountry,
  )?.phoneCode

  return (
<<<<<<< HEAD
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
            currentStep={0}
            role="alumnus"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
=======
    <AuthLayout>
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
            Sign Up
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Join the Futaverse alumni network
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
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
<<<<<<< HEAD
                      <FormLabel className="text-ink font-medium text-sm">
                        First Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ade"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-maroon focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
=======
                      <FormLabel className="text-slate-600 font-medium">
                        First Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ade" {...field} />
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
<<<<<<< HEAD
=======
              </motion.div>
              <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
<<<<<<< HEAD
                      <FormLabel className="text-ink font-medium text-sm">
                        Last Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Saliu"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-maroon focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
=======
                      <FormLabel className="text-slate-600 font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Saliu" {...field} />
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
<<<<<<< HEAD
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
=======
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                <FormField
                  control={form.control}
                  name="middlename"
                  render={({ field }) => (
                    <FormItem>
<<<<<<< HEAD
                      <FormLabel className="text-ink font-medium text-sm">
                        Middle Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Chukwudi"
                          className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-maroon focus-visible:ring-focus focus-visible:ring-[3px]"
                          {...field}
                        />
=======
                      <FormLabel className="text-slate-600 font-medium">
                        Middle Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Chukwudi" {...field} />
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
<<<<<<< HEAD
=======
              </motion.div>
              <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
<<<<<<< HEAD
                      <FormLabel className="text-ink font-medium text-sm">
                        Gender <span className="text-destructive">*</span>
=======
                      <FormLabel className="text-slate-600 font-medium">
                        Gender <span className="text-red-500">*</span>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
<<<<<<< HEAD
                          <SelectTrigger className="h-10 rounded-xs bg-surface border border-line text-ink">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xs border border-line bg-surface">
=======
                          <SelectTrigger className="h-12 rounded-xl bg-white/50 border-slate-200">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
<<<<<<< HEAD
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
=======
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
<<<<<<< HEAD
                      <FormLabel className="text-ink font-medium text-sm">
                        Password <span className="text-destructive">*</span>
=======
                      <FormLabel className="text-slate-600 font-medium">
                        Password <span className="text-red-500">*</span>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
<<<<<<< HEAD
                            className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint pr-10 focus-visible:border-maroon focus-visible:ring-focus focus-visible:ring-[3px]"
=======
                            className="h-12 rounded-xl bg-white/50 border-slate-200 pr-12"
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
<<<<<<< HEAD
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
=======
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
<<<<<<< HEAD
=======
              </motion.div>
              <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
<<<<<<< HEAD
                      <FormLabel className="text-ink font-medium text-sm">
                        Confirm Password{' '}
                        <span className="text-destructive">*</span>
=======
                      <FormLabel className="text-slate-600 font-medium">
                        Confirm Password <span className="text-red-500">*</span>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="********"
<<<<<<< HEAD
                            className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint pr-10 focus-visible:border-maroon focus-visible:ring-focus focus-visible:ring-[3px]"
=======
                            className="h-12 rounded-xl bg-white/50 border-slate-200 pr-12"
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((p) => !p)}
<<<<<<< HEAD
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
=======
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
<<<<<<< HEAD
              </div>

=======
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
<<<<<<< HEAD
                    <FormLabel className="text-ink font-medium text-sm">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St"
                        className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-maroon focus-visible:ring-focus focus-visible:ring-[3px]"
                        {...field}
                      />
=======
                    <FormLabel className="text-slate-600 font-medium">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
<<<<<<< HEAD

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
=======
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
<<<<<<< HEAD
                      <FormLabel className="text-ink font-medium text-sm">
                        Country <span className="text-destructive">*</span>
=======
                      <FormLabel className="text-slate-600 font-medium">
                        Country <span className="text-red-500">*</span>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
<<<<<<< HEAD
                          <SelectTrigger className="h-10 rounded-xs bg-surface border border-line text-ink">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-75 rounded-xs border border-line bg-surface">
=======
                          <SelectTrigger className="h-12 rounded-xl bg-white/50 border-slate-200">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-75 rounded-xl">
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
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
<<<<<<< HEAD
=======
              </motion.div>
              <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
<<<<<<< HEAD
                      <FormLabel className="text-ink font-medium text-sm">
                        State <span className="text-destructive">*</span>
=======
                      <FormLabel className="text-slate-600 font-medium">
                        State <span className="text-red-500">*</span>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedCountry}
                      >
                        <FormControl>
<<<<<<< HEAD
                          <SelectTrigger className="h-10 rounded-xs bg-surface border border-line text-ink">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-75 rounded-xs border border-line bg-surface">
=======
                          <SelectTrigger className="h-12 rounded-xl bg-white/50 border-slate-200">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-75 rounded-xl">
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
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
<<<<<<< HEAD
              </div>

=======
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
              <FormField
                control={form.control}
                name="phone_num"
                render={({ field }) => (
                  <FormItem>
<<<<<<< HEAD
                    <FormLabel className="text-ink font-medium text-sm">
                      Phone Number <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="h-10 flex items-center px-3 bg-surface-2 border border-line border-r-0 rounded-l-xs text-xs text-ink-soft font-mono">
=======
                    <FormLabel className="text-slate-600 font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center group">
                        <span className="h-12 flex items-center px-4 bg-slate-50 border border-slate-200 border-r-0 rounded-l-xl text-sm text-slate-500 italic font-medium group-focus-within:border-primary">
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                          {selectedPhoneCode || '+123'}
                        </span>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
<<<<<<< HEAD
                          className="h-10 rounded-l-none rounded-r-xs border-l-0 bg-surface border-line text-ink placeholder:text-ink-faint focus-visible:border-maroon focus-visible:ring-focus focus-visible:ring-[3px]"
=======
                          className="h-12 rounded-l-none rounded-r-xl border-l-0 bg-white/50 border-slate-200 group-focus-within:border-primary"
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
<<<<<<< HEAD

=======
            </motion.div>

            <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
<<<<<<< HEAD
                    <FormLabel className="text-ink font-medium text-sm">
                      Email <span className="text-destructive">*</span>
=======
                    <FormLabel className="text-slate-600 font-medium">
                      Email <span className="text-red-500">*</span>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@example.com"
<<<<<<< HEAD
                        className="h-10 rounded-xs bg-surface border border-line text-ink placeholder:text-ink-faint focus-visible:border-maroon focus-visible:ring-focus focus-visible:ring-[3px]"
=======
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
<<<<<<< HEAD

=======
            </motion.div>

            <motion.div variants={itemVariants}>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
              <FormField
                control={form.control}
                name="profilePic"
                render={({ field }) => (
                  <FormItem>
<<<<<<< HEAD
                    <FormLabel className="text-ink font-medium text-sm">
=======
                    <FormLabel className="text-slate-600 font-medium">
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
                      Profile Picture
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
<<<<<<< HEAD
                        className="h-10 rounded-xs bg-surface border border-line text-ink file:mr-3 file:py-1 file:px-3 file:rounded-xs file:border-0 file:text-xs file:font-medium file:bg-maroon-soft file:text-maroon hover:file:bg-maroon/10 cursor-pointer"
=======
                        className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 hover:file:bg-p/20 cursor-pointer flex items-center file:mt-1"
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
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
<<<<<<< HEAD

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  className="bg-maroon text-white rounded-sm px-8 h-10 font-medium hover:bg-maroon-hover transition-colors"
                >
                  Next Step
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
=======
            </motion.div>

            <Button
              type="submit"
              className="w-full md:w-auto bg-primary text-white px-10 h-12 rounded-xl shadow-lg shadow-purple-200 transition-all flex ml-auto hover:scale-105 duration-500"
            >
              Next Step
            </Button>
          </motion.form>
        </Form>
      </motion.div>
    </AuthLayout>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
  )
}

export default AlumnusBasic
