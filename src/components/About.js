import React, { useState } from "react"
import { Container, Title, Button } from "./common"
import profile from "../assets/image/profile.jpg"
import "./about.css"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { AboutFormModal } from "../admin/FormModals"
import { resolveImage } from "../data/imageMap"

const About = () => {
  const { isLoggedIn } = useAuth()
  const { data, updateAbout } = useData()
  const [showEdit, setShowEdit] = useState(false)

  const about = data?.about || {}

  return (
    <div id="about" className="about-area">
      <Container>
        <Title side="right" title="About Me" />
        {isLoggedIn && (
          <div className="admin-section-toolbar" style={{ justifyContent: "flex-end" }}>
            <button className="admin-edit-btn" onClick={() => setShowEdit(true)}>
              ✏️ Edit About Section
            </button>
          </div>
        )}
        <div data-aos="slide-right" className="about">
          <div className="about-details">
            <p style={{ whiteSpace: "pre-line" }}>
              {about.bio}
            </p>
            <div className="about-action">
              <a
                className="bg-[#a16c8d] text-white px-4 py-3 rounded"
                href={about.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Get Resume
              </a>
              <Button clickEvent link="#skill" ml="15px" title="My Skills" />
            </div>
          </div>
          <div className="about-image">
            <div className="image">
              <img alt="profile" src={resolveImage(about.image) || profile} />
            </div>
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

