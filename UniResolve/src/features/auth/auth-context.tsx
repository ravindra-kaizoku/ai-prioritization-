import { useMemo, useState, type PropsWithChildren } from 'react'

import { AuthContext, type AuthContextValue } from '@/features/auth/auth-store'
import { api } from '@/lib/api'
import type { User } from '@/types/domain'

function readStoredUser() {
  const raw = localStorage.getItem('uniresolve_user')
  return raw ? (JSON.parse(raw) as User) : null
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(readStoredUser)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('uniresolve_token'))

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      async login(email, password, role) {
        const result = await api.login(email, password, role)
        localStorage.setItem('uniresolve_token', result.token)
        localStorage.setItem('uniresolve_user', JSON.stringify(result.user))
        setToken(result.token)
        setUser(result.user)
      },
      async register(payload) {
        const result = await api.register(payload)
        localStorage.setItem('uniresolve_token', result.token)
        localStorage.setItem('uniresolve_user', JSON.stringify(result.user))
        setToken(result.token)
        setUser(result.user)
      },
      logout() {
        localStorage.removeItem('uniresolve_token')
        localStorage.removeItem('uniresolve_user')
        setToken(null)
        setUser(null)
      },
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
