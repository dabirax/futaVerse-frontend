import { motion } from "framer-motion"
import { Link } from "@tanstack/react-router"

const Logo = () => {
  return (
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }} className="italic font-bold">
          <Link to="/">FV</Link>
      </motion.div>
  )
}

export default Logo