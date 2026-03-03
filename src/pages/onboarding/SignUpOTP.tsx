import { Link, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { BackButton } from '../../components/BackButton'
import { useSignupOTPStore } from './hooks/useSignupOTPStore'
import { LeftContainer } from './components/LeftContainer'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { api } from '@/lib/api'
import { containerVariants, itemVariants } from '@/animationVariants'

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

interface VerifyOtpPayload {
  email: string
  otp: string
}

interface VerifyOtpResponse {
  success: boolean
  message: string
}

const SignUpOTP = () => {
  const router = useRouter()
  const navigate = router.navigate

  const form = useForm<z.infer<typeof otpSchema>>({
    defaultValues: { otp: '' },
    resolver: zodResolver(otpSchema),
  })

  const verifyOtpMutation: UseMutationResult<
    VerifyOtpResponse,
    AxiosError,
    VerifyOtpPayload,
    unknown
  > = useMutation({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const res = await api.post('/api/auth/signup/verify-otp', payload)
      return res.data
    },
    onSuccess: () => {
      navigate({ to: '/signup/success' })
    },
  })

  const { mutate: verifyOtp, isPending, isError, error } = verifyOtpMutation

  const email = useSignupOTPStore((state) => state.email)

  const onSubmit = (data: z.infer<typeof otpSchema>) => {
    console.log(email, data.otp)
    verifyOtp({
      email: email || '',
      otp: data.otp,
    })
  }

  return (
    <div className="flex flex-col mlg:flex-row w-full max-w-screen mlg:min-h-145 h-screen mlg:h-auto bg-[#fafafa] relative overflow-hidden">
      <div className="w-full h-full grid lg:grid-cols-2 z-10">
        <LeftContainer />

        <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 md:p-12"
          >
            <div className="flex items-center justify-between w-full mb-8">
              <div className="transition-transform hover:-translate-x-1">
                <BackButton />
              </div>
              <Logo />
            </div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-primary-dark">
                Enter OTP
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                We have sent an email with the OTP to{' '}
                <span className="font-semibold text-slate-700 underline italic">
                  n****e@e***e.com
                </span>
              </p>
            </div>

            <Form {...form}>
              <motion.form
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col items-center justify-center"
                >
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          >
                            <InputOTPGroup className="gap-3">
                              {[0, 1, 2, 3, 4, 5].map((i) => (
                                <InputOTPSlot
                                  key={i}
                                  index={i}
                                  className="w-12 h-14 text-lg rounded-xl border border-slate-200 bg-white/50 shadow-sm transition-all focus:ring-2 focus:ring-primary focus:border-primary font-bold"
                                />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-sm text-center text-slate-500 leading-relaxed"
                >
                  Didn’t receive the email? <br />
                  Check spam or promotions folder, or{' '}
                  <Link
                    to=""
                    className="text-primary font-bold hover:underline"
                  >
                    <span className="inline-block transition-transform hover:scale-105 active:scale-95">
                      Resend OTP
                    </span>
                  </Link>
                </motion.div>

                {isError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100"
                  >
                    {error.response?.status === 400
                      ? 'Invalid OTP. Please try again.'
                      : error.response?.status === 404
                        ? 'OTP has expired. Please request a new one.'
                        : error.response?.status === 403
                          ? 'Maximum attempts exceeded. Please request a new OTP.'
                          : error.response?.status === 429
                            ? 'Too many requests. Please wait a moment.'
                            : error.response?.status === 409
                              ? 'Email already exists. Please use a different email.'
                              : 'An error occurred. Please try again later.'}
                  </motion.p>
                )}

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-white h-12 rounded-xl shadow-lg shadow-purple-100 transition-all hover:scale-[1.02] active:scale-95 duration-300 font-semibold"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: '/login' })}
                    className="w-full h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Back to Login
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

export default SignUpOTP
