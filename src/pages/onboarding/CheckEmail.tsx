import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BackButton, BackButtonWithLogo } from '../../components/BackButtons'
import { LeftContainer } from './components/LeftContainer'
import { useForgotPasswordStore } from './hooks/useForgotPasswordStore'
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
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-md animate-in fade-in duration-500">
          <div className="mb-8">
            <BackButtonWithLogo />
            <div className="hidden lg:block">
              <BackButton />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-semibold text-ink tracking-tight">
              Enter OTP
            </h1>
            <p className="text-ink-soft text-sm mt-1.5">
              We have sent an email with the OTP to{' '}
              <span className="font-semibold text-ink">
                {email ? maskEmail(email) : 'your email'}
              </span>
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-center">
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
                          <InputOTPGroup className="gap-2">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <InputOTPSlot
                                key={i}
                                index={i}
                                className="w-11 h-13 text-lg rounded-xs border border-line bg-surface shadow-xs transition-colors focus:border-indigo focus:shadow-focus font-mono font-bold"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <p className="text-sm text-center text-ink-soft leading-relaxed">
                Didn't receive the email? <br className="sm:hidden" />
                Check your spam or promotions folder, or{' '}
                <button
                  type="button"
                  onClick={() => {
                    setResendStatus(null)
                    resendMutation.mutate()
                  }}
                  disabled={resendMutation.isPending}
                  className="text-indigo font-semibold hover:underline disabled:opacity-60"
                >
                  {resendMutation.isPending ? 'Sending...' : 'Resend OTP'}
                </button>
              </p>

              {resendStatus && (
                <div className="rounded-xs bg-green-soft border border-green/20 px-4 py-3 text-sm text-center font-medium text-green-on-soft">
                  {resendStatus}
                </div>
              )}

              {serverError && (
                <div className="rounded-xs bg-destructive-soft border border-destructive/20 px-4 py-3 text-sm text-center font-medium text-destructive-on-soft">
                  {serverError}
                </div>
              )}

              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  disabled={verifyOtpMutation.isPending}
                  className="w-full h-10"
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
                  className="w-full h-10"
                >
                  Back to Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CheckEmail
