import { Link } from '@tanstack/react-router'
import logo from '@/assets/logos/FV_logo_backgroundless.png'

export default function Logo({
  showWordmark = true,
}: {
  showWordmark?: boolean
}) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="FUTAVerse" className="h-14 w-auto" />
      {showWordmark && (
        <span className="hidden sm:inline font-display text-xl font-semibold text-indigo tracking-tight">
          FUTAVerse
        </span>
      )}
    </Link>
  )
}
