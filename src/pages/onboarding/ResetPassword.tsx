import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff, WifiOff } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
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
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { containerVariants, itemVariants } from '@/animationVariants'

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
                Reset Password
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Choose a new, secure password for your account
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
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          New Password
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="********"
                              className="pr-12"
                              disabled={resetPasswordMutation.isPending}
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
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
                          Confirm New Password
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="********"
                              className="pr-12"
                              disabled={resetPasswordMutation.isPending}
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((p) => !p)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex gap-3"
                  >
                    <div className="shrink-0 mt-0.5 text-red-500">
                      {serverError.isNetwork ? (
                        <WifiOff size={16} />
                      ) : (
                        <AlertCircle size={16} />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-red-700">
                        {serverError.message}
                      </p>
                      {serverError.hint && (
                        <p className="text-xs text-red-500">
                          {serverError.hint}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                  <Button
                    type="submit"
                    disabled={resetPasswordMutation.isPending}
                    className="w-full bg-primary text-white h-12 rounded-xl shadow-lg shadow-purple-100 transition-all hover:scale-[1.02] active:scale-95 duration-300 font-semibold"
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

export default ResetPassword
