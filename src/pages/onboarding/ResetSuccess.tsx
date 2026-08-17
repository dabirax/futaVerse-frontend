import { Link } from '@tanstack/react-router'
import { CircleCheckBig } from 'lucide-react'
import { AuthLayout } from './components/AuthLayout'
import { Button } from '@/components/ui/button'

const ResetSuccess = () => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-md flex flex-col items-center text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-full bg-green-soft flex items-center justify-center mb-6 animate-in fade-in duration-700">
            <CircleCheckBig className="text-green" size={32} />
          </div>

          <h1 className="font-display text-2xl font-semibold text-ink tracking-tight mb-2">
            All Set!
          </h1>
          <p className="text-ink-soft text-sm leading-relaxed max-w-xs mb-8">
            Your password has been successfully reset. You can now sign in to
            your Futaverse account.
          </p>

          <Link to="/login" className="w-full max-w-xs">
            <Button className="w-full h-10">Back to Login</Button>
          </Link>
=======
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-12 md:p-16 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="mb-8 p-4 bg-green-50 rounded-full"
        >
          <CircleCheckBig className="text-green-500" size={80} />
        </motion.div>

        <div className="space-y-3 mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-primary-dark">
            All Set!
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your password has been successfully reset. <br />
            You can now sign in to your Futaverse account.
          </p>
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
        </div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xs"
        >
          <Link to="/login" className="w-full">
            <Button className="w-full bg-primary text-white h-14 rounded-2xl shadow-lg shadow-purple-100 transition-all hover:scale-[1.02] active:scale-95 duration-300 font-semibold text-lg">
              Back to Login
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayout>
  )
}

export default ResetSuccess
