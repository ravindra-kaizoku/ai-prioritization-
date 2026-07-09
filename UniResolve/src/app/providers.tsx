import type { ReactNode } from 'react'

import { AuthProvider } from '@/features/auth/auth-context'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>
}
