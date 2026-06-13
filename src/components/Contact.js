import React, { useState } from "react"
import { Container, Title, Button } from "./common"
import "./contact.css"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { ContactFormModal } from "../admin/FormModals"

const Contact = () => {
  const { isLoggedIn } = useAuth()
  const { data, updateContact } = useData()
  const [showEdit, setShowEdit] = useState(false)

  const contact = data?.contact || {
    text: "I am interested in working with any company that thinks my skill will be helpful for them. If you are looking for someone like me, please let me know. Or you can just 'say hi' to me.",
    email: "ayub.devs@gmail.com",
    skype: "https://join.skype.com/invite/YMlpuNDTBf2g",
    twitter: "@ayub6717",
    address: "Nikunja-2, Khilkhet, Dhaka, Bangladesh"
  }

  return (
    <div id="contact" className="contact-area">
      <Container>
        <Title side="right" title="Contact" />
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
              <li>
                <h5>Email</h5>
                <p>
                  {contact.email} <span>(Recommended)</span>
                </p>
              </li>
              <li>
                <h5>Skype</h5>
                <p>
                  {contact.skype} <span>(Always Available)</span>
                </p>
              </li>
              <li>
                <h5>Social</h5>
                <p>
                  Twitter - {contact.twitter} <span>(Slow response)</span>
                </p>
              </li>
              <li>
                <h5>Address</h5>
                <p>{contact.address}</p>
              </li>
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

