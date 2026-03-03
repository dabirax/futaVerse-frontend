import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Country, State } from 'country-state-city'
import { useRouter } from '@tanstack/react-router'
import { LeftContainer } from '../../components/LeftContainer'
import { BackButton } from '../../../../components/BackButton'
import { useStudentStoreData } from '../hooks/useStudentStoreData'
import { studentBasicSchema } from '../lib/studentSchema'
import type { StudentBasicFormData } from '../lib/studentSchema'
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

  const form = useForm<StudentBasicFormData>({
    resolver: zodResolver(studentBasicSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      middlename: '',
      gender: undefined,
      address: '',
      country: '',
      state: '',
      phone_num: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePic: null,
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
                Sign Up
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Join the Futaverse student community
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
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            First Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Last Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="middlename"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Middle Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Jane" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Gender <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-white/50 border-slate-200">
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
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
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Country <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-white/50 border-slate-200">
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-75 rounded-xl">
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
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            State <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!selectedCountry}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-white/50 border-slate-200">
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-75 rounded-xl">
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
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="phone_num"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Phone Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center group">
                            <span className="h-12 flex items-center px-4 bg-slate-50 border border-slate-200 border-r-0 rounded-l-xl text-sm text-slate-500 italic font-medium">
                              {selectedPhoneCode || '+123'}
                            </span>
                            <Input
                              type="tel"
                              placeholder="Enter your phone number"
                              className="rounded-l-none rounded-r-xl border-l-0 bg-white/50 border-slate-200 group-focus-within:border-primary"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="example@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="profilePic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Profile Picture
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Password <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
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
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">
                            Confirm Password{' '}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-primary text-white px-10 h-12 rounded-xl shadow-lg shadow-purple-200 transition-all flex ml-auto hover:scale-105 duration-500"
                >
                  Next Step
                </Button>
              </motion.form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default StudentBasic
