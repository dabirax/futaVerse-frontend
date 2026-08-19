import { Link, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Construction } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Diagonal "hazard tape" stripe used on under-development / 404 surfaces. */
export const hazardStripeStyle = {
  backgroundImage:
    'repeating-linear-gradient(-45deg, var(--color-gold) 0px, var(--color-gold) 10px, transparent 10px, transparent 20px)',
} as const

type HomeTarget = {
  to: '/student/dashboard' | '/alumnus/feed' | '/'
  label: string
}

/** Role-aware "home" — reads sessionStorage so it works before React auth state. */
export const getHomeTarget = (): HomeTarget => {
  const role = sessionStorage.getItem('role')
  if (role === 'student')
    return { to: '/student/dashboard', label: 'Back to dashboard' }
  if (role === 'alumni') return { to: '/alumnus/feed', label: 'Back to feed' }
  return { to: '/', label: 'Back to home' }
}

type UnderDevelopmentProps = {
  /** Name of the feature being built, e.g. "Messages". */
  title: string
  /** Short line of copy under the title. */
  description?: string
  /** lucide icon — defaults to Construction. */
  icon?: LucideIcon
  /**
   * page       — fills a dashboard content area
   * fullscreen — standalone page, no layout around it
   * embedded   — compact dashed panel for inside tabs/cards
   */
  variant?: 'page' | 'fullscreen' | 'embedded'
}

export function UnderDevelopment({
  title,
  description = "We're still building this part of FUTAVerse — check back soon.",
  icon: Icon = Construction,
  variant = 'page',
}: UnderDevelopmentProps) {
  const router = useRouter()

  if (variant === 'embedded') {
    return (
      <div className="rounded-md border border-dashed border-line bg-muted/30 px-6 py-12 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft text-gold">
          <Icon className="h-5 w-5" />
        </div>
        <p className="font-display mt-4 text-lg text-ink">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    )
  }

  const home = getHomeTarget()

  return (
    <div
      className={cn(
        'flex items-center justify-center px-4',
        variant === 'fullscreen'
          ? 'min-h-screen bg-background py-16'
          : 'min-h-[60vh] py-10',
      )}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-md border border-dashed border-line bg-surface shadow-xs">
        <div className="h-1.5 w-full opacity-70" style={hazardStripeStyle} />
        <div className="px-8 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold">
            <Icon className="h-7 w-7" />
          </div>
          <p className="text-overline mt-6 text-gold">Under development</p>
          <h1 className="font-display mt-2 text-3xl text-ink">{title}</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" onClick={() => router.history.back()}>
              <ArrowLeft />
              Go back
            </Button>
            <Button asChild>
              <Link to={home.to}>{home.label}</Link>
            </Button>
          </div>
        </div>
        <div className="h-1.5 w-full opacity-70" style={hazardStripeStyle} />
      </div>
    </div>
  )
}

export default UnderDevelopment
