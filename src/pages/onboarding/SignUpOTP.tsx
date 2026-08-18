import { Link, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { BackButton } from '../../components/BackButtons'
import { useSignupOTPStore } from './hooks/useSignupOTPStore'
import { LeftContainer } from './components/LeftContainer'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
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
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Enter OTP
            </h2>
            <p className="text-ink-soft text-sm mt-2">
              We have sent an email with the OTP to{' '}
              <span className="font-mono text-ink font-medium">
                {email ? maskEmail(email) : 'your email'}
              </span>
            </p>
          </div>

          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-center justify-center">
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
                                className="w-11 h-12 rounded-xs border border-line bg-surface text-ink font-mono text-lg focus-visible:border-indigo focus-visible:ring-focus focus-visible:ring-[3px]"
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

              <div className="text-sm text-center text-ink-faint leading-relaxed">
                Didn't receive the email? <br />
                Check spam or promotions folder, or{' '}
                <Link
                  to=""
                  className="text-indigo font-semibold hover:text-indigo-hover transition-colors"
                >
                  Resend OTP
                </Link>
              </div>

              {isError && (
                <div className="bg-destructive-soft border border-destructive rounded-xs p-3 text-center">
                  <p className="text-destructive text-sm font-medium">
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
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-indigo text-white rounded-sm h-10 font-medium hover:bg-indigo-hover transition-colors"
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
                  className="w-full border-line rounded-xs text-ink-soft h-10"
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

export default SignUpOTP
