
import { motion } from "framer-motion";
import loginImage from "../../../assets/login.png";


export function LeftContainer() {
  return <div className="bg-[#9017C2] hidden lg:flex items-center justify-center pt-10 px-10 border">
          <motion.img src={loginImage} alt="Login" className="  object-cover" initial={{
      x: -250
    }} animate={{
      x: 0
    }} transition={{
      duration: 0.5
    }} />
        </div>;
}
  