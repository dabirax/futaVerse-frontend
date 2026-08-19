import { toast } from '@/hooks/use-toast'
import { apiLogout } from '@/lib/auth-utils'

export function handleSessionExpiry() {
  sessionStorage.setItem('session_expired', '1')
  apiLogout()
}

export function showSessionExpiredToast() {
  toast({
    title: 'Session Expired',
    description: 'Your session has expired. Please log in again.',
    variant: 'destructive',
  })
}
