import React from "react"

import "./container.css"

export const Container = ({ children, padding }) => {
  return (
    <div
      style={{ padding }}
      className="section-container"
    >
      {children}
    </div>
  )
}
