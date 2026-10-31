import React, { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLock,
  FaUser,
  FaUserShield,
  FaArrowLeft,
  FaCopy,
  FaCheck,
  FaBriefcase,
  FaCalendarAlt,
  FaBuilding,
  FaFolderOpen,
} from "react-icons/fa"
import { SEO, Layout } from "../components/common"
import Navbar from "../components/Navbar"
import "../components/project-page.css"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { resolveImage } from "../data/imageMap"
import { slugify, getSlug, projectPath } from "../utils/slug"
import AdminBar from "../admin/AdminBar"
import { SKILL_ICONS } from "../data/skillIcons"
import { ProjectFormModal } from "../admin/FormModals"

/* ─── Tech Icon Lookup ────────────────────────────────────────── */
// Maps data.json techStack names → SKILL_ICONS keys
// Alias check runs FIRST so "React" → "React Js" (same icon as Skills section)
const TECH_NAME_ALIAS = {
  // React — force to "React Js" to match Skills section icon
  "react": "React Js",
  "react js": "React Js",
  "reactjs": "React Js",
  "tanstack query": "TanStack Query",
  "react bootstrap": "React Bootstrap",
  "react native": "React Native",
  // Next.js variants
  "next.js": "Next Js",
  "nextjs": "Next Js",
  "next js": "Next Js",
  // Node
  "node.js": "Node JS",
  "nodejs": "Node JS",
  // CSS / styling
  "tailwindcss": "Tailwind CSS",
  "tailwind": "Tailwind CSS",
  "sass": "Sass/SCSS",
  "scss": "Sass/SCSS",
  "sass/scss": "Sass/SCSS",
  "css modules": "CSS",
  "css3": "CSS",
  "html5": "HTML",
  // Alpine
  "alpine js": "Alpine Js",
  "alpine.js": "Alpine Js",
  "alpinejs": "Alpine Js",
  // Git
  "git, github": "Git, Github",
  "github": "Git, Github",
  // jQuery
  "jquery": "jQuery",
  "jquery mobile": "jQuery",
  // Tools
  "vs code": "Visual Studio Code",
  "vscode": "Visual Studio Code",
  // Cloud / DevOps
  "azure devops": "Azure",
  // UI libs
  "material ui": "Material UI",
  "mui": "Material UI",
  // Bootstrap
  "bootstrap 5": "Bootstrap",
  // Others
  "redux toolkit": "Redux",
  "rtk query": "Redux",
  ".net": ".NET",
  "c#": "C++",
  "rest api": "Postman",
}

function getTechIcon(techName) {
  if (!techName) return null
  const lower = techName.toLowerCase()
  // Alias check FIRST — ensures e.g. "React" uses "React Js" icon, not the other React SVG
  const aliasKey = TECH_NAME_ALIAS[lower]
  if (aliasKey && SKILL_ICONS[aliasKey]) return SKILL_ICONS[aliasKey]
  // Direct match fallback
  if (SKILL_ICONS[techName]) return SKILL_ICONS[techName]
  return null
}


/* ─── Copy Button Component ───────────────────────────────────── */
const CopyButton = ({ text }) => {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className={`copy-btn ${copied ? "copied" : ""}`}
      title="Copy to clipboard"
    >
      {copied ? <FaCheck size={10} /> : <FaCopy size={10} />}
    </button>
  )
}

/* ─── Icon Components ─────────────────────────────────────────── */
const CodecanyonIcon = () => (
  <svg height="14" viewBox="-34.32047659 -70.74 659.48047659 705.28041072" width="14" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "4px" }}>
    <path d="m467 26.32c-82.74-97.06-350.5 90.93-348.33 333.27-.02 1.48-.33 2.93-.91 4.29a11.39 11.39 0 0 1 -2.44 3.62 11.19 11.19 0 0 1 -3.63 2.45c-1.35.58-2.8.89-4.27.91-.98-.01-1.94-.14-2.88-.4-.94-.25-1.84-.63-2.68-1.11s-1.62-1.07-2.32-1.75c-.69-.68-1.3-1.44-1.8-2.27-6.8-14.83-12.2-30.26-16.11-46.1s-6.32-32.01-7.19-48.3c-.88-16.29-.22-32.63 1.97-48.8 2.18-16.16 5.89-32.09 11.06-47.56.78-2.29.74-4.78-.12-7.05a10.45 10.45 0 0 0 -11.49-6.65c-2.38.4-4.56 1.6-6.16 3.42-11.03 11.77-20.93 24.56-29.57 38.19s-15.97 28.04-21.91 43.05a258.192 258.192 0 0 0 -13.47 46.39 257.972 257.972 0 0 0 -4.56 48.1c-.39 34.25 6.05 68.23 18.96 99.95a256.996 256.996 0 0 0 56.21 84.74 256.804 256.804 0 0 0 84.66 56.28 256.458 256.458 0 0 0 99.84 18.97c365.3-8.3 280.99-487.06 207.14-573.64z" fill="currentColor" />
  </svg>
)

const CheckSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: "11px", height: "11px" }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const SectionIcon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "17px", height: "17px" }}>
    <path d={d} />
  </svg>
)

/* ─── Dummy Data Generator ────────────────────────────────────── */
function getProjectSections(project, category) {
  const name = project.name

  const defaultFeatures = project.features || [
    "Fully responsive layout across all devices and screen sizes",
    "Modular component architecture for high maintainability",
    "Optimized asset loading and lazy image rendering",
    "Role-based access control for Admin and User panels",
    "Real-time data sync with API integration",
    "Cross-browser compatible — Chrome, Firefox, Safari, Edge",
  ]

  const techStack = project.techStack || (() => {
    const map = {
      "React": { icon: "⚛️", type: "UI Library" },
      "Redux": { icon: "🔄", type: "State Management" },
      "Tailwind CSS": { icon: "🎨", type: "Styling" },
      "Bootstrap": { icon: "🅱️", type: "CSS Framework" },
      "JavaScript": { icon: "🟡", type: "Language" },
      "PHP": { icon: "🐘", type: "Backend" },
      "jQuery": { icon: "💫", type: "DOM Library" },
      "CSS": { icon: "🎨", type: "Styling" },
      "HTML": { icon: "🌐", type: "Markup" },
      "Node.js": { icon: "🟢", type: "Runtime" },
      "React Native": { icon: "📱", type: "Mobile Framework" },
    }
    const found = []
    for (const [tech, meta] of Object.entries(map)) {
      if (project.description && project.description.toLowerCase().includes(tech.toLowerCase())) {
        found.push({ name: tech, ...meta })
      }
    }
    if (found.length === 0) {
      return [
        { name: "React", icon: "⚛️", type: "UI Library" },
        { name: "JavaScript", icon: "🟡", type: "Language" },
        { name: "CSS Modules", icon: "🎨", type: "Styling" },
        { name: "REST API", icon: "🔗", type: "Integration" },
      ]
    }
    return found
  })()

  const challenges = project.challenges || [
    {
      problem: "Complex state management across deeply nested component trees caused prop-drilling issues and unexpected re-renders.",
      solution: "Introduced Redux Toolkit with selectors to centralize data flow and memoize expensive computations efficiently.",
    },
    {
      problem: "Performance degraded on large datasets with hundreds of items rendered simultaneously in the product list views.",
      solution: "Implemented virtualized list rendering and pagination to limit visible DOM nodes and keep scroll buttery-smooth.",
    },
    {
      problem: "Consistent cross-browser UI inconsistencies, especially in older Firefox and Edge versions.",
      solution: "Adopted a CSS reset layer, tested on BrowserStack, and added targeted browser-specific polyfills where needed.",
    },
  ]

  const archCards = project.archCards || [
    {
      title: "Frontend Layer",
      body: `Built with ${techStack[0]?.name || "React"}, organized into feature-based modules. Each feature owns its own components, hooks, and styles for clean separation of concerns.`,
    },
    {
      title: "State Management",
      body: "Global state handled via Redux with a normalized store shape. Server state cached using custom hooks for efficient API reuse without redundant calls.",
    },
    {
      title: "Backend Integration",
      body: "RESTful API consumption through a centralized Axios instance with request interceptors for auth headers, error handling, and loading state automation.",
    },
  ]

  const roleCards = project.roleCards || [
    {
      title: "UI Development",
      body: `Led the complete frontend implementation of ${name} from scratch — component design, layout system, and pixel-perfect conversion from Figma mockups.`,
    },
    {
      title: "Integration",
      body: "Integrated all backend APIs for authentication, data fetching, and CRUD operations. Wrote reusable API hooks consumed across the entire application.",
    },
    {
      title: "Performance",
      body: "Profiled the app using React DevTools and Chrome Lighthouse. Reduced initial load time by 40% through code splitting and lazy loading.",
    },
  ]

  const impact = [
    { value: "40%", label: "Faster Load Time" },
    { value: "2×", label: "Dev Efficiency" },
    { value: "98", label: "Lighthouse Score" },
    { value: "5★", label: "Client Rating" },
  ]

  const lessons = project.lessons || [
    { text: "Plan component structure early. Spending extra time on architecture upfront saved weeks of refactoring down the line." },
    { text: "Accessibility matters from day one. Retrofitting ARIA roles and keyboard navigation after the fact is far more expensive than building it in." },
    { text: "Design systems pay dividends. Building reusable tokens and components early made every feature sprint faster and more consistent." },
    { text: "Test in real browsers. Emulators and automated tests don't catch everything — real device testing revealed UI bugs that would have reached production." },
  ]

  return { defaultFeatures, techStack, challenges, archCards, roleCards, impact, lessons }
}

/* ─── Main Page Component ─────────────────────────────────────── */
export default function ProjectPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()
  const { isLoggedIn } = useAuth()
  const { data, updateProject, moveProject } = useData()
  const [project, setProject] = useState(null)
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [editingProject, setEditingProject] = useState(null)

  const portfolios = data?.portfolios || {}

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Resolve image list using resolveImage helper
  const rawImages = project?.images?.length > 0 ? project.images : (project?.image ? [project.image] : [])
  const projectImages = rawImages.map(img => resolveImage(img)).filter(Boolean)

  const prevImg = () => setActiveImgIndex(i => (projectImages.length ? (i - 1 + projectImages.length) % projectImages.length : 0))
  const nextImg = () => setActiveImgIndex(i => (projectImages.length ? (i + 1) % projectImages.length : 0))

  useEffect(() => {
    if (!isLightboxOpen) return
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false)
      } else if (e.key === "ArrowLeft") {
        prevImg()
      } else if (e.key === "ArrowRight") {
        nextImg()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, projectImages.length])

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isLightboxOpen])

  useEffect(() => {
    if (typeof window !== "undefined" && data) {
      // New style: /project/<slug>. Legacy: /project?name=...&category=...
      const params = new URLSearchParams(window.location.search)
      const nameParam = params.get("name")
      const categoryParam = params.get("category")
      const wanted = slug || slugify(nameParam || "")
      if (wanted) {
        let foundProj = null, foundCat = ""
        // Prefer category from URL param if provided
        if (categoryParam && portfolios[categoryParam]) {
          const match = portfolios[categoryParam].filter(Boolean).find(p => getSlug(p) === wanted)
          if (match) { foundProj = match; foundCat = categoryParam }
        }
        // Fallback: search all categories
        if (!foundProj) {
          for (const [catName, list] of Object.entries(portfolios)) {
            const match = list.filter(Boolean).find(p => getSlug(p) === wanted)
            if (match) { foundProj = match; foundCat = catName; break }
          }
        }
        setProject(foundProj)
        setCategory(foundCat)
        // Old query-string link -> clean URL
        if (!slug && foundProj) navigate(projectPath(foundProj), { replace: true })
      }
      setLoading(false)
    }
  }, [location, data, portfolios])

  // ── Tech Stack drag-and-drop state (must be before early returns) ──
  const [techStackList, setTechStackList] = useState([])
  const techDragSrc = useRef(null)
  const [techDraggingIdx, setTechDraggingIdx] = useState(null)
  const [techOverIdx, setTechOverIdx] = useState(null)

  // Keep local list in sync when project loads / reloads
  useEffect(() => {
    if (project) {
      const { techStack } = getProjectSections(project, category)
      setTechStackList(techStack)
    }
  }, [project])

  if (loading) return (
    <Layout noFooter><Navbar />
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h3>Loading…</h3>
      </div>
    </Layout>
  )

  if (!project) return (
    <Layout noFooter><Navbar />
      <SEO title="Not Found" />
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <h2>Project Not Found</h2>
        <Link to="/" style={{ color: "#a16c8d", fontWeight: 600 }}>← Back to Home</Link>
      </div>
    </Layout>
  )

  const { defaultFeatures, techStack, challenges, archCards, roleCards, impact, lessons } = getProjectSections(project, category)
  const hasCredentials = project.adminLog || project.userLog || project.pass
  // Construct exactly 4 thumbnails
  const thumbs = []
  if (projectImages.length > 0) {
    for (let i = 0; i < 4; i++) {
      const idx = i % projectImages.length
      thumbs.push({
        src: projectImages[idx],
        index: idx,
      })
    }
  }

  // Parse tech chips from description
  const techChips = techStack.map(t => t.name)

  // ── Tech Stack drag handlers ──────────────────────────────────────
  const handleTechDragStart = (e, index) => {
    techDragSrc.current = index
    setTechDraggingIdx(index)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", String(index))
  }
  const handleTechDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (index !== techOverIdx) setTechOverIdx(index)
  }
  const handleTechDragLeave = () => setTechOverIdx(null)
  const handleTechDrop = (e, dropIndex) => {
    e.preventDefault()
    const srcIndex = techDragSrc.current
    if (srcIndex === null || srcIndex === dropIndex) {
      setTechOverIdx(null); setTechDraggingIdx(null); return
    }
    const newList = [...techStackList]
    const [moved] = newList.splice(srcIndex, 1)
    newList.splice(dropIndex, 0, moved)
    setTechStackList(newList)
    updateProject(category, project.id, { techStack: newList })
    setTechOverIdx(null); setTechDraggingIdx(null)
    techDragSrc.current = null
  }
  const handleTechDragEnd = () => {
    setTechOverIdx(null); setTechDraggingIdx(null)
    techDragSrc.current = null
  }
  // ────────────────────────────────────────────────────────────────

  // Metadata
  const metaItems = [
    { label: "Role", value: project.role || "Front-End Developer", icon: <FaBriefcase /> },
    { label: "Category", value: `${category} Project`, icon: <FaFolderOpen /> },
    { label: "Timeline", value: project.timeline, icon: <FaCalendarAlt /> },
    { label: "Company", value: project.client, icon: <FaBuilding /> },
  ]


  return (
    <Layout noFooter>
      {isLoggedIn && <AdminBar />}
      <Navbar />

      <SEO title={`${project.name} | Project Details`} />
      <div className="project-detail-wrapper">

        {/* Back Button */}
        <div className="project-detail-nav">
          <Link to={`/?category=${encodeURIComponent(category)}#portfolio`} className="project-back-btn">
            <FaArrowLeft size={11} /> Back to Projects
          </Link>
        </div>

        {/* ── HEADER: Project Name & Tag ───────────────────────── */}
        <div className="project-header-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span className="project-tag">{category} Project</span>
            <h1 className="project-title" style={{ margin: 0 }}>{project.name}</h1>
          </div>
          {isLoggedIn && (
            <button
              className="admin-edit-btn"
              style={{
                background: "linear-gradient(135deg, #6d28d9, #a78bfa)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 10px rgba(109, 40, 217, 0.15)",
                transition: "all 0.2s ease"
              }}
              onClick={() => setEditingProject({ ...project, category })}
            >
              ✏️ Edit Project Details
            </button>
          )}
        </div>

        {/* ── GALLERY: Main Slider + 4 Thumbnails ──────────────── */}
        <div className="project-gallery-section">
          {/* Left: Main Slider Mockup */}
          <div className="project-browser-frame">
            <div className="project-browser-chrome">
              <span className="project-browser-dot red" />
              <span className="project-browser-dot yellow" />
              <span className="project-browser-dot green" />
              <span className="project-browser-address">
                {project.demo || project.source || (project.showDemo2InBar && project.demo2) || "https://example.com"}
              </span>
            </div>
            <div
              className="project-browser-content browser-clickable"
              onClick={() => setIsLightboxOpen(true)}
              style={{ cursor: "zoom-in", position: "relative" }}
              title="Click to zoom image"
            >
              {projectImages[activeImgIndex] && (
                <img alt={project.name} src={projectImages[activeImgIndex]} />
              )}
              <div className="browser-zoom-overlay">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
            {projectImages.length > 1 && (
              <div className="project-slider-controls">
                <button className="slider-arrow" onClick={prevImg} aria-label="Previous">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <div className="slider-dots">
                  {projectImages.map((_, i) => (
                    <button key={i} className={`slider-dot${i === activeImgIndex ? " active" : ""}`} onClick={() => setActiveImgIndex(i)} />
                  ))}
                </div>
                <button className="slider-arrow" onClick={nextImg} aria-label="Next">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Right: 2×2 Thumbnail Grid — equal height as left */}
          {!project.hideThumbs && (
            <div className="project-thumbnails-grid">
              {thumbs.map((thumb, idx) => (
                <button
                  key={idx}
                  className={`project-thumbnail-item ${activeImgIndex === thumb.index ? "active" : ""}`}
                  onClick={() => setActiveImgIndex(thumb.index)}
                  aria-label={`View slide ${thumb.index + 1}`}
                >
                  <img src={thumb.src} alt={`${project.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── DESCRIPTION SECTION (full-width) ──────────────────────────── */}
        <div className="project-desc-section">
          <p className="project-overview-text">{project.description}</p>
          {project.soon && (
            <p className="project-soon-note">⏳ {project.soon}</p>
          )}
          {/* Action Buttons */}
          <div className="project-action-buttons">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-btn solid">
                <FaExternalLinkAlt size={11} /> {project.demoLabel || "Live Demo"}
              </a>
            )}
            {project.demo3 && (
              <a href={project.demo3} target="_blank" rel="noopener noreferrer" className="project-btn outline">
                <FaExternalLinkAlt size={11} /> Live Demo 2
              </a>
            )}
            {project.demo2 && (
              <a href={project.demo2} target="_blank" rel="noopener noreferrer" className="project-btn outline">
                <CodecanyonIcon /> {project.demo2Label || "Codecanyon"}
              </a>
            )}
            {project.source && (
              <a href={project.source} target="_blank" rel="noopener noreferrer" className="project-btn outline">
                <FaGithub size={12} /> Source Code
              </a>
            )}
          </div>
          {/* Tech Chips */}
          <div className="tech-chips-group">
            <span className="tech-chips-label">Tech Used</span>
            <div className="tech-chips-list">
              {techChips.map((chip, i) => <span key={i} className="tech-chip">{chip}</span>)}
            </div>
          </div>
        </div>

        {/* ── META + CREDENTIALS CARD ─────────────────────────────────────── */}
        <div className="project-tech-creds-row">
          {/* Meta items */}
          <div className="project-meta-mini">
            {metaItems.map((m, i) => (
              <div key={i} className="meta-mini-item">
                <div className="meta-mini-icon-box">{m.icon}</div>
                <div className="meta-mini-texts">
                  <span className="meta-mini-label">{m.label}</span>
                  <span className="meta-mini-value">{m.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Credentials */}
          {hasCredentials && (
            <div className="project-creds-container">
              <div className="project-creds-title">Demo Credentials</div>
              <div className="project-creds-list">
                {project.adminLog && (
                  <div className="project-cred-line">
                    <span className="project-cred-label">Admin:</span>
                    <span className="project-cred-value">{project.adminLog.replace("Admin Login:", "").trim()}</span>
                    <CopyButton text={project.adminLog.replace("Admin Login:", "").trim()} />
                  </div>
                )}
                {project.userLog && (
                  <div className="project-cred-line">
                    <span className="project-cred-label">User:</span>
                    <span className="project-cred-value">{project.userLog.replace("User Login:", "").trim()}</span>
                    <CopyButton text={project.userLog.replace("User Login:", "").trim()} />
                  </div>
                )}
                {project.pass && (
                  <div className="project-cred-line">
                    <span className="project-cred-label">Password:</span>
                    <span className="project-cred-value">{project.pass.replace("Password:", "").trim()}</span>
                    <CopyButton text={project.pass.replace("Password:", "").trim()} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── SECTIONS BELOW ───────────────────────────────────── */}
        <div className="project-sections">

          {/* 1. Features */}
          <div className="project-section">
            <div className="section-header">
              <div className="section-icon-box">
                <SectionIcon d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </div>
              <h2 className="section-title">{project.featuresTitle || "Features"}</h2>
            </div>
            <div className="features-checklist">
              {defaultFeatures.map((f, i) => (
                <div key={i} className="feature-check-item">
                  <span className="feature-check-icon"><CheckSvg /></span>
                  <span className="feature-check-text">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Tech Stack */}
          <div className="project-section">
            <div className="section-header" style={{ alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div className="section-icon-box">
                <SectionIcon d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </div>
              <h2 className="section-title">Tech Stack</h2>
              {isLoggedIn && (
                <span style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "#f9fafb",
                  border: "1px dashed #d1d5db",
                  borderRadius: "6px",
                  padding: "3px 8px",
                  marginLeft: "4px",
                  whiteSpace: "nowrap",
                }}>
                  ⠿ Drag to reorder
                </span>
              )}
            </div>
            <div className="tech-stack-grid">
              {techStackList.map((t, i) => {
                const svgIcon = getTechIcon(t.name)
                const isDragging = techDraggingIdx === i
                const isOver = techOverIdx === i && techDraggingIdx !== i
                return (
                  <div
                    key={t.name || i}
                    className={[
                      "tech-stack-card",
                      isDragging ? "tech-stack-card--dragging" : "",
                      isOver ? "tech-stack-card--drag-over" : "",
                    ].filter(Boolean).join(" ")}
                    draggable={isLoggedIn}
                    onDragStart={isLoggedIn ? (e) => handleTechDragStart(e, i) : undefined}
                    onDragOver={isLoggedIn ? (e) => handleTechDragOver(e, i) : undefined}
                    onDragLeave={isLoggedIn ? handleTechDragLeave : undefined}
                    onDrop={isLoggedIn ? (e) => handleTechDrop(e, i) : undefined}
                    onDragEnd={isLoggedIn ? handleTechDragEnd : undefined}
                  >
                    {isLoggedIn && (
                      <div className="tech-stack-drag-handle" title="Drag to reorder">⠿</div>
                    )}
                    <span className="tech-stack-icon">
                      {svgIcon
                        ? <span style={{ width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                          <span style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {svgIcon}
                          </span>
                        </span>
                        : t.icon
                      }
                    </span>
                    <span className="tech-stack-name">{t.name}</span>
                    <span className="tech-stack-type">{t.type}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 3. My Role */}
          <div className="project-section">
            <div className="section-header">
              <div className="section-icon-box">
                <SectionIcon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </div>
              <h2 className="section-title">My Role</h2>
            </div>
            <div className="role-grid">
              {roleCards.map((r, i) => (
                <div key={i} className="role-card">
                  <p className="role-card-title">{r.title}</p>
                  <p className="role-card-body">{r.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Challenges & Solutions */}
          <div className="project-section">
            <div className="section-header">
              <div className="section-icon-box">
                <SectionIcon d="M13 10V3L4 14h7v7l9-11h-7z" />
              </div>
              <h2 className="section-title">Challenges &amp; Solutions</h2>
            </div>
            <div className="challenges-list">
              {challenges.map((c, i) => (
                <div key={i} className="challenge-item">
                  <div>
                    <span className="challenge-side-label problem">🔴 Challenge</span>
                    <p className="challenge-side-text">{c.problem}</p>
                  </div>
                  <div>
                    <span className="challenge-side-label solution">🟢 Solution</span>
                    <p className="challenge-side-text">{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Architecture */}
          <div className="project-section">
            <div className="section-header">
              <div className="section-icon-box">
                <SectionIcon d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </div>
              <h2 className="section-title">Architecture</h2>
            </div>
            <div className="architecture-grid">
              {archCards.map((a, i) => (
                <div key={i} className="arch-card">
                  <h4 className="arch-card-title">{a.title}</h4>
                  <p className="arch-card-body">{a.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Lessons Learned */}
          <div className="project-section">
            <div className="section-header">
              <div className="section-icon-box">
                <SectionIcon d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </div>
              <h2 className="section-title">Lessons Learned</h2>
            </div>
            <div className="lessons-list">
              {lessons.map((l, i) => (
                <div key={i} className="lesson-item">
                  <span className="lesson-num">{i + 1}</span>
                  <p className="lesson-text">{l.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isLightboxOpen && projectImages[activeImgIndex] && (
        <div className="project-lightbox" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)} aria-label="Close Preview">
              &times;
            </button>
            <img src={projectImages[activeImgIndex]} alt={project.name} />
            {projectImages.length > 1 && (
              <div className="lightbox-nav">
                <button className="lightbox-arrow prev" onClick={(e) => { e.stopPropagation(); prevImg(); }} aria-label="Previous">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <span className="lightbox-counter">{activeImgIndex + 1} / {projectImages.length}</span>
                <button className="lightbox-arrow next" onClick={(e) => { e.stopPropagation(); nextImg(); }} aria-label="Next">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {editingProject && (
        <ProjectFormModal
          key={editingProject.id}
          initial={editingProject}
          categories={Object.keys(portfolios)}
          onSave={(updatedProj) => {
            const hasCategoryChanged = updatedProj.category !== category
            if (hasCategoryChanged) {
              moveProject(category, updatedProj.category, project.id, updatedProj)
            } else {
              updateProject(category, project.id, updatedProj)
            }

            const nextName = updatedProj.name
            const nextCat = updatedProj.category
            setEditingProject(null)

            // Redirect if name or category changed, otherwise the state update of `project` will auto-refresh the page content
            if (nextName !== project.name || nextCat !== category) {
              navigate(projectPath({ ...project, ...updatedProj }))
            }
          }}
          onClose={() => setEditingProject(null)}
        />
      )}
    </Layout>
  )
}

