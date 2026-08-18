import { useRouter } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/logo'

export function BackButtonWithLogo() {
  return (
    <div className="flex items-center gap-3 lg:hidden">
      <BackButton />
      <Logo showWordmark={false} />
    </div>
  )
}

export function BackButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-2 border border-line text-ink hover:bg-line transition-colors cursor-pointer"
      onClick={() => {
        if (window.history.length > 1) {
          router.history.back()
        } else {
          router.navigate({ to: '/' })
        }
      }}
    >
      <ArrowLeft size={16} strokeWidth={2} />
    </button>
  )
}

export function BackButton2() {
  const router = useRouter()
  return (
    <button
      type="button"
      className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-2 border border-line text-ink hover:bg-line transition-colors cursor-pointer"
      onClick={() => {
        if (window.history.length > 1) {
          router.history.back()
        } else {
          router.navigate({ to: '/' })
        }
      }}
    >
      <ArrowLeft size={16} strokeWidth={2} />
    </button>
  )
}
