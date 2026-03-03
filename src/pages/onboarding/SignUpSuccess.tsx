import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { CircleCheckBig } from 'lucide-react'
import { LeftContainer } from './components/LeftContainer'
import { Button } from '@/components/ui/button'
import { itemVariants } from '@/animationVariants'

const SignupSuccess = () => {
  return (
    <div className="flex flex-col mlg:flex-row w-full max-w-screen mlg:min-h-145 h-screen mlg:h-auto bg-[#fafafa] relative overflow-hidden">
      <div className="w-full h-full grid lg:grid-cols-2 z-10">
        <LeftContainer />

        <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-12 md:p-16 flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="mb-8 p-5 bg-green-50 rounded-full shadow-inner"
            >
              <CircleCheckBig className="text-green-500" size={80} />
            </motion.div>

            <div className="space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-primary-dark">
                Signup Successful!
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                Welcome to Futaverse. Your account has been created
                successfully. You can now access the network.
              </p>
            </div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="w-full max-w-xs"
            >
              <Link to="/login" className="w-full">
                <Button className="w-full bg-primary text-white h-14 rounded-2xl shadow-lg shadow-purple-100 transition-all hover:scale-[1.02] active:scale-95 duration-300 font-bold text-lg">
                  Login to Account
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignupSuccess
