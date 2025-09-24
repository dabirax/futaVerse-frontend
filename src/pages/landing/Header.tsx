
import { SunIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";
import { NavMenu } from "../../components/navbar-02/nav-menu";
import { Sidebar } from "./components/sidebar";

const Header = () => {
  return (
    <div><nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="text-[#9017c2] text-xl font-serif font-bold">FutaVerse</div>

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
           <Link to="/login"><Button>Login</Button></Link>
            
            <Button size="icon" variant="outline">
              <SunIcon />
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sidebar />
            </div>
          </div>
        </div>
            </nav></div>
  )
}

export default Header