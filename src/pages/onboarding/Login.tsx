import { Link, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle, Eye, EyeOff, WifiOff } from 'lucide-react'
import { useState } from 'react'
import { BackButton } from '../../components/BackButtons'
import { LeftContainer } from './components/LeftContainer'
import { useAuth } from '@/hooks/auth-context'
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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const LoginPage = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<{
    message: string
    hint?: string
    isNetwork?: boolean
  } | null>(null)

  const router = useRouter()
  const { login } = useAuth()

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await api.post('/api/auth/login', data)
      return res.data
    },
    onSuccess: (data) => {
      const { access_token, role, refresh_token, user_sqid } = data.data
      login(access_token, role, refresh_token, user_sqid)
      if (role === 'alumni') router.navigate({ to: '/alumnus/feed' })
      if (role === 'student') router.navigate({ to: '/student/feed' })
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
          message: data?.detail ?? 'Incorrect email or password.',
          hint: 'Double-check your details or reset your password below.',
        })
      } else if (status === 429) {
        setServerError({
          message: 'Too many login attempts.',
          hint: 'Please wait a few minutes before trying again.',
        })
      } else if (status === 400) {
        const detail =
          data?.detail ??
          data?.non_field_errors?.[0] ??
          "The information you entered doesn't look right."
        setServerError({
          message: detail,
          hint: 'Please review your details and try again.',
        })
      } else {
        setServerError({
          message: 'Something went wrong on our end.',
          hint: 'Please try again in a moment.',
        })
      }
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setServerError(null)
    loginMutation.mutate(values)
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-md animate-in fade-in duration-500">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="mb-8">
            <h1 className="font-display text-2xl font-semibold text-ink tracking-tight">
              Sign In
            </h1>
            <p className="text-ink-soft text-sm mt-1.5">
              Welcome back to the Futaverse network
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink-soft font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@example.com"
                        disabled={loginMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink-soft font-medium">
                      Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="********"
                          className="pr-12"
                          disabled={loginMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
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

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-xs text-indigo hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

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

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full h-10"
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  'Login'
                )}
              </Button>

              {/*<div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-ink-faint font-medium">
                    Or continue with
                  </span>
                </div>
              </div>*/}

              {/*<Button
                type="button"
                variant="outline"
                disabled
                className="w-full h-10 gap-3"
              >
                <GoogleLogo />
                Google (coming soon)
              </Button>*/}

              <p className="text-sm text-center text-ink-soft">
                Are you new here?{' '}
                <Link
                  to="/signup"
                  className="text-indigo font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
