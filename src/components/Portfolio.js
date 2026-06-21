import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa"

import { Container } from "./common"
import "./portfolio.css"
import PortfolioAction from "./PortfolioAction"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { ProjectFormModal } from "../admin/FormModals"
import { resolveImage } from "../data/imageMap"

const CodecanyonIcon = () => (
  <svg
    height="12"
    viewBox="-34.32047659 -70.74 659.48047659 705.28041072"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m467 26.32c-82.74-97.06-350.5 90.93-348.33 333.27-.02 1.48-.33 2.93-.91 4.29a11.39 11.39 0 0 1 -2.44 3.62 11.19 11.19 0 0 1 -3.63 2.45c-1.35.58-2.8.89-4.27.91-.98-.01-1.94-.14-2.88-.4-.94-.25-1.84-.63-2.68-1.11s-1.62-1.07-2.32-1.75c-.69-.68-1.3-1.44-1.8-2.27-6.8-14.83-12.2-30.26-16.11-46.1s-6.32-32.01-7.19-48.3c-.88-16.29-.22-32.63 1.97-48.8 2.18-16.16 5.89-32.09 11.06-47.56.78-2.29.74-4.78-.12-7.05a10.45 10.45 0 0 0 -11.49-6.65c-2.38.4-4.56 1.6-6.16 3.42-11.03 11.77-20.93 24.56-29.57 38.19s-15.97 28.04-21.91 43.05a258.192 258.192 0 0 0 -13.47 46.39 257.972 257.972 0 0 0 -4.56 48.1c-.39 34.25 6.05 68.23 18.96 99.95a256.996 256.996 0 0 0 56.21 84.74 256.804 256.804 0 0 0 84.66 56.28 256.458 256.458 0 0 0 99.84 18.97c365.3-8.3 280.99-487.06 207.14-573.64z"
      fill="currentColor"
    />
  </svg>
)

const Portfolio = ({ location }) => {
  const { isLoggedIn } = useAuth()
  const { data, addProject, updateProject, moveProject, deleteProject } = useData()

  const portfolios = data?.portfolios || {}
  const portfoliosName = Object.keys(portfolios)
  const [selectedCategory, setSelectedCategory] = useState(portfoliosName[0] || "Web")

  // Read category from URL when coming back from project page
  useEffect(() => {
    const search = (location && location.search) ||
      (typeof window !== "undefined" ? window.location.search : "")
    const params = new URLSearchParams(search)
    const catParam = params.get("category")
    if (catParam && portfoliosName.includes(catParam)) {
      setSelectedCategory(catParam)
    }
  }, [location && location.search])

  const [editingProject, setEditingProject] = useState(null)
  const [showAddProject, setShowAddProject] = useState(false)

  const currentList = (portfolios[selectedCategory] || []).filter(Boolean)

  const handleCategoryChange = (name) => {
    setSelectedCategory(name)
  }

  const handleCardClick = (name) => {
    navigate(`/project?name=${encodeURIComponent(name)}&category=${encodeURIComponent(selectedCategory)}`)
  }

  const handleDeleteProject = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the project "${name}"?`)) {
      deleteProject(selectedCategory, id)
    }
  }

  return (
    <div id="portfolio" className="portfolio-area">
      <Container>
        <div className="title left" style={{ height: "160px" }}>
          <p>Portfolio</p>
        </div>

        <div className="portfolios">
          {/* ── Category Tabs ── */}
          <ul className="portfolio-nav">
            {portfoliosName.map((name) => (
              <li
                key={name}
                onClick={() => handleCategoryChange(name)}
                className={name === selectedCategory ? "active" : ""}
              >
                {name}
              </li>
            ))}
          </ul>

          {isLoggedIn && (
            <button className="admin-add-floating" onClick={() => setShowAddProject(true)} style={{ marginBottom: "20px" }}>
              ➕ Add Project to {selectedCategory}
            </button>
          )}

          {/* ── Card Grid ── */}
          <div className="portfolio-grid">
            {currentList.map((portfolio, index) => {
              const imageSrc = resolveImage(portfolio.image)
              return (
                <div
                  key={portfolio.id || index}
                  className="pf-card"
                  onClick={() => handleCardClick(portfolio.name)}
                >
                  <div className="pf-card-img">
                    {imageSrc ? (
                      <img alt={portfolio.name} src={imageSrc} />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 32,
                          color: "#ccc",
                          background: "#f5f5f5",
                        }}
                      >
                        📁
                      </div>
                    )}
                    {/* View Details Overlay */}
                    <div className="pf-card-overlay">
                      <span className="pf-overlay-btn">
                        <FaExternalLinkAlt size={11} /> View Details
                      </span>
                    </div>
                  </div>

                  <div className="pf-card-body">
                    <span className="pf-card-category">{selectedCategory} Project</span>
                    <h4 className="pf-card-name">{portfolio.name}</h4>
                    <p className="pf-card-desc">{portfolio.description}</p>

                    <div className="pf-card-links" onClick={(e) => e.stopPropagation()}>
                      {portfolio.demo && (
                        <a
                          href={portfolio.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pf-icon-link"
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      {portfolio.demo3 && (
                        <a
                          href={portfolio.demo3}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pf-icon-link"
                          title="Live Demo 2"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      {portfolio.demo2 && (
                        <a
                          href={portfolio.demo2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pf-icon-link"
                          title="Codecanyon"
                        >
                          <CodecanyonIcon />
                        </a>
                      )}
                      {portfolio.source && (
                        <a
                          href={portfolio.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pf-icon-link"
                          title="Source Code"
                        >
                          <FaGithub />
                        </a>
                      )}
                    </div>
                  </div>

                  {isLoggedIn && (
                    <div className="pf-card-admin" onClick={e => e.stopPropagation()}>
                      <button className="admin-edit-btn sm" onClick={() => setEditingProject({ ...portfolio, category: selectedCategory })}>
                        ✏️ Edit
                      </button>
                      <button className="admin-edit-btn sm red" onClick={() => handleDeleteProject(portfolio.id, portfolio.name)}>
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <PortfolioAction />
        </div>
      </Container>

      {/* Add Project Modal */}
      {showAddProject && (
        <ProjectFormModal
          categories={portfoliosName}
          onSave={(newProj) => {
            // newProj already contains the category selected in modal
            addProject(newProj.category, newProj)
            setShowAddProject(false)
          }}
          onClose={() => setShowAddProject(false)}
        />
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <ProjectFormModal
          key={editingProject.id}
          initial={editingProject}
          categories={portfoliosName}
          onSave={(updatedProj) => {
            // If the category changed, atomically move from old to new category
            if (updatedProj.category !== selectedCategory) {
              moveProject(selectedCategory, updatedProj.category, editingProject.id, updatedProj)
            } else {
              updateProject(selectedCategory, editingProject.id, updatedProj)
            }
            setEditingProject(null)
          }}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  )
}

export { Portfolio }

