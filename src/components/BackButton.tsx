import { useRouter } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export function BackButton() {
  const router = useRouter()
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.85 }}
      className="w-full cursor-pointer p-1.5 bg-primary-dark rounded-full"
      onClick={() => {
        if (window.history.length > 1) {
          router.history.back()
        } else {
          router.navigate({
            to: '/',
          })
        }
      }}
    >
      <ArrowLeft className="bg-primary-dark text-white" strokeWidth={2.5}/>
    </motion.div>
  )
}
