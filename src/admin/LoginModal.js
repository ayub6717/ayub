import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import "./admin.css"

export default function LoginModal({ onClose }) {
  const { login, loginError, setLoginError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = login(email, password)
    if (ok && onClose) onClose()
  }

  const handleClose = () => {
    setLoginError("")
    onClose && onClose()
  }

  return (
    <div className="admin-modal-overlay" onClick={handleClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <button className="admin-modal-close" onClick={handleClose}>✕</button>

        <div className="admin-modal-logo">🔐</div>
        <h2 className="admin-modal-title">Admin Login</h2>
        <p className="admin-modal-sub">Sign in to manage portfolio content</p>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input
              type="email"
              className="admin-form-input"
              placeholder="admin@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <input
              type="password"
              className="admin-form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {loginError && <p className="admin-form-error">⚠ {loginError}</p>}
          <button type="submit" className="admin-submit-btn">Sign In</button>
        </form>
      </div>
    </div>
  )
}
