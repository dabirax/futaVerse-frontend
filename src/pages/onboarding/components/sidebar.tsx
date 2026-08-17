import { Menu } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '../../../components/ui/sheet'
import logo from '@/assets/logos/FV_logo_backgroundless.png'

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <div className="flex items-center gap-2 pr-10">
          <img src={logo} alt="FUTAVerse" className="h-10 w-auto" />
          <span className="font-montserrat font-bold text-lg tracking-tight bg-linear-to-r from-primary-dark to-accent bg-clip-text text-transparent">
            FUTAVerse
          </span>
        </div>
        <nav className="flex flex-col gap-4 mt-6">
          <SheetClose asChild>
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About Us
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              How It Works
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Features
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a
              href="#roles"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Roles
            </a>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
