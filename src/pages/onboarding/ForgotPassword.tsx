import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { AlertCircle, WifiOff } from 'lucide-react'
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
                Forgot Password
              </h2>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed px-4">
                Enter the email you used to create your account so we can send
                you instructions on how to reset your password.
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@example.com"
                            className="h-12 rounded-xl bg-white/50 border-slate-200 focus:ring-primary"
                            disabled={forgotPasswordMutation.isPending}
                            {...field}
                          />
                        </FormControl>
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
                    disabled={forgotPasswordMutation.isPending}
                    className="w-full bg-primary text-white h-12 rounded-xl shadow-lg shadow-purple-100 transition-all hover:scale-[1.02] active:scale-95 duration-300 font-semibold"
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

export default ForgotPassword
