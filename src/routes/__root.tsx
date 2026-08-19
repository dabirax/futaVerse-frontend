import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { AuthContextType } from '../hooks/auth-context'
import { NotFound } from '@/components/not-found'
import { Toaster } from '@/components/ui/toaster'

// Root route with context
export const rootRoute = createRootRouteWithContext<{
  auth: AuthContextType
}>()({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
  notFoundComponent: NotFound,
})
