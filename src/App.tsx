import React from "react"
import { Routes, Route } from "react-router-dom"
import IndexPage from "./pages/index"
import ProjectPage from "./pages/project"
import AdminPage from "./pages/admin"
import NotFoundPage from "./pages/404"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
