import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type ForgotPasswordState = {
  email: string | null
  token: string | null
  setEmail: (email: string) => void
  setToken: (token: string | null) => void
  reset: () => void
}

export const useForgotPasswordStore = create<ForgotPasswordState>()(
  persist(
    (set) => ({
      email: null,
      token: null,
      setEmail: (email) => set({ email }),
      setToken: (token) => set({ token }),
      reset: () => set({ email: null, token: null }),
    }),
    {
      name: 'forgot-password-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
