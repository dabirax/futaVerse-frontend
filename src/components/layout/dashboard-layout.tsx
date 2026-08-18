import { useState } from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import { LogOut, Menu, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/hooks/auth-context'
import { useMe } from '@/hooks/useMe'
import Logo from '@/components/logo'

interface SidebarItem {
  icon: LucideIcon
  label: string
  path: string
}

interface DashboardLayoutProps {
  role: 'student' | 'alumnus'
  sidebarItems: Array<SidebarItem>
  children?: React.ReactNode
}

const roleLabel: Record<string, string> = {
  student: 'Student',
  alumnus: 'Alumnus',
}

const roleRingColor: Record<string, string> = {
  student: 'ring-indigo',
  alumnus: 'ring-maroon',
}

const roleFallbackBg: Record<string, string> = {
  student: 'bg-indigo-soft text-indigo',
  alumnus: 'bg-maroon-soft text-maroon',
}

export default function DashboardLayout({
  role,
  sidebarItems,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const { data: me } = useMe()

  const profile = me?.profile
  const displayName = profile
    ? [profile.firstname, profile.lastname].filter(Boolean).join(' ') ||
      roleLabel[role]
    : roleLabel[role]
  const initials =
    profile?.firstname || profile?.lastname
      ? `${profile.firstname.charAt(0)}${profile.lastname.charAt(0)}`.toUpperCase()
      : roleLabel[role].slice(0, 2).toUpperCase()
  const avatarSrc =
    profile?.profile_img_url ??
    sessionStorage.getItem('profile_img') ??
    undefined

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-line z-50 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
        <Logo showWordmark={false} />
        <ThemeToggle />
      </header>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-normal"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-surface border-r border-line z-50 flex flex-col transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Branding */}
        <div className="h-16 px-6 flex items-center border-b border-line shrink-0">
          <Logo />
        </div>

        {/* Profile Section */}
        <div className="px-5 py-4 border-b border-line">
          <div className="flex items-center gap-3">
            <Avatar
              className={`h-[34px] w-[34px] ring-2 ${roleRingColor[role]} ring-offset-2 ring-offset-surface`}
              style={{ boxShadow: 'var(--shadow-seal)' }}
            >
              <AvatarImage src={avatarSrc} alt={displayName} />
              <AvatarFallback
                className={`text-[11px] font-semibold ${roleFallbackBg[role]}`}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-ink leading-tight truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-ink-soft">{roleLabel[role]}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="space-y-0.5 px-3">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 h-11 px-3 rounded-xs text-sm transition-colors duration-normal"
                  activeProps={{
                    className: 'bg-indigo-soft text-indigo font-semibold',
                  }}
                  inactiveProps={{
                    className: 'text-ink-soft hover:bg-surface-alt',
                  }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign Out + Theme Toggle */}
        <div className="p-3 border-t border-line flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex-1 justify-start gap-3 h-11 px-3 rounded-xs text-ink-soft hover:text-destructive hover:bg-destructive-soft"
            onClick={handleSignOut}
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span className="text-sm font-medium">Sign Out</span>
          </Button>
          <div className="hidden lg:flex">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
