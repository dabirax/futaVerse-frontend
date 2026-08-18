import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { AlertCircle, WifiOff } from 'lucide-react'
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

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

const ForgotPassword = () => {
  const router = useRouter()
  const navigate = router.navigate
  const setEmail = useForgotPasswordStore((s) => s.setEmail)
  const [serverError, setServerError] = useState<{
    message: string
    hint?: string
    isNetwork?: boolean
  } | null>(null)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: async (payload: { email: string }) => {
      const res = await api.post('/api/auth/forgot-password', payload)
      return res.data
    },
    onSuccess: (_, variables) => {
      setEmail(variables.email)
      navigate({ to: '/check-email' })
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
      } else if (status === 404) {
        setServerError({
          message: data?.detail ?? 'No account found with this email address.',
          hint: 'Double-check your email or create an account instead.',
        })
      } else if (status === 429) {
        setServerError({
          message: 'Too many requests.',
          hint: 'Please wait a few minutes before trying again.',
        })
      } else if (status === 400) {
        const detail =
          data?.detail ??
          data?.email?.[0] ??
          'The information you entered does not look right.'
        setServerError({
          message: detail,
          hint: 'Please review your email and try again.',
        })
      } else {
        setServerError({
          message: 'Something went wrong on our end.',
          hint: 'Please try again in a moment.',
        })
      }
    },
  })

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    setServerError(null)
    forgotPasswordMutation.mutate(values)
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
              Forgot Password
            </h1>
            <p className="text-ink-soft text-sm mt-1.5 leading-relaxed">
              Enter the email you used to create your account so we can send you
              instructions on how to reset your password.
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink-soft font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@example.com"
                        disabled={forgotPasswordMutation.isPending}
                        {...field}
                      />
                    </FormControl>
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
                  disabled={forgotPasswordMutation.isPending}
                  className="w-full h-10"
                >
                  {forgotPasswordMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
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

export default ForgotPassword
