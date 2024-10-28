'use client'
//create authlayout for frontend using nextauth
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
function AuthProvider ({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
