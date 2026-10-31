import React, { useState, useEffect, useMemo, useRef } from "react"
import PropTypes from "prop-types"
import { useNavigate, useLocation } from "react-router-dom"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

import { Container, Title } from "./common"
import "./portfolio.css"
import PortfolioAction from "./PortfolioAction"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { ProjectFormModal } from "../admin/FormModals"
import { resolveImage } from "../data/imageMap"
import { projectPath } from "../utils/slug"
import { getVisiblePortfolios } from "../utils/projects"

const CodecanyonIcon = () => (
  <svg
    height="12"
    viewBox="-34.32047659 -70.74 659.48047659 705.28041072"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="m467 26.32c-82.74-97.06-350.5 90.93-348.33 333.27-.02 1.48-.33 2.93-.91 4.29a11.39 11.39 0 0 1 -2.44 3.62 11.19 11.19 0 0 1 -3.63 2.45c-1.35.58-2.8.89-4.27.91-.98-.01-1.94-.14-2.88-.4-.94-.25-1.84-.63-2.68-1.11s-1.62-1.07-2.32-1.75c-.69-.68-1.3-1.44-1.8-2.27-6.8-14.83-12.2-30.26-16.11-46.1s-6.32-32.01-7.19-48.3c-.88-16.29-.22-32.63 1.97-48.8 2.18-16.16 5.89-32.09 11.06-47.56.78-2.29.74-4.78-.12-7.05a10.45 10.45 0 0 0 -11.49-6.65c-2.38.4-4.56 1.6-6.16 3.42-11.03 11.77-20.93 24.56-29.57 38.19s-15.97 28.04-21.91 43.05a258.192 258.192 0 0 0 -13.47 46.39 257.972 257.972 0 0 0 -4.56 48.1c-.39 34.25 6.05 68.23 18.96 99.95a256.996 256.996 0 0 0 56.21 84.74 256.804 256.804 0 0 0 84.66 56.28 256.458 256.458 0 0 0 99.84 18.97c365.3-8.3 280.99-487.06 207.14-573.64z"
      fill="currentColor"
    />
  </svg>
)

const onActivate = (handler) => (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault()
    handler(e)
  }
}

const ProjectLink = ({ href, title, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="pf-icon-link"
    title={title}
  >
    {children}
  </a>
)

ProjectLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const ProjectLinks = ({ portfolio }) => (
  <div className="pf-card-links">
    {portfolio.demo && (
      <ProjectLink href={portfolio.demo} title="Live Demo">
        <FaExternalLinkAlt />
      </ProjectLink>
    )}
    {portfolio.demo3 && (
      <ProjectLink href={portfolio.demo3} title="Live Demo 2">
        <FaExternalLinkAlt />
      </ProjectLink>
    )}
    {portfolio.demo2 && (
      <ProjectLink href={portfolio.demo2} title="Codecanyon">
        <CodecanyonIcon />
      </ProjectLink>
    )}
    {portfolio.source && (
      <ProjectLink href={portfolio.source} title="Source Code">
        <FaGithub />
      </ProjectLink>
    )}
  </div>
)

ProjectLinks.propTypes = {
  portfolio: PropTypes.shape({
    demo: PropTypes.string,
    demo2: PropTypes.string,
    demo3: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
}

const getDragProps = (isAdmin, handlers, index) => {
  if (!isAdmin) return {}
  return {
    draggable: true,
    onDragStart: (e) => handlers.start(e, index),
    onDragOver: (e) => handlers.over(e, index),
    onDragLeave: handlers.leave,
    onDrop: (e) => handlers.drop(e, index),
    onDragEnd: handlers.end,
  }
}

const CardImage = ({ src, alt }) => (
  <div className="pf-card-img">
    {src ? <img alt={alt} src={src} /> : <div className="pf-card-img-placeholder">📁</div>}
    <div className="pf-card-overlay">
      <span className="pf-overlay-btn">
        <FaExternalLinkAlt size={11} /> View Details
      </span>
    </div>
  </div>
)

CardImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
}

const CardAdminActions = ({ onEdit, onDelete }) => (
  <div className="pf-card-admin">
    <button type="button" className="admin-edit-btn sm" onClick={onEdit}>
      ✏️ Edit
    </button>
    <button type="button" className="admin-edit-btn sm red" onClick={onDelete}>
      🗑️ Delete
    </button>
  </div>
)

CardAdminActions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

const ProjectCard = ({
  portfolio,
  category,
  index,
  isAdmin,
  isDragging,
  isOver,
  dragHandlers,
  onOpen,
  onEdit,
  onDelete,
}) => {
  const className = ["pf-card", isDragging && "pf-card--dragging", isOver && "pf-card--drag-over"]
    .filter(Boolean)
    .join(" ")

  // Clicks on links, buttons and the drag handle must not open the project
  const handleCardClick = (e) => {
    if (isDragging || e.target.closest("a, button, .pf-card-drag-handle")) return
    onOpen(portfolio)
  }

  return (
    <div // NOSONAR - mouse convenience only; keyboard users use the title button below
      className={className}
      onClick={handleCardClick}
      {...getDragProps(isAdmin, dragHandlers, index)}
    >
      {isAdmin && (
        <div className="pf-card-drag-handle" title="Drag to reorder">
          ⠿
        </div>
      )}

      <CardImage src={resolveImage(portfolio.image)} alt={portfolio.name} />

      <div className="pf-card-body">
        <span className="pf-card-category">{category} Project</span>
        <h4 className="pf-card-name">
          <button type="button" className="pf-card-name-btn" onClick={() => onOpen(portfolio)}>
            {portfolio.name}
          </button>
        </h4>
        <p className="pf-card-desc">{portfolio.summary || portfolio.description}</p>

        <ProjectLinks portfolio={portfolio} />
      </div>

      {isAdmin && (
        <CardAdminActions onEdit={() => onEdit(portfolio)} onDelete={() => onDelete(portfolio)} />
      )}
    </div>
  )
}

ProjectCard.propTypes = {
  portfolio: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  isDragging: PropTypes.bool,
  isOver: PropTypes.bool,
  dragHandlers: PropTypes.shape({
    start: PropTypes.func,
    over: PropTypes.func,
    leave: PropTypes.func,
    drop: PropTypes.func,
    end: PropTypes.func,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

const Portfolio = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { isLoggedIn } = useAuth()
  const { data, addProject, updateProject, moveProject, deleteProject, reorderProjects } = useData()

  // Hidden projects and empty tabs (e.g. "Others") are filtered out; projects are sorted by their "order" field
  const portfolios = useMemo(() => getVisiblePortfolios(data?.portfolios), [data])
  const portfoliosName = useMemo(() => Object.keys(portfolios), [portfolios])
  const allCategories = useMemo(() => Object.keys(data?.portfolios || {}), [data])
  const [selectedCategory, setSelectedCategory] = useState(portfoliosName[0] || "Web")

  // Read category from URL when coming back from project page
  useEffect(() => {
    const catParam = new URLSearchParams(search).get("category")
    if (catParam && portfoliosName.includes(catParam)) {
      setSelectedCategory(catParam)
    }
  }, [search, portfoliosName])

  const [editingProject, setEditingProject] = useState(null)
  const [showAddProject, setShowAddProject] = useState(false)

  // ── Drag state ─────────────────────────────────────────────────────────────
  const dragSrcIndex = useRef(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [draggingIndex, setDraggingIndex] = useState(null)

  const handleDragStart = (e, index) => {
    dragSrcIndex.current = index
    setDraggingIndex(index)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", String(index))
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (index !== dragOverIndex) setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    const srcIndex = dragSrcIndex.current
    if (srcIndex === null || srcIndex === dropIndex) {
      setDragOverIndex(null)
      setDraggingIndex(null)
      return
    }
    const list = [...(portfolios[selectedCategory] || [])]
    const [moved] = list.splice(srcIndex, 1)
    list.splice(dropIndex, 0, moved)
    reorderProjects(selectedCategory, list)
    setDragOverIndex(null)
    setDraggingIndex(null)
    dragSrcIndex.current = null
  }

  const handleDragEnd = () => {
    setDragOverIndex(null)
    setDraggingIndex(null)
    dragSrcIndex.current = null
  }
  // ──────────────────────────────────────────────────────────────────────────

  const dragHandlers = {
    start: handleDragStart,
    over: handleDragOver,
    leave: handleDragLeave,
    drop: handleDrop,
    end: handleDragEnd,
  }

  const currentList = portfolios[selectedCategory] || []

  const handleCategoryChange = (name) => {
    setSelectedCategory(name)
  }

  const handleCardClick = (project) => {
    navigate(projectPath(project))
  }

  const handleAddSave = (newProj) => {
    addProject(newProj.category, newProj)
    setShowAddProject(false)
  }

  const handleEditSave = (updatedProj) => {
    if (updatedProj.category === selectedCategory) {
      updateProject(selectedCategory, editingProject.id, updatedProj)
    } else {
      moveProject(selectedCategory, updatedProj.category, editingProject.id, updatedProj)
    }
    setEditingProject(null)
  }

  const handleDeleteProject = (id, name) => {
    if (globalThis.confirm(`Are you sure you want to delete the project "${name}"?`)) {
      deleteProject(selectedCategory, id)
    }
  }

  return (
    <div id="portfolio" className="portfolio-area">
      <Container>
        <Title title="Projects" />

        <div className="portfolios">
          {/* ── Category Tabs ── */}
          <ul className="portfolio-nav" role="tablist">
            {portfoliosName.map((name) => (
              <li
                key={name}
                role="tab"
                tabIndex={0}
                aria-selected={name === selectedCategory}
                onClick={() => handleCategoryChange(name)}
                onKeyDown={onActivate(() => handleCategoryChange(name))}
                className={name === selectedCategory ? "active" : ""}
              >
                {name}
              </li>
            ))}
          </ul>

          {isLoggedIn && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
              <button className="admin-add-floating" onClick={() => setShowAddProject(true)}>
                ➕ Add Project to {selectedCategory}
              </button>
              <span style={{
                fontSize: "12px",
                color: "#9ca3af",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: "#f9fafb",
                border: "1px dashed #d1d5db",
                borderRadius: "6px",
                padding: "4px 10px",
              }}>
                ⠿ Drag cards to reorder
              </span>
            </div>
          )}

          {/* ── Card Grid ── */}
          <div className="portfolio-grid">
            {currentList.map((portfolio, index) => (
              <ProjectCard
                key={portfolio.id || portfolio.name}
                portfolio={portfolio}
                category={selectedCategory}
                index={index}
                isAdmin={isLoggedIn}
                isDragging={draggingIndex === index}
                isOver={dragOverIndex === index && draggingIndex !== index}
                dragHandlers={dragHandlers}
                onOpen={handleCardClick}
                onEdit={(p) => setEditingProject({ ...p, category: selectedCategory })}
                onDelete={(p) => handleDeleteProject(p.id, p.name)}
              />
            ))}
          </div>

          <PortfolioAction />
        </div>
      </Container>

      {/* Add Project Modal */}
      {showAddProject && (
        <ProjectFormModal
          categories={allCategories}
          onSave={handleAddSave}
          onClose={() => setShowAddProject(false)}
        />
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <ProjectFormModal
          key={editingProject.id}
          initial={editingProject}
          categories={allCategories}
          onSave={handleEditSave}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  )
}

export { Portfolio }
