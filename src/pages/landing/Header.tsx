import { Link } from '@tanstack/react-router'
import { Button } from '../../components/ui/button'
import { Sidebar } from '../onboarding/components/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import Logo from '@/components/logo'

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-line z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <div className="flex ">
         
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
          >
            About
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
          >
            How It Works
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
          >
            Features
          </a>
          <a
            href="#roles"
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
          >
            Roles
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
            <Button size="sm">Login</Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sidebar />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
