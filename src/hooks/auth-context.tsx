// src/hooks/AuthContext.tsx
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type AuthContextType = {
  isLoggedIn: boolean
  role: string | null
  token: string | null
  refreshToken: string | null
  login: (token: string, role: string, refreshToken?: string) => void
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
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!sessionStorage.getItem('access_token'),
  )

  const login = (
    newToken: string,
    newRole: string,
    newRefreshToken?: string,
  ) => {
    sessionStorage.setItem('access_token', newToken)
    if (newRefreshToken)
      sessionStorage.setItem('refresh_token', newRefreshToken)
    sessionStorage.setItem('role', newRole)
    setToken(newToken)
    setRefreshToken(newRefreshToken ?? sessionStorage.getItem('refresh_token'))
    setRole(newRole)
    setIsLoggedIn(true)
  }

  const logout = () => {
    sessionStorage.clear()
    setToken(null)
    setRefreshToken(null)
    setRole(null)
    setIsLoggedIn(false)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, token, refreshToken, login, logout }}
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
