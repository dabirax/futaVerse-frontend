
import { SunIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import  Logo  from "../../components/Logo";
import { Button } from "../../components/ui/button";
import { NavMenu } from "../../components/navbar-02/nav-menu";
import { Sidebar } from "../onboarding/components/sidebar";

const Header = () => {
  return (
    <motion.div initial= {{y: -250}} animate={{y: 0}} transition={{duration: 0.5}}><nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />
            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
           <Link to="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full"><Button className='bg-[#5E0B80]'>Login</Button></motion.div></Link>
            
            <Button size="icon" variant="outline">
              <SunIcon />
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sidebar />
            </div>
          </div>
        </div>
            </nav></motion.div>
  )
}

export default Header