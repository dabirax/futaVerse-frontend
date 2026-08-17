// src/hooks/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { SESSION_UPDATED_EVENT } from '@/hooks/useMe'

export type AuthContextType = {
  isLoggedIn: boolean
  role: string | null
  token: string | null
  refreshToken: string | null
  userSqid: string | null
  login: (
    token: string,
    role: string,
    refreshToken?: string,
    userSqid?: string,
  ) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem('access_token'),
  )
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    sessionStorage.getItem('refresh_token'),
  )
  const [role, setRole] = useState<string | null>(() =>
    sessionStorage.getItem('role'),
  )
  const [userSqid, setUserSqid] = useState<string | null>(() =>
    sessionStorage.getItem('user_sqid'),
  )
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!sessionStorage.getItem('access_token'),
  )

  useEffect(() => {
    const sync = () => {
      setRole(sessionStorage.getItem('role'))
      setUserSqid(sessionStorage.getItem('user_sqid'))
    }
    window.addEventListener(SESSION_UPDATED_EVENT, sync)
    return () => window.removeEventListener(SESSION_UPDATED_EVENT, sync)
  }, [])

  const login = (
    newToken: string,
    newRole: string,
    newRefreshToken?: string,
    newUserSqid?: string,
  ) => {
    sessionStorage.setItem('access_token', newToken)
    if (newRefreshToken)
      sessionStorage.setItem('refresh_token', newRefreshToken)
    sessionStorage.setItem('role', newRole)
    if (newUserSqid) sessionStorage.setItem('user_sqid', newUserSqid)
    setToken(newToken)
    setRefreshToken(newRefreshToken ?? sessionStorage.getItem('refresh_token'))
    setRole(newRole)
    setUserSqid(newUserSqid ?? sessionStorage.getItem('user_sqid'))
    setIsLoggedIn(true)
  }

  const logout = () => {
    sessionStorage.clear()
    setToken(null)
    setRefreshToken(null)
    setRole(null)
    setUserSqid(null)
    setIsLoggedIn(false)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        role,
        token,
        refreshToken,
        userSqid,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
