import { Link, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { BackButton } from '../../components/BackButton'
import { LeftContainer } from './components/LeftContainer'
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
import { containerVariants, itemVariants } from '@/animationVariants'

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

const CheckEmail = () => {
  const router = useRouter()
  const navigate = router.navigate

  const form = useForm<z.infer<typeof otpSchema>>({
    defaultValues: { otp: '' },
    resolver: zodResolver(otpSchema),
  })

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    try {
      const response = await fetch('/api/auth/forgot-password/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'user@example.com',
          otp: data.otp,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('OTP verification failed:', error)
        alert('Invalid OTP. Try again.')
        return
      }

      const result = await response.json()
      console.log('OTP verified successfully:', result)

      navigate({ to: '/reset-password' })
    } catch (error) {
      console.error('Error verifying OTP:', error)
      alert('Something went wrong. Try again later.')
    }
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
                  <Link
                    to=""
                    className="text-primary font-bold hover:underline"
                  >
                    <span className="inline-block">Resend OTP</span>
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white h-12 rounded-xl shadow-lg shadow-purple-100 transition-all hover:scale-[1.02] active:scale-95 duration-300 font-semibold"
                  >
                    Submit OTP
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
