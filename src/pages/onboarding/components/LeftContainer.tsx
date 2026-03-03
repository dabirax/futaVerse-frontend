import { motion } from 'framer-motion'
import loginImage from '../../../assets/login.png'

export function LeftContainer() {
  return (
    <div className="bg-[#9017C2] hidden lg:flex items-center justify-center pt-10 px-10 mlg:w-[47.6vw] mlg:h-screen mlg:min-h-145 mlg:max-h-screen p-12 lgd:p-25 mlg:pb-[10vh] flex-col mlg:sticky top-0 left-0">
      <motion.img
        src={loginImage}
        alt="Login"
        className="  object-cover"
        initial={{
          x: -250,
        }}
        animate={{
          x: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      />
    </div>
  )
}
