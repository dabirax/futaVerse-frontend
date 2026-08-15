import { Menu } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../../../components/ui/sheet'
import { NavMenu } from '../../../components/navbar-02/nav-menu'
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
        <img src={logo} alt="FUTAVerse" className="h-10 w-auto" />
        <NavMenu orientation="vertical" className="mt-6 [&>div]:h-full" />
      </SheetContent>
    </Sheet>
  )
}
