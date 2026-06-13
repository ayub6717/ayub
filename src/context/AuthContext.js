import React, { createContext, useContext, useState, useEffect } from "react"

const ADMIN_EMAIL = "ayub.devs@gmail.com"
const ADMIN_PASS  = "ayub@6717"
const STORAGE_KEY = "ayub_admin_session"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState("")

  // Restore session on mount (sessionStorage clears on tab close)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored === "true") setIsLoggedIn(true)
    }
  }, [])

  const login = (email, password) => {
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsLoggedIn(true)
      setLoginError("")
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, "true")
      }
      return true
    }
    setLoginError("Invalid email or password.")
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loginError, setLoginError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
