import type { MeResponse, User } from '@/types/user'
import { fetchWithAuth } from '@/lib/api'

export async function getMe(): Promise<User> {
  const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/auth/me`)

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(
      error?.detail ?? error?.message ?? 'Could not load your profile.',
    )
  }

  const body: MeResponse = await res.json()
  return body.data
}
