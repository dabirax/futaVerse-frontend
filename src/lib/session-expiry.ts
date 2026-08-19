import { toast } from '@/hooks/use-toast'
import { apiLogout } from '@/lib/auth-utils'

export function showSessionExpiredToast() {
  toast({
    title: 'Session Expired',
    description: 'Your session has expired. Please log in again.',
    variant: 'destructive',
    duration: Infinity,
  })

  const handler = () => {
    window.removeEventListener('mousemove', handler)
    apiLogout()
  }
  window.addEventListener('mousemove', handler)
}
