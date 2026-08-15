import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import logo from '@/assets/logos/FV_logo_backgroundless.png'

export default function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center"
    >
      <Link to="/">
        <img src={logo} alt="FUTAVerse" className="h-12 w-auto" />
      </Link>
    </motion.div>
  )
}
