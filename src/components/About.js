import React, { useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import { Container, Title } from "./common"
import "./about.css"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { AboutFormModal } from "../admin/FormModals"

/* Abstract code-themed drawing on the right; coordinates follow the reference layout. */
const AboutIllustration = () => (
  <svg
    className="about-art"
    viewBox="1220 100 452 660"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="about-circle" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f3e7ec" />
        <stop offset="1" stopColor="#e8d4dd" />
      </linearGradient>
      <linearGradient id="about-tile" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#b0809d" />
        <stop offset="1" stopColor="#a16c8d" />
      </linearGradient>
    </defs>

    <circle cx="1690" cy="412" r="250" fill="url(#about-circle)" />

    {/* faint arcs */}
    <g fill="none" stroke="#e6d2db" strokeWidth="1.5">
      <path d="M1390 320 C1400 250 1440 200 1495 170" />
      <path d="M1432 470 C1428 540 1440 590 1462 626" />
      <path d="M1462 626 C1530 690 1610 715 1672 722" />
    </g>

    {/* vertical line with end dots, broken around the tile */}
    <g stroke="#a16c8d" strokeWidth="1.5">
      <line x1="1535" y1="128" x2="1535" y2="368" />
      <line x1="1535" y1="478" x2="1535" y2="723" />
    </g>
    <g fill="#a16c8d">
      <circle cx="1535" cy="128" r="4" />
      <circle cx="1535" cy="723" r="4" />
    </g>

    {/* horizontal rules */}
    <g stroke="#d9bccb" strokeWidth="1.5">
      <line x1="1313" y1="321" x2="1408" y2="321" />
      <line x1="1296" y1="568" x2="1437" y2="568" />
      <line x1="1296" y1="584" x2="1360" y2="584" />
    </g>

    {/* dotted row */}
    <g fill="#d9bccb">
      <circle cx="1230" cy="365" r="2.5" />
      <circle cx="1249" cy="365" r="2.5" />
      <circle cx="1268" cy="365" r="2.5" />
      <circle cx="1288" cy="365" r="2.5" />
    </g>

    {/* blocks */}
    <rect x="1314" y="422" width="46" height="46" rx="6" fill="#d9b4c5" />
    <rect x="1374" y="475" width="46" height="46" rx="6" fill="#eed9e2" />
    <rect x="1512.5" y="404.5" width="45" height="45" rx="5" fill="#fff" fillOpacity="0.6" stroke="#c796ae" strokeWidth="1.5" />

    {/* </> tile */}
    <rect x="1403" y="345" width="80" height="80" rx="10" fill="url(#about-tile)" />
    <text
      x="1443"
      y="395"
      textAnchor="middle"
      fontSize="30"
      fontWeight="400"
      fill="#fff"
      fontFamily="Menlo, Consolas, monospace"
    >
      {"</>"}
    </text>
  </svg>
)

const About = () => {
  const { isLoggedIn } = useAuth()
  const { data, updateAbout } = useData()
  const [showEdit, setShowEdit] = useState(false)

  const about = data?.about || {}
  const paragraphs = (about.bio || "").split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

  return (
    <div id="about" className="about-area">
      <AboutIllustration />
      <Container>
        <Title title="About Me" />
        {isLoggedIn && (
          <div className="admin-section-toolbar" style={{ justifyContent: "flex-end" }}>
            <button className="admin-edit-btn" onClick={() => setShowEdit(true)}>
              ✏️ Edit About Section
            </button>
          </div>
        )}
        <div className="about-details">
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          <div className="about-action">
            <a
              className="about-btn about-btn-primary"
              href={about.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume <FiArrowRight />
            </a>
            <a
              className="about-btn about-btn-outline"
              href="#skill"
              onClick={e => {
                e.preventDefault()
                document.querySelector("#skill")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              My Skills
            </a>
          </div>
        </div>
      </Container>

      {showEdit && (
        <AboutFormModal
          initial={about}
          onSave={(updated) => {
            updateAbout(updated)
            setShowEdit(false)
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  )
}

export { About }
