"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext<{ user: string | null }>({ user: null })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    if (typeof window === "undefined") return

    const storedUser = localStorage.getItem("user")
    setUser(storedUser)

    if (!storedUser && router && window.location.pathname !== "/authentication") {
      router.replace("/authentication") // ⬅ Use replace() instead of push()
    } else if (storedUser && router && window.location.pathname === "/authentication") {
      router.replace("/")
    }
  }, [isMounted])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
