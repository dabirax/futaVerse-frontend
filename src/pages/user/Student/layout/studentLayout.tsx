import { useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import {
    Briefcase,
    Calendar,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Rss,
    Settings,
    Users,
    X,
} from "lucide-react";
import { Avatar, AvatarFallback,  } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import profPic from "@/assets/testProfilePic2.png"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
  { icon: Rss, label: "Feed", path: "/student/feed" },
  { icon: Briefcase, label: "Internship", path: "/student/internships" },
  { icon: Users, label: "Mentorship", path: "/student/mentorship" },
  { icon: Calendar, label: "Events", path: "/student/events" },
  { icon: MessageSquare, label: "Messages", path: "/student/messages" },
  { icon: Calendar, label: "Calendar", path: "/student/calendar" },
  { icon: Settings, label: "Settings", path: "/student/settings" },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Implement logout logic here
    navigate({ to: "/" });
  };

  

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b z-50 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
        <h1 className="text-lg font-semibold text-primary">FUTAVerse</h1>
        <div className="w-10" />
      </header>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-card border-r transition-transform duration-300 z-50 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Profile Section */}
        <div className="p-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <img src={profPic} className="object-cover"/>
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">
                {/* {user?.firstName} {user?.lastName} */}
              </h3>

              <p className="text-xs text-muted-foreground">Student</p>
              {/* <p className="text-xs text-muted-foreground">user.role</p> */}
            </div>
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
                  activeProps={{
                    className:
                      "bg-primary text-primary-foreground shadow-md",
                  }}
                  inactiveProps={{
                    className:
                      "text-muted-foreground hover:scale-105 hover:text-foreground",
                  }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        {/* Sign Out */}
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
