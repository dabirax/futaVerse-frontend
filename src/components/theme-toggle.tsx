import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const next = root.classList.contains('dark') ? 'light' : 'dark'

    // Add transition class before toggling so all elements animate together
    root.classList.add('theme-transitioning')
    localStorage.setItem('theme', next)
    applyTheme(next)

    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 350)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-8 w-8 text-ink-soft hover:text-ink"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
