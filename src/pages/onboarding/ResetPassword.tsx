import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle, Eye, EyeOff, WifiOff } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { BackButton, BackButtonWithLogo } from '../../components/BackButtons'
import { LeftContainer } from './components/LeftContainer'
import { useForgotPasswordStore } from './hooks/useForgotPasswordStore'
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
import { api } from '@/lib/api'

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

const ResetPassword = () => {
  const router = useRouter()
  const navigate = router.navigate

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [serverError, setServerError] = useState<{
    message: string
    hint?: string
    isNetwork?: boolean
  } | null>(null)

  const email = useForgotPasswordStore((s) => s.email)
  const otpToken = useForgotPasswordStore((s) => s.token)
  const resetStore = useForgotPasswordStore((s) => s.reset)

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  })

  useEffect(() => {
    if (!email) {
      navigate({ to: '/reset-success' })
    }
  }, [email, navigate])

  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: { new_password: string }) => {
      const res = await api.patch(
        '/api/auth/reset-password',
        { new_password: payload.new_password },
        { headers: { Authorization: `Bearer ${otpToken}` } },
      )
      return res.data
    },
    onSuccess: () => {
      navigate({ to: '/reset-success' })
      resetStore()
    },
    onError: (err: any) => {
      const status = err.response?.status
      const data = err.response?.data

      if (!err.response) {
        setServerError({
          message: "Can't reach the server.",
          hint: 'Check your internet connection and try again.',
          isNetwork: true,
        })
      } else if (status === 401) {
        setServerError({
          message: data?.detail ?? 'This reset link is invalid or has expired.',
          hint: 'Please request a new OTP and try again.',
        })
      } else if (status === 400) {
        const detail =
          data?.detail ??
          data?.new_password?.[0] ??
          data?.non_field_errors?.[0] ??
          "The information you entered doesn't look right."
        setServerError({
          message: detail,
          hint: 'Please review your password and try again.',
        })
      } else {
        setServerError({
          message: 'Something went wrong on our end.',
          hint: 'Please try again in a moment.',
        })
      }
    },
  })

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    setServerError(null)
    if (!otpToken) {
      setServerError({
        message: 'Your reset session has expired.',
        hint: 'Please request a new OTP and try again.',
      })
      return
    }
    resetPasswordMutation.mutate({ new_password: data.password })
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

          <div className="mb-8">
            <h1 className="font-display text-2xl font-semibold text-ink tracking-tight">
              Reset Password
            </h1>
            <p className="text-ink-soft text-sm mt-1.5">
              Choose a new, secure password for your account
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink font-medium text-sm">
                      New Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="********"
                          className="pr-10"
                          disabled={resetPasswordMutation.isPending}
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
                      Confirm New Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="********"
                          className="pr-10"
                          disabled={resetPasswordMutation.isPending}
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

              {serverError && (
                <div className="rounded-xs bg-destructive-soft border border-destructive/20 px-4 py-3 flex gap-3">
                  <div className="shrink-0 mt-0.5 text-destructive">
                    {serverError.isNetwork ? (
                      <WifiOff size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-destructive-on-soft">
                      {serverError.message}
                    </p>
                    {serverError.hint && (
                      <p className="text-xs text-ink-soft">
                        {serverError.hint}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  disabled={resetPasswordMutation.isPending}
                  className="w-full h-10"
                >
                  {resetPasswordMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      Resetting...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: '/login' })}
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

export default ResetPassword
