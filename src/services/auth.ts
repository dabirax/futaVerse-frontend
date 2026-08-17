import type { MeResponse, User } from '@/types/user'

const authHeaders = (): Record<string, string> => {
  const token = sessionStorage.getItem('access_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getMe(): Promise<User> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
    headers: authHeaders(),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(
      error?.detail ?? error?.message ?? 'Could not load your profile.',
    )
  }

  const body: MeResponse = await res.json()
  return body.data
}
