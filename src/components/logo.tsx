import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import logo from '@/assets/logos/FV_logo_backgroundless.png'

export default function Logo({
  showWordmark = true,
}: {
  showWordmark?: boolean
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-2"
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="FUTAVerse" className="h-12 w-auto" />
        {showWordmark && (
          <span className="hidden sm:inline font-montserrat font-bold text-3xl tracking-tight bg-linear-to-r from-primary-dark to-accent bg-clip-text text-transparent">
            FUTAVerse
          </span>
        )}
      </Link>
    </motion.div>
  )
}
