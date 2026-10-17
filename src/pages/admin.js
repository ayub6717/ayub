import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoginModal from "../admin/LoginModal"

export default function AdminPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn])

  if (isLoggedIn) return null

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top left, #1e1e30, #0f0f1a)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <LoginModal onClose={() => navigate("/")} />
    </div>
  )
}
