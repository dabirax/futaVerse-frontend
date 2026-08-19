import { Link, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Compass } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  getHomeTarget,
  hazardStripeStyle,
} from '@/components/under-development'

export function NotFound() {
  const router = useRouter()
  const home = getHomeTarget()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-center">
      <div
        className="absolute inset-x-0 top-0 h-1.5 opacity-70"
        style={hazardStripeStyle}
      />

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-soft text-indigo">
        <Compass className="h-7 w-7" />
      </div>

      <p className="font-display mt-8 text-[clamp(5rem,18vw,9rem)] leading-none text-ink select-none">
        4<span className="text-indigo">0</span>4
      </p>
      <h1 className="font-display mt-4 text-2xl text-ink">
        This page wandered off
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
        The link might be broken, or the page may have been moved or never
        existed. Let's get you back on track.
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

      <div
        className="absolute inset-x-0 bottom-0 h-1.5 opacity-70"
        style={hazardStripeStyle}
      />
    </div>
  )
}

export default NotFound
