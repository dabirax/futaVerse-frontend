import { Menu } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '../../../components/ui/sheet'
import Logo from '@/components/logo'

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3 bg-surface">
        <div className="pr-10 mb-6">
          <Logo />
        </div>
        <nav className="flex flex-col gap-2">
          <SheetClose asChild>
            <a
              href="#about"
              className="text-sm font-medium text-ink-soft hover:text-ink hover:bg-surface-2 px-3 py-2.5 transition-colors rounded-xs"
            >
              About Us
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-ink-soft hover:text-ink hover:bg-surface-2 px-3 py-2.5 transition-colors rounded-xs"
            >
              How It Works
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a
              href="#features"
              className="text-sm font-medium text-ink-soft hover:text-ink hover:bg-surface-2 px-3 py-2.5 transition-colors rounded-xs"
            >
              Features
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a
              href="#roles"
              className="text-sm font-medium text-ink-soft hover:text-ink hover:bg-surface-2 px-3 py-2.5 transition-colors rounded-xs"
            >
              Roles
            </a>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
