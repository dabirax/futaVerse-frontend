import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-line z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Logo />

          {/* Desktop Navigation */}
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="default" size="sm">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-line mt-2">
            <a
              href="#about"
              className="block text-sm font-medium text-ink-soft hover:text-ink hover:bg-surface-2 px-3 py-2.5 transition-colors rounded-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#how-it-works"
              className="block text-sm font-medium text-ink-soft hover:text-ink hover:bg-surface-2 px-3 py-2.5 transition-colors rounded-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="block text-sm font-medium text-ink-soft hover:text-ink hover:bg-surface-2 px-3 py-2.5 transition-colors rounded-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#roles"
              className="block text-sm font-medium text-ink-soft hover:text-ink hover:bg-surface-2 px-3 py-2.5 transition-colors rounded-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roles
            </a>
            <div className="pt-2 px-3">
              <Button variant="default" size="default" className="w-full">
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
