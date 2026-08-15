import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BackButton } from '../../components/BackButtons'
import { LeftContainer } from './components/LeftContainer'
import { useForgotPasswordStore } from './hooks/useForgotPasswordStore'
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

const maskEmail = (email: string) => {
  const [user, domain] = email.split('@')
  const maskedUser =
    user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : `${user[0]}***`
  return `${maskedUser}@${domain}`
}

const CheckEmail = () => {
  const router = useRouter()
  const navigate = router.navigate
  const email = useForgotPasswordStore((s) => s.email)
  const setToken = useForgotPasswordStore((s) => s.setToken)
  const [serverError, setServerError] = useState<string | null>(null)
  const [resendStatus, setResendStatus] = useState<string | null>(null)

  const form = useForm<z.infer<typeof otpSchema>>({
    defaultValues: { otp: '' },
    resolver: zodResolver(otpSchema),
  })

  useEffect(() => {
    if (!email) {
      navigate({ to: '/forgot-password' })
    }
  }, [email, navigate])

  const verifyOtpMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const res = await api.post(
        '/api/auth/forgot-password/verify-otp',
        payload,
      )
      return res.data
    },
    onSuccess: (data) => {
      const token =
        data?.data?.access_token ?? data?.access_token ?? data?.token ?? null
      if (!token) {
        setServerError(
          'Verification succeeded but no reset token was returned. Please try again.',
        )
        return
      }
      setToken(token)
      navigate({ to: '/reset-password' })
    },
    onError: (err: any) => {
      const status = err.response?.status
      const detail = err.response?.data?.detail
      if (status === 400) {
        setServerError(detail ?? 'Invalid OTP. Please try again.')
      } else if (status === 404) {
        setServerError(detail ?? 'OTP has expired. Please request a new one.')
      } else if (status === 403) {
        setServerError('Maximum attempts exceeded. Please request a new OTP.')
      } else if (status === 429) {
        setServerError('Too many requests. Please wait a moment.')
      } else {
        setServerError('An error occurred. Please try again later.')
      }
    },
  })

  const resendMutation = useMutation({
    mutationFn: async () => {
      if (!email) throw new Error('Missing email')
      const res = await api.post('/api/auth/forgot-password', { email })
      return res.data
    },
    onSuccess: () => {
      setResendStatus('A new OTP has been sent to your email.')
      setServerError(null)
    },
    onError: () => {
      setResendStatus(null)
      setServerError('Could not resend the OTP. Please try again later.')
    },
  })

  const onSubmit = (data: z.infer<typeof otpSchema>) => {
    setServerError(null)
    setResendStatus(null)
    verifyOtpMutation.mutate({
      email: email || '',
      otp: data.otp,
    })
  }

  return (
    <div className="flex  mlg:flex-row w-full max-w-screen mlg:min-h-145 h-screen mlg:h-auto">
      <div className="w-full h-full grid lg:grid-cols-2 z-10">
        <LeftContainer />

        <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 h-full">
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
                <span className="font-semibold text-slate-700 underline">
                  {email ? maskEmail(email) : 'your email'}
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
                  className="flex justify-center"
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
                  Check your spam or promotions folder, or{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setResendStatus(null)
                      resendMutation.mutate()
                    }}
                    disabled={resendMutation.isPending}
                    className="text-primary font-bold hover:underline disabled:opacity-60"
                  >
                    <span className="inline-block">
                      {resendMutation.isPending ? 'Sending...' : 'Resend OTP'}
                    </span>
                  </button>
                </motion.div>

                {resendStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-sm text-center font-medium bg-green-50 p-3 rounded-lg border border-green-100"
                  >
                    {resendStatus}
                  </motion.p>
                )}

                {serverError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100"
                  >
                    {serverError}
                  </motion.p>
                )}

                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                  <Button
                    type="submit"
                    disabled={verifyOtpMutation.isPending}
                    className="w-full bg-primary text-white h-12 rounded-xl shadow-lg shadow-purple-100 transition-all hover:scale-[1.02] active:scale-95 duration-300 font-semibold"
                  >
                    {verifyOtpMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      'Submit OTP'
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.navigate({ to: '/login' })}
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

export default CheckEmail
