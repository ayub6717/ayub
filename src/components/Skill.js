import React, { useState } from "react"
import { Container, Title } from "./common"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { SkillFormModal } from "../admin/FormModals"
import "./skill.css"

const Skill = () => {
  const { isLoggedIn } = useAuth()
  const { data, addSkill, updateSkill, deleteSkill, addSkillCategory } = useData()

  const skills = data?.skills || {}
  const skillsName = Object.keys(skills)

  const [selectedSkill, setSelectedSkill] = useState(skillsName[0] || "Web")
  const [editingSkill, setEditingSkill] = useState(null) // { category, name, percent }
  const [showAddSkill, setShowAddSkill] = useState(false)

  const selectedSkills = skills[selectedSkill] || []

  const handleDeleteSkill = (category, name) => {
    if (window.confirm(`Are you sure you want to delete the skill "${name}" from "${category}"?`)) {
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
      <Container>
        <Title title="My Skills" />
        <div className="skills">
          <ul className="skill-nav">
            {skillsName.map(name => (
              <li
                onClick={() => setSelectedSkill(name)}
                className={name === selectedSkill ? "active" : ""}
                key={name}
              >
                {name}
              </li>
            ))}
          </ul>

          {isLoggedIn && (
            <div style={{ display: "flex", gap: "10px", margin: "0px 0 20px" }}>
              <button className="admin-edit-btn green sm" onClick={() => setShowAddSkill(true)}>
                ➕ Add Skill to {selectedSkill}
              </button>
              <button className="admin-edit-btn ghost sm" onClick={handleCreateCategory}>
                📁 Add Category
              </button>
            </div>
          )}

          <div className="skill">
            {selectedSkills.map(({ name, percent }) => (
              <div key={name} className="card relative" style={{ minHeight: isLoggedIn ? "110px" : "auto" }}>
                {isLoggedIn && (
                  <div className="admin-entry-actions" style={{ position: "absolute", top: "8px", right: "8px", margin: 0, gap: "4px" }}>
                    <button className="admin-edit-btn sm" onClick={() => setEditingSkill({ category: selectedSkill, name, percent })} style={{ padding: "2px 6px" }}>
                      ✏️
                    </button>
                    <button className="admin-edit-btn sm red" onClick={() => handleDeleteSkill(selectedSkill, name)} style={{ padding: "2px 6px" }}>
                      🗑️
                    </button>
                  </div>
                )}
                <h4>{name}</h4>
                <p>{percent}%</p>
                <div style={{ width: percent + "%" }} className="progress-ar" />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Add Skill Modal */}
      {showAddSkill && (
        <SkillFormModal
          onSave={(newSkill) => {
            addSkill(selectedSkill, newSkill)
            setShowAddSkill(false)
          }}
          onClose={() => setShowAddSkill(false)}
        />
      )}

      {/* Edit Skill Modal */}
      {editingSkill && (
        <SkillFormModal
          key={`${editingSkill.category}-${editingSkill.name}`}
          initial={editingSkill}
          onSave={(updatedSkill) => {
            // Since we use name as key, if name changed we might delete and add, or update in-place.
            // Our updateSkill inside DataContext updates by matching name. If name is changed, we need to handle it.
            // Let's check DataContext.js:
            // updateSkill = (category, name, updates) =>
            // Since our form modal keeps the name, if they modify name, we can delete the old and add the new,
            // or just update it. Let's do delete followed by add if name changed, or updateSkill if not.
            if (updatedSkill.name !== editingSkill.name) {
              deleteSkill(editingSkill.category, editingSkill.name)
              addSkill(editingSkill.category, updatedSkill)
            } else {
              updateSkill(editingSkill.category, editingSkill.name, updatedSkill)
            }
            setEditingSkill(null)
          }}
          onClose={() => setEditingSkill(null)}
        />
      )}
    </div>
  )
}

export { Skill }

