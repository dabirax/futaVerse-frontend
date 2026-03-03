import { useRouter } from '@tanstack/react-router'
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
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { containerVariants, itemVariants } from '@/animationVariants'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

const ForgotPassword = () => {
  const router = useRouter()
  const navigate = router.navigate

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log(data)
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white h-12 rounded-xl shadow-lg shadow-purple-100 transition-all hover:scale-[1.02] active:scale-95 duration-300 font-semibold"
                    onClick={() => navigate({ to: '/check-email' })}
                  >
                    Send Reset Link
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
