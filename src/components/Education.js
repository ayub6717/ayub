import React, { useState } from "react";
import { Container, Title } from "./common"
import edu_1 from "../assets/image/edu_2.jpg"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { EducationFormModal } from "../admin/FormModals"
import { resolveImage } from "../data/imageMap"

const Education = () => {
  const { isLoggedIn } = useAuth()
  const { data, addEducation, updateEducation, deleteEducation, updateEducationImage } = useData()
  const sideImage = data?.educationImage ? resolveImage(data.educationImage) : edu_1

  const [editingEdu, setEditingEdu] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const education = data?.education || []

  const handleDelete = (id, degree) => {
    if (window.confirm(`Are you sure you want to delete "${degree}" from education?`)) {
      deleteEducation(id)
    }
  }

  return (
    <div id="education">
      <Container>
        <Title title="Education" />
        <div className="md:pl-24 flex flex-wrap">
          <div className="flex flex-wrap items-center w-full">
            <div className="lg:w-1/2 md:w-1/2">
              {isLoggedIn && (
                <button className="admin-add-floating" onClick={() => setShowAddModal(true)} style={{ marginBottom: "20px" }}>
                  ➕ Add Education
                </button>
              )}

              {education.map((edu, idx) => {
                const isLast = idx === education.length - 1
                return (
                  <div key={edu.id} className="flex relative pb-12">
                    {!isLast && (
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-[#2c2c2c78] pointer-events-none" />
                      </div>
                    )}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#a16c8d] inline-flex items-center justify-center text-white relative z-10">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      {isLoggedIn && (
                        <div className="admin-entry-actions" style={{ marginTop: 0, marginBottom: "8px" }}>
                          <button className="admin-edit-btn sm" onClick={() => setEditingEdu(edu)}>
                            ✏️ Edit
                          </button>
                          <button className="admin-edit-btn sm red" onClick={() => handleDelete(edu.id, edu.degree)}>
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                      <p className="leading-relaxed">
                        Title of awarded qualification: {edu.degree} <br />
                        Institute : {edu.institute} <br />
                        Session: {edu.session}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="lg:w-1/2 md:w-1/2" style={{ position: "relative", aspectRatio: "4/3", minHeight: "200px" }}>
              <img
                src={sideImage}
                alt="Education"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", display: "block" }}
              />
              {isLoggedIn && (
                <label style={{ position: "absolute", bottom: "8px", right: "8px", cursor: "pointer", background: "rgba(109,40,217,0.85)", color: "#fff", borderRadius: "6px", padding: "5px 10px", fontSize: "11px", fontWeight: 600 }}>
                  📷 Change Image
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => updateEducationImage(reader.result)
                      reader.readAsDataURL(file)
                    }
                  }} />
                </label>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Add Modal */}
      {showAddModal && (
        <EducationFormModal
          onSave={(newEdu) => {
            addEducation(newEdu)
            setShowAddModal(false)
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Modal */}
      {editingEdu && (
        <EducationFormModal
          key={editingEdu.id}
          initial={editingEdu}
          onSave={(updatedEdu) => {
            updateEducation(editingEdu.id, updatedEdu)
            setEditingEdu(null)
          }}
          onClose={() => setEditingEdu(null)}
        />
      )}
    </div>
  )
}

export { Education }