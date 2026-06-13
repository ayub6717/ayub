import React, { useState } from "react"
import { Container, Title } from "./common"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { ExperienceFormModal } from "../admin/FormModals"

const Experience = () => {
  const { isLoggedIn } = useAuth()
  const { data, addExperience, updateExperience, deleteExperience } = useData()
  
  const [editingExp, setEditingExp] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const experiences = data?.experience || []

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the experience for "${title}"?`)) {
      deleteExperience(id)
    }
  }

  return (
    <div id="experience">
      <Container>
        <Title title="Experience" />
        <div className="md:pl-24">
          {isLoggedIn && (
            <button className="admin-add-floating" onClick={() => setShowAddModal(true)}>
              ➕ Add Experience
            </button>
          )}

          {experiences.map((exp) => (
            <div key={exp.id} className="mt-11 relative" style={{ borderLeft: isLoggedIn ? "2px dashed #6d28d9" : "none", paddingLeft: isLoggedIn ? "15px" : "0" }}>
              {isLoggedIn && (
                <div className="admin-entry-actions" style={{ marginBottom: "8px" }}>
                  <button className="admin-edit-btn sm" onClick={() => setEditingExp(exp)}>
                    ✏️ Edit
                  </button>
                  <button className="admin-edit-btn sm red" onClick={() => handleDelete(exp.id, exp.title)}>
                    🗑️ Delete
                  </button>
                </div>
              )}
              <h3>{exp.title}</h3>
              <h4 className="mt-3 text-[#2c2c2c]">
                Company: {exp.company}
              </h4>
              <p className="mt-1 text-[#1b1b1bee] text-[16px]">
                Address: {exp.address}
              </p>
              <p className="text-[#1b1b1bc7] text-[15px]">
                Status: {exp.period}.
              </p>

              <p className="mt-4 text-[17px]" style={{ whiteSpace: "pre-line" }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Add Modal */}
      {showAddModal && (
        <ExperienceFormModal
          onSave={(newExp) => {
            addExperience(newExp)
            setShowAddModal(false)
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Modal */}
      {editingExp && (
        <ExperienceFormModal
          initial={editingExp}
          onSave={(updatedExp) => {
            updateExperience(editingExp.id, updatedExp)
            setEditingExp(null)
          }}
          onClose={() => setEditingExp(null)}
        />
      )}
    </div>
  )
}

export { Experience }

