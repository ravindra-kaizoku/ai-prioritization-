import { createContext } from 'react'

import type { User, UserRole } from '@/types/domain'

export interface AuthContextValue {
  user: User | null
  token: string | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  register: (payload: { name: string; email: string; password: string; role: UserRole; studentId?: string }) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
