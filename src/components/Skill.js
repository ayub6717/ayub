import React, { useState } from "react"
import { Container, Title } from "./common"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { SkillFormModal } from "../admin/FormModals"
import "./skill.css"
import { SKILL_ICONS } from "../data/skillIcons"

/* ── Proficiency label based on percent ── */
const getLevel = (percent) => {
  if (percent >= 85) return { label: "Expert", color: "#7a3d60", bg: "rgba(161,108,141,0.15)" }
  if (percent >= 70) return { label: "Advanced", color: "#8f4e71", bg: "rgba(161,108,141,0.12)" }
  if (percent >= 50) return { label: "Intermediate", color: "#a16c8d", bg: "rgba(161,108,141,0.10)" }
  return { label: "Beginner", color: "#b88aa6", bg: "rgba(161,108,141,0.08)" }
}

/* ── Generic pill icon fallback ── */
const DefaultIcon = ({ name }) => {
  const letter = (name || "?").charAt(0).toUpperCase()
  return (
    <div className="skill-icon-fallback">
      {letter}
    </div>
  )
}

const Skill = () => {
  const { isLoggedIn } = useAuth()
  const { data, addSkill, updateSkill, deleteSkill, addSkillCategory } = useData()

  const skills = data?.skills || {}
  const skillsName = Object.keys(skills)

  const [selectedSkill, setSelectedSkill] = useState(skillsName[0] || "Web")
  const [editingSkill, setEditingSkill] = useState(null)
  const [showAddSkill, setShowAddSkill] = useState(false)

  const selectedSkills = skills[selectedSkill] || []

  const handleDeleteSkill = (category, name) => {
    if (window.confirm(`Delete "${name}" from "${category}"?`)) {
      deleteSkill(category, name)
    }
  }

  const handleCreateCategory = () => {
    const cat = window.prompt("Enter new skill category name:")
    if (cat && cat.trim()) {
      addSkillCategory(cat.trim())
      setSelectedSkill(cat.trim())
    }
  }

  return (
    <div id="skill" className="skill-area">
      <Title title="My Skills" />
      <div className="skill-container">
        {/* ── Section Header ── */}
        <div className="skill-section-header">
          <div className="skill-title-badge">MY SKILLS</div>
          <h2 className="skill-section-title">Technical Expertise</h2>
          <p className="skill-section-sub">Technologies I work with professionally</p>
        </div>

        {/* ── Category Tabs ── */}
        <div className="skill-tabs-row">
          <div className="skill-tabs">
            {skillsName.map(name => (
              <button
                key={name}
                onClick={() => setSelectedSkill(name)}
                className={`skill-tab-btn ${name === selectedSkill ? "active" : ""}`}
              >
                {name}
              </button>
            ))}
          </div>

          {isLoggedIn && (
            <div className="skill-admin-actions">
              <button className="admin-edit-btn green sm" onClick={() => setShowAddSkill(true)}>
                ➕ Add Skill
              </button>
              <button className="admin-edit-btn ghost sm" onClick={handleCreateCategory}>
                📁 Category
              </button>
            </div>
          )}
        </div>

        {/* ── Skills Grid ── */}
        <div className="skill-grid">
          {selectedSkills.map(({ name, percent }, idx) => {
            const level = getLevel(percent)
            const IconEl = SKILL_ICONS[name]
            return (
              <div key={`${name}-${idx}`} className="skill-card">
                {isLoggedIn && (
                  <div className="skill-card-admin">
                    <button className="admin-edit-btn sm" onClick={() => setEditingSkill({ category: selectedSkill, name, percent })}>✏️</button>
                    <button className="admin-edit-btn sm red" onClick={() => handleDeleteSkill(selectedSkill, name)}>🗑️</button>
                  </div>
                )}

                {/* Icon */}
                <div className="skill-card-icon">
                  {IconEl
                    ? <div className="skill-svg-wrap">{IconEl}</div>
                    : <DefaultIcon name={name} />
                  }
                </div>

                {/* Name */}
                <h4 className="skill-card-name">{name}</h4>

                {/* Level badge */}
                {/* <span
                  className="skill-level-badge"
                  style={{ color: level.color, background: level.bg }}
                >
                  {level.label}
                </span> */}

                {/* Progress bar */}
                {/* <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="skill-percent-label">{percent}%</span> */}
              </div>
            )
          })}
        </div>
      </div>

      {showAddSkill && (
        <SkillFormModal
          onSave={(newSkill) => { addSkill(selectedSkill, newSkill); setShowAddSkill(false) }}
          onClose={() => setShowAddSkill(false)}
        />
      )}

      {editingSkill && (
        <SkillFormModal
          key={`${editingSkill.category}-${editingSkill.name}`}
          initial={editingSkill}
          onSave={(updatedSkill) => {
            // Always use updateSkill — it handles both same-name (percent only)
            // and name-change edits atomically via oldName, avoiding race conditions.
            updateSkill(editingSkill.category, editingSkill.name, updatedSkill)
            setEditingSkill(null)
          }}
          onClose={() => setEditingSkill(null)}
        />
      )}
    </div>
  )
}

export { Skill }
