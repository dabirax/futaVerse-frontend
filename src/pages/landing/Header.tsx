
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Sidebar } from "../onboarding/components/sidebar";
import Logo from "@/components/Logo";

const Header = () => {
  return (
        <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-border z-50">

    <motion.div initial= {{y: -250}} animate={{y: 0}} transition={{duration: 0.5}}>
        <div className="flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8 h-16 bg-background shadow-md">
            <Logo />
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About Us
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">
              How It Works
            </a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors font-medium">
              Testimonials
            </a>
          </div>

          <div className="flex items-center gap-3">
           <Link to="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full"><Button className='bg-[#5E0B80]'>Login</Button></motion.div></Link>
            
            {/* <Button size="icon" variant="outline">
              <SunIcon />
            </Button> */}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sidebar />
            </div>
          </div>
        </div>
      </motion.div>
      </nav>
  )
}

export default Header