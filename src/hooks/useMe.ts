import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { User } from '@/types/user'
import { getMe } from '@/services/auth'

export const SESSION_UPDATED_EVENT = 'futaverse:session-updated'

const setOrRemove = (key: string, value: string | null) => {
  if (value) sessionStorage.setItem(key, value)
  else sessionStorage.removeItem(key)
}

export const hydrateUserSession = (user: User) => {
  const { profile, role, sqid } = user
  setOrRemove('profile_img', profile.profile_img_url)
  setOrRemove('firstname', profile.firstname)
  setOrRemove('lastname', profile.lastname)
  setOrRemove('role', role)
  setOrRemove('user_sqid', sqid)
  window.dispatchEvent(new Event(SESSION_UPDATED_EVENT))
}

export const useMe = () => {
  const query = useQuery<User>({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (query.data) hydrateUserSession(query.data)
  }, [query.data])

  return query
}
