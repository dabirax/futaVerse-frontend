import { motion } from "framer-motion"
import { Link } from "@tanstack/react-router"

export default function Logo() {
  return (
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }} className="italic font-bold text-[#9017c2] text-2xl">
          <Link to="/">FV</Link>
      </motion.div>
  )
}

