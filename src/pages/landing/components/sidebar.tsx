import { Menu } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../../components/ui/sheet";
import { NavMenu } from "../../../components/navbar-02/nav-menu";

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
            <div className="text-[#9017c2] text-xl font-serif font-bold">FutaVerse</div>
        <NavMenu orientation="vertical" className="mt-6 [&>div]:h-full" />
      </SheetContent>
    </Sheet>
  );
};
