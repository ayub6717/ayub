import React, { useState } from "react"
import { FiMail, FiMapPin, FiLinkedin, FiGithub } from "react-icons/fi"
import { Container, Title, Button } from "./common"
import "./contact.css"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { ContactFormModal } from "../admin/FormModals"

const LINKEDIN_URL = "https://www.linkedin.com/in/ayub6717/"
const GITHUB_URL = "https://github.com/ayub6717" // same profile as the Hero "Find me on" icons

const Contact = () => {
  const { isLoggedIn } = useAuth()
  const { data, updateContact } = useData()
  const [showEdit, setShowEdit] = useState(false)

  const contact = data?.contact || {
    text: "Feel free to get in touch for professional enquiries, collaboration, or to discuss frontend engineering. I'm happy to connect with fellow engineers and engineering leaders.",
    email: "ayub.devs@gmail.com",
    skype: "https://join.skype.com/invite/YMlpuNDTBf2g",
    twitter: "@ayub6717",
    address: "Dhaka, Bangladesh"
  }

  const details = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: FiMail },
    { label: "Location", value: contact.address, icon: FiMapPin },
    { label: "LinkedIn", value: "linkedin.com/in/ayub6717", href: LINKEDIN_URL, icon: FiLinkedin, external: true },
    { label: "GitHub", value: "github.com/ayub6717", href: GITHUB_URL, icon: FiGithub, external: true },
  ]

  return (
    <div id="contact" className="contact-area">
      <Container>
        <Title title="Contact" />
        {isLoggedIn && (
          <div className="admin-section-toolbar" style={{ justifyContent: "flex-end", marginBottom: "20px" }}>
            <button className="admin-edit-btn" onClick={() => setShowEdit(true)}>
              ✏️ Edit Contact Section
            </button>
          </div>
        )}
        <div className="contact">
          <div className="contact-status">
            <p>
              {contact.text}
            </p>
            <div>
              <Button
                title="Contact Me"
                mt="25px"
                bgColor="#a16c8d"
                color="#fff"
                link={`mailto:${contact.email}`}
                borderColor="#a16c8d"
              />
            </div>
          </div>
          <div className="contact-details">
            <ul>
              {details.map(({ label, value, href, icon: Icon, external }) => (
                <li key={label}>
                  <span className="contact-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="contact-info">
                    <h5>{label}</h5>
                    {href ? (
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {value}
                      </a>
                    ) : (
                      <p>{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {showEdit && (
        <ContactFormModal
          initial={contact}
          onSave={(updated) => {
            updateContact(updated)
            setShowEdit(false)
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  )
}

export { Contact }

