import { Link } from "@tanstack/react-router"
import {motion} from "framer-motion"

const Success = () => {
  return (

    <div>
      <div>Your registration was successful</div>
      
              <Link to="/login" className="ml-1 flex justify-center text-[#6BACB3]">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }}> Back to the Login Page
                </motion.div>
              </Link>
    </div>
  )
}

export default Success