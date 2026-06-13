import React, { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import "./admin.css"

export default function AdminBar() {
  const { logout } = useAuth()
  const { exportJSON, resetData } = useData()

  // Add/remove body class to offset fixed navbar
  useEffect(() => {
    document.body.classList.add("admin-mode")
    return () => document.body.classList.remove("admin-mode")
  }, [])

  const handleReset = () => {
    if (window.confirm("Reset all data to original? This cannot be undone.")) {
      resetData()
    }
  }

  return (
    <div className="admin-bar">
      <div className="admin-bar-left">
        <span>✏️</span>
        <span className="admin-bar-badge">Admin Mode</span>
        <span style={{ opacity: 0.7, fontWeight: 400 }}>Click the ✏️ icons to edit any section</span>
      </div>
      <div className="admin-bar-right">
        <button className="admin-bar-btn export" onClick={exportJSON} title="Download updated data.json">
          ⬇ Export JSON
        </button>
        <button className="admin-bar-btn" onClick={handleReset} title="Reset to original data">
          ↺ Reset
        </button>
        <button className="admin-bar-btn danger" onClick={logout}>
          ⏻ Logout
        </button>
      </div>
    </div>
  )
}
