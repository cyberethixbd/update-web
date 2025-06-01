"use client"

import type React from "react"
import { SessionProvider } from "next-auth/react"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      // Reduce refetch frequency to avoid API overload
      refetchInterval={5 * 60} // 5 minutes
      refetchOnWindowFocus={false}
      // Handle session errors gracefully
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  )
}
