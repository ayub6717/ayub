import React, { useState } from "react"
import "./admin.css"
import { resolveImage } from "../data/imageMap"

/**
 * Generic modal wrapper with title, close button, and scrollable body.
 */
export function AdminModal({ title, onClose, children, size = "" }) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className={`admin-modal ${size === "lg" ? "admin-modal-lg" : ""}`} onClick={e => e.stopPropagation()}>
        <button className="admin-modal-close" onClick={onClose}>✕</button>
        <h2 className="admin-modal-title">{title}</h2>
        <div className="admin-modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Experience Form ──────────────────────────────────────────────────────────
export function ExperienceFormModal({ initial = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    title: initial.title || "",
    company: initial.company || "",
    address: initial.address || "",
    period: initial.period || "",
    description: initial.description || "",
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  return (
    <AdminModal title={initial.id ? "Edit Experience" : "Add Experience"} onClose={onClose} size="lg">
      <div className="admin-form-group">
        <label className="admin-form-label">Job Title</label>
        <input className="admin-form-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Software Engineer (React JS)" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Company</label>
        <input className="admin-form-input" value={form.company} onChange={e => set("company", e.target.value)} placeholder="Company Name" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Address</label>
        <input className="admin-form-input" value={form.address} onChange={e => set("address", e.target.value)} placeholder="Company address" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Period</label>
        <input className="admin-form-input" value={form.period} onChange={e => set("period", e.target.value)} placeholder="1st Jan 2023 to Running" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Description</label>
        <textarea className="admin-form-textarea" rows={7} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe your role and responsibilities..." />
      </div>
      <div className="admin-form-actions">
        <button className="admin-form-cancel" onClick={onClose}>Cancel</button>
        <button className="admin-form-save" onClick={() => onSave(form)}>Save</button>
      </div>
    </AdminModal>
  )
}

// ─── Education Form ───────────────────────────────────────────────────────────
export function EducationFormModal({ initial = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    degree: initial.degree || "",
    institute: initial.institute || "",
    session: initial.session || "",
    image: initial.image || "",
  })
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => set("image", reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <AdminModal title={initial.id ? "Edit Education" : "Add Education"} onClose={onClose}>
      <div className="admin-form-group">
        <label className="admin-form-label">Degree / Qualification</label>
        <input className="admin-form-input" value={form.degree} onChange={e => set("degree", e.target.value)} placeholder="B.Sc (CSE)" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Institute</label>
        <input className="admin-form-input" value={form.institute} onChange={e => set("institute", e.target.value)} placeholder="University / College name" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Session / Year</label>
        <input className="admin-form-input" value={form.session} onChange={e => set("session", e.target.value)} placeholder="2016-2020" />
      </div>
      <div className="admin-form-group" style={{ borderTop: "1px dashed #e2e8f0", paddingTop: "12px" }}>
        <label className="admin-form-label">Section Image (optional — replaces the education side image)</label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ fontSize: "12px" }} />
        </div>
        {form.image && (
          <div style={{ width: "100px", height: "70px", borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
            <img src={form.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>
      <div className="admin-form-actions">
        <button className="admin-form-cancel" onClick={onClose}>Cancel</button>
        <button className="admin-form-save" onClick={() => onSave(form)}>Save</button>
      </div>
    </AdminModal>
  )
}

// ─── Skill Form ───────────────────────────────────────────────────────────────
export function SkillFormModal({ initial = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    percent: initial.percent || 50,
  })
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  return (
    <AdminModal title={initial.name ? "Edit Skill" : "Add Skill"} onClose={onClose}>
      <div className="admin-form-group">
        <label className="admin-form-label">Skill Name</label>
        <input className="admin-form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="React Js" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Proficiency: <span className="admin-percent-badge">{form.percent}%</span></label>
        <input type="range" className="admin-range" min="5" max="100" step="5" value={form.percent} onChange={e => set("percent", Number(e.target.value))} />
      </div>
      <div className="admin-form-actions">
        <button className="admin-form-cancel" onClick={onClose}>Cancel</button>
        <button className="admin-form-save" onClick={() => onSave(form)}>Save</button>
      </div>
    </AdminModal>
  )
}

// ─── Tech Stack picker data ───────────────────────────────────────────────────
const TECH_OPTIONS = [
  { icon: "⚛️", name: "React", type: "UI Library" },
  { icon: "📱", name: "React Native", type: "Mobile Framework" },
  { icon: "🔲", name: "Next.js", type: "Framework" },
  { icon: "🔄", name: "Redux", type: "State Management" },
  { icon: "🟡", name: "JavaScript", type: "Language" },
  { icon: "🔷", name: "TypeScript", type: "Language" },
  { icon: "🌐", name: "HTML", type: "Markup" },
  { icon: "🎨", name: "CSS", type: "Styling" },
  { icon: "💨", name: "Tailwind CSS", type: "CSS Framework" },
  { icon: "🅱️", name: "Bootstrap", type: "CSS Framework" },
  { icon: "📦", name: "Sass/SCSS", type: "Styling" },
  { icon: "🐘", name: "PHP", type: "Backend" },
  { icon: "🟢", name: "Node.js", type: "Runtime" },
  { icon: "🗄️", name: "MySQL", type: "Database" },
  { icon: "🍃", name: "MongoDB", type: "Database" },
  { icon: "🔗", name: "REST API", type: "Integration" },
  { icon: "⚡", name: "GraphQL", type: "API" },
  { icon: "💫", name: "jQuery", type: "DOM Library" },
  { icon: "🔁", name: "Ajax", type: "Integration" },
  { icon: "☕", name: "Java", type: "Language" },
  { icon: "🔡", name: "C++", type: "Language" },
  { icon: "🧪", name: "Jest", type: "Testing" },
  { icon: "🗂️", name: "Git", type: "Version Control" },
  { icon: "🐳", name: "Docker", type: "DevOps" },
  { icon: "☁️", name: "Azure", type: "Cloud" },
  { icon: "🦅", name: "Material UI", type: "UI Library" },
  { icon: "⚙️", name: "Express.js", type: "Backend" },
  { icon: "🗃️", name: "SQLite", type: "Database" },
]

// ─── Project Form ─────────────────────────────────────────────────────────────
export function ProjectFormModal({ initial = {}, categories, onSave, onClose }) {
  const [activeTab, setActiveTab] = useState("basic")
  
  const [form, setForm] = useState({
    name: initial.name || "",
    category: initial.category || (categories?.[0] || "Web"),
    description: initial.description || "",
    image: initial.image || "",
    images: initial.images || [],
    demo: initial.demo || "",
    demo2: initial.demo2 || "",
    source: initial.source || "",
    adminLog: initial.adminLog || "",
    userLog: initial.userLog || "",
    pass: initial.pass || "",
    role: initial.role || "Front-End Developer",
    client: initial.client || "",
    timeline: initial.timeline || "",
    
    // Dynamic detail fields
    featuresText: (initial.features || []).join("\n"),
  })

  // Tech stack as a list of { icon, name, type } objects
  const [techStack, setTechStack] = useState(
    (initial.techStack || []).length > 0
      ? initial.techStack
      : []
  )
  const [techDropdownVal, setTechDropdownVal] = useState("")
  const [customTech, setCustomTech] = useState({ icon: "⚙️", name: "", type: "" })
  const [showCustomTech, setShowCustomTech] = useState(false)

  const addTechFromDropdown = () => {
    if (!techDropdownVal) return
    const found = TECH_OPTIONS.find(t => t.name === techDropdownVal)
    if (found && !techStack.find(t => t.name === found.name)) {
      setTechStack(prev => [...prev, found])
    }
    setTechDropdownVal("")
  }

  const addCustomTech = () => {
    if (!customTech.name.trim()) return
    if (!techStack.find(t => t.name === customTech.name)) {
      setTechStack(prev => [...prev, { ...customTech }])
    }
    setCustomTech({ icon: "⚙️", name: "", type: "" })
    setShowCustomTech(false)
  }

  const removeTech = (name) => setTechStack(prev => prev.filter(t => t.name !== name))

  // Lessons as a list of strings
  const [lessons, setLessons] = useState(
    (initial.lessons || []).map(l => typeof l === "string" ? l : (l.text || "")).filter(Boolean)
  )
  const [lessonInput, setLessonInput] = useState("")
  const addLesson = () => {
    if (lessonInput.trim()) {
      setLessons(prev => [...prev, lessonInput.trim()])
      setLessonInput("")
    }
  }
  const removeLesson = (i) => setLessons(prev => prev.filter((_, idx) => idx !== i))

  const [challenges, setChallenges] = useState([
    { problem: initial.challenges?.[0]?.problem || "", solution: initial.challenges?.[0]?.solution || "" },
    { problem: initial.challenges?.[1]?.problem || "", solution: initial.challenges?.[1]?.solution || "" },
    { problem: initial.challenges?.[2]?.problem || "", solution: initial.challenges?.[2]?.solution || "" },
  ])

  const [roleCards, setRoleCards] = useState([
    { title: initial.roleCards?.[0]?.title || "", body: initial.roleCards?.[0]?.body || "" },
    { title: initial.roleCards?.[1]?.title || "", body: initial.roleCards?.[1]?.body || "" },
    { title: initial.roleCards?.[2]?.title || "", body: initial.roleCards?.[2]?.body || "" },
  ])

  const [archCards, setArchCards] = useState([
    { title: initial.archCards?.[0]?.title || "", body: initial.archCards?.[0]?.body || "" },
    { title: initial.archCards?.[1]?.title || "", body: initial.archCards?.[1]?.body || "" },
    { title: initial.archCards?.[2]?.title || "", body: initial.archCards?.[2]?.body || "" },
  ])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleMainFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        set("image", reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSliderFilesChange = (e) => {
    const files = Array.from(e.target.files)
    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(file)
      })
    })
    Promise.all(promises).then(base64Images => {
      set("images", [...(form.images || []), ...base64Images])
    })
  }

  const handleSave = () => {
    const parsedFeatures = form.featuresText
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)

    const parsedLessons = lessons.map(text => ({ text }))

    // Clean up empty challenges, roles, arch cards
    const cleanChallenges = challenges.filter(c => c.problem || c.solution)
    const cleanRoleCards = roleCards.filter(r => r.title || r.body)
    const cleanArchCards = archCards.filter(a => a.title || a.body)

    // Omit internal UI helper keys from result
    const { featuresText, ...cleanForm } = form

    onSave({
      ...cleanForm,
      features: parsedFeatures,
      techStack,
      lessons: parsedLessons,
      challenges: cleanChallenges.length > 0 ? cleanChallenges : undefined,
      roleCards: cleanRoleCards.length > 0 ? cleanRoleCards : undefined,
      archCards: cleanArchCards.length > 0 ? cleanArchCards : undefined,
    })
  }

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "features", label: "Features & Tech" },
    { id: "challenges", label: "Challenges" },
    { id: "role_arch", label: "Role & Arch" },
    { id: "images", label: "Images" },
  ]

  return (
    <AdminModal title={initial.id ? "Edit Project" : "Add Project"} onClose={onClose} size="lg">
      <div className="admin-tabs" style={{ display: "flex", gap: "8px", borderBottom: "1px solid #e2e8f0", marginBottom: "16px", paddingBottom: "8px" }}>
        {tabs.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              background: activeTab === t.id ? "linear-gradient(135deg, #6d28d9, #a16c8d)" : "transparent",
              color: activeTab === t.id ? "#fff" : "#475569",
              border: activeTab === t.id ? "none" : "1px solid #e2e8f0",
              fontWeight: 600,
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ minHeight: "350px" }}>
        {activeTab === "basic" && (
          <>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Project Name</label>
                <input className="admin-form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Project name" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Category</label>
                <select className="admin-form-select" value={form.category} onChange={e => set("category", e.target.value)}>
                  {(categories || ["Web","App","Others"]).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea className="admin-form-textarea" rows={3} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Short project description..." />
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Live Demo URL</label>
                <input className="admin-form-input" value={form.demo} onChange={e => set("demo", e.target.value)} placeholder="https://..." />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Codecanyon / Demo2 URL</label>
                <input className="admin-form-input" value={form.demo2} onChange={e => set("demo2", e.target.value)} placeholder="https://codecanyon.net/..." />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">GitHub Source URL</label>
              <input className="admin-form-input" value={form.source} onChange={e => set("source", e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Role</label>
                <input className="admin-form-input" value={form.role} onChange={e => set("role", e.target.value)} placeholder="Front-End Developer" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Client</label>
                <input className="admin-form-input" value={form.client} onChange={e => set("client", e.target.value)} placeholder="Techvill" />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Timeline</label>
              <input className="admin-form-input" value={form.timeline} onChange={e => set("timeline", e.target.value)} placeholder="2-4 Weeks" />
            </div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "12px 0 8px", fontWeight: 600 }}>Demo Credentials (optional)</p>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Admin Login</label>
                <input className="admin-form-input" value={form.adminLog} onChange={e => set("adminLog", e.target.value)} placeholder="admin@..." />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">User Login</label>
                <input className="admin-form-input" value={form.userLog} onChange={e => set("userLog", e.target.value)} placeholder="user@..." />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>
              <input className="admin-form-input" value={form.pass} onChange={e => set("pass", e.target.value)} placeholder="123456" />
            </div>
          </>
        )}

        {activeTab === "features" && (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">Features (one item per line)</label>
              <textarea className="admin-form-textarea" rows={5} value={form.featuresText} onChange={e => set("featuresText", e.target.value)} placeholder="Real-time Synchronized POS Terminal&#10;Comprehensive Inventory System" />
            </div>

            {/* ── Tech Stack Picker ── */}
            <div className="admin-form-group">
              <label className="admin-form-label">Tech Stack</label>

              {/* Existing tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px", minHeight: "28px" }}>
                {techStack.map((t, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "linear-gradient(135deg,#ede9fe,#fce7f3)", border: "1px solid #d8b4fe", borderRadius: "20px", padding: "3px 10px", fontSize: "12px", fontWeight: 600, color: "#6d28d9" }}>
                    {t.icon} {t.name}
                    <button type="button" onClick={() => removeTech(t.name)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "11px", padding: "0 0 0 2px", lineHeight: 1 }}>✕</button>
                  </span>
                ))}
              </div>

              {/* Dropdown picker */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                <select
                  className="admin-form-select"
                  value={techDropdownVal}
                  onChange={e => setTechDropdownVal(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">— Select a technology —</option>
                  {TECH_OPTIONS.filter(t => !techStack.find(s => s.name === t.name)).map(t => (
                    <option key={t.name} value={t.name}>{t.icon} {t.name} ({t.type})</option>
                  ))}
                </select>
                <button type="button" className="admin-form-save" style={{ padding: "6px 14px", fontSize: "12px" }} onClick={addTechFromDropdown}>Add</button>
              </div>

              {/* Custom tech toggle */}
              {!showCustomTech ? (
                <button type="button" onClick={() => setShowCustomTech(true)} style={{ fontSize: "11px", color: "#6d28d9", background: "none", border: "1px dashed #a78bfa", borderRadius: "6px", padding: "4px 10px", cursor: "pointer" }}>
                  + Add custom technology
                </button>
              ) : (
                <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", border: "1px dashed #a78bfa", borderRadius: "8px", padding: "8px" }}>
                  <input placeholder="Icon (emoji)" className="admin-form-input" style={{ width: "60px", padding: "5px" }} value={customTech.icon} onChange={e => setCustomTech(p => ({...p, icon: e.target.value}))} />
                  <input placeholder="Name" className="admin-form-input" style={{ flex: 1, padding: "5px" }} value={customTech.name} onChange={e => setCustomTech(p => ({...p, name: e.target.value}))} />
                  <input placeholder="Type/Category" className="admin-form-input" style={{ flex: 1, padding: "5px" }} value={customTech.type} onChange={e => setCustomTech(p => ({...p, type: e.target.value}))} />
                  <button type="button" className="admin-form-save" style={{ padding: "5px 10px", fontSize: "12px" }} onClick={addCustomTech}>Add</button>
                  <button type="button" onClick={() => setShowCustomTech(false)} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer" }}>Cancel</button>
                </div>
              )}
            </div>

            {/* ── Lessons Learned ── */}
            <div className="admin-form-group">
              <label className="admin-form-label">Lessons Learned</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "8px" }}>
                {lessons.map((lesson, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", background: "#f8fafc", borderRadius: "6px", padding: "6px 10px", border: "1px solid #e2e8f0" }}>
                    <span style={{ color: "#6d28d9", fontWeight: 700, minWidth: "18px" }}>{i+1}.</span>
                    <p style={{ flex: 1, margin: 0, fontSize: "12px", color: "#334155" }}>{lesson}</p>
                    <button type="button" onClick={() => removeLesson(i)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "13px", padding: 0 }}>✕</button>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  className="admin-form-input"
                  value={lessonInput}
                  onChange={e => setLessonInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addLesson() } }}
                  placeholder="Type a lesson and press Enter or Add…"
                  style={{ flex: 1 }}
                />
                <button type="button" className="admin-form-save" style={{ padding: "6px 14px", fontSize: "12px" }} onClick={addLesson}>Add</button>
              </div>
            </div>
          </>
        )}

        {activeTab === "challenges" && (
          <>
            {[0, 1, 2].map((idx) => (
              <div key={idx} style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: idx < 2 ? "1px dashed #e2e8f0" : "none" }}>
                <p style={{ fontWeight: 600, fontSize: "13px", color: "#6d28d9", margin: "0 0 8px" }}>Challenge #{idx + 1}</p>
                <div className="admin-form-group">
                  <label className="admin-form-label">Problem</label>
                  <input className="admin-form-input" value={challenges[idx].problem} onChange={e => {
                    const newCh = [...challenges]
                    newCh[idx].problem = e.target.value
                    setChallenges(newCh)
                  }} placeholder="Describe the problem..." />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Solution</label>
                  <input className="admin-form-input" value={challenges[idx].solution} onChange={e => {
                    const newCh = [...challenges]
                    newCh[idx].solution = e.target.value
                    setChallenges(newCh)
                  }} placeholder="Describe the solution..." />
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "role_arch" && (
          <div className="admin-form-row">
            <div>
              <p style={{ fontWeight: 600, fontSize: "13px", color: "#6d28d9", margin: "0 0 12px" }}>My Role Cards</p>
              {[0, 1, 2].map((idx) => (
                <div key={idx} style={{ marginBottom: "12px" }}>
                  <label className="admin-form-label" style={{ fontSize: "11px" }}>Card {idx + 1} Title</label>
                  <input className="admin-form-input" style={{ marginBottom: "4px" }} value={roleCards[idx].title} onChange={e => {
                    const newRc = [...roleCards]
                    newRc[idx].title = e.target.value
                    setRoleCards(newRc)
                  }} placeholder="UI Development" />
                  <label className="admin-form-label" style={{ fontSize: "11px" }}>Card {idx + 1} Description</label>
                  <textarea className="admin-form-textarea" rows={2} value={roleCards[idx].body} onChange={e => {
                    const newRc = [...roleCards]
                    newRc[idx].body = e.target.value
                    setRoleCards(newRc)
                  }} placeholder="Led frontend implementation..." />
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: "13px", color: "#6d28d9", margin: "0 0 12px" }}>Architecture Cards</p>
              {[0, 1, 2].map((idx) => (
                <div key={idx} style={{ marginBottom: "12px" }}>
                  <label className="admin-form-label" style={{ fontSize: "11px" }}>Card {idx + 1} Title</label>
                  <input className="admin-form-input" style={{ marginBottom: "4px" }} value={archCards[idx].title} onChange={e => {
                    const newAc = [...archCards]
                    newAc[idx].title = e.target.value
                    setArchCards(newAc)
                  }} placeholder="Frontend Layer" />
                  <label className="admin-form-label" style={{ fontSize: "11px" }}>Card {idx + 1} Description</label>
                  <textarea className="admin-form-textarea" rows={2} value={archCards[idx].body} onChange={e => {
                    const newAc = [...archCards]
                    newAc[idx].body = e.target.value
                    setArchCards(newAc)
                  }} placeholder="Built with React modules..." />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "images" && (
          <>
            <div className="admin-form-group" style={{ paddingBottom: "12px", borderBottom: "1px dashed #e2e8f0" }}>
              <label className="admin-form-label">Main Image</label>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                <input type="file" accept="image/*" onChange={handleMainFileChange} style={{ fontSize: "12px" }} />
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>or type url/filename:</span>
                <input className="admin-form-input" style={{ flex: 1, padding: "6px" }} value={form.image} onChange={e => set("image", e.target.value)} placeholder="filename.jpg or URL" />
              </div>
              {form.image && (
                <div style={{ width: "120px", height: "70px", borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
                  <img src={resolveImage(form.image)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>

            <div className="admin-form-group" style={{ marginTop: "12px" }}>
              <label className="admin-form-label">Slider Images (Multiple)</label>
              <div style={{ marginBottom: "8px" }}>
                <input type="file" accept="image/*" multiple onChange={handleSliderFilesChange} style={{ fontSize: "12px" }} />
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                {(form.images || []).map((img, index) => (
                  <div key={index} style={{ position: "relative", width: "80px", height: "50px", borderRadius: "4px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
                    <img src={resolveImage(img)} alt={`Slider ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = (form.images || []).filter((_, i) => i !== index)
                        set("images", newImages)
                      }}
                      style={{
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        background: "rgba(220, 38, 38, 0.8)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "16px",
                        height: "16px",
                        fontSize: "9px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="admin-form-actions" style={{ marginTop: "24px" }}>
        <button className="admin-form-cancel" onClick={onClose}>Cancel</button>
        <button className="admin-form-save" onClick={handleSave}>Save Project</button>
      </div>
    </AdminModal>
  )
}

// ─── Hero / About inline edit form ───────────────────────────────────────────
export function HeroFormModal({ initial = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    greeting: initial.greeting || "",
    name: initial.name || "",
    title: initial.title || "",
    tags: (initial.tags || []).join(", "),
    yearsExp: initial.yearsExp || "",
    projects: initial.projects || "",
    resumeUrl: initial.resumeUrl || "",
    image: initial.image || "",
  })
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    onSave({
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        set("image", reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <AdminModal title="Edit Hero Section" onClose={onClose} size="lg">
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Greeting Text</label>
          <input className="admin-form-input" value={form.greeting} onChange={e => set("greeting", e.target.value)} placeholder="Hello I'm" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Name</label>
          <input className="admin-form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="AYUB" />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Title</label>
        <input className="admin-form-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Front-End Developer" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Tags (comma separated)</label>
        <input className="admin-form-input" value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="Web Developer, Programmer" />
      </div>
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Years of Experience</label>
          <input className="admin-form-input" value={form.yearsExp} onChange={e => set("yearsExp", e.target.value)} placeholder="4+" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Projects Count</label>
          <input className="admin-form-input" value={form.projects} onChange={e => set("projects", e.target.value)} placeholder="21+" />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Resume URL</label>
        <input className="admin-form-input" value={form.resumeUrl} onChange={e => set("resumeUrl", e.target.value)} placeholder="https://drive.google.com/..." />
      </div>
      
      <div className="admin-form-group" style={{ borderTop: "1px dashed #e2e8f0", paddingTop: "12px" }}>
        <label className="admin-form-label">Hero Profile Image (optional)</label>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ fontSize: "12px" }} />
          <input className="admin-form-input" style={{ flex: 1, padding: "6px" }} value={form.image} onChange={e => set("image", e.target.value)} placeholder="URL or Base64" />
        </div>
        {form.image && (
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", border: "1px solid #cbd5e1" }}>
            <img src={resolveImage(form.image)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>

      <div className="admin-form-actions">
        <button className="admin-form-cancel" onClick={onClose}>Cancel</button>
        <button className="admin-form-save" onClick={handleSave}>Save</button>
      </div>
    </AdminModal>
  )
}

// ─── About Form ───────────────────────────────────────────────────────────────
export function AboutFormModal({ initial = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    bio: initial.bio || "",
    resumeUrl: initial.resumeUrl || "",
    image: initial.image || "",
  })
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        set("image", reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <AdminModal title="Edit About Section" onClose={onClose} size="lg">
      <div className="admin-form-group">
        <label className="admin-form-label">Bio / Introduction</label>
        <textarea className="admin-form-textarea" rows={8} value={form.bio} onChange={e => set("bio", e.target.value)} placeholder="Write about yourself..." />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Resume URL</label>
        <input className="admin-form-input" value={form.resumeUrl} onChange={e => set("resumeUrl", e.target.value)} placeholder="https://drive.google.com/..." />
      </div>

      <div className="admin-form-group" style={{ borderTop: "1px dashed #e2e8f0", paddingTop: "12px" }}>
        <label className="admin-form-label">About Profile Image (optional)</label>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ fontSize: "12px" }} />
          <input className="admin-form-input" style={{ flex: 1, padding: "6px" }} value={form.image} onChange={e => set("image", e.target.value)} placeholder="URL or Base64" />
        </div>
        {form.image && (
          <div style={{ width: "100px", height: "100px", borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
            <img src={resolveImage(form.image)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>

      <div className="admin-form-actions">
        <button className="admin-form-cancel" onClick={onClose}>Cancel</button>
        <button className="admin-form-save" onClick={() => onSave(form)}>Save</button>
      </div>
    </AdminModal>
  )
}


// ─── Contact Form ─────────────────────────────────────────────────────────────
export function ContactFormModal({ initial = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    text: initial.text || "",
    email: initial.email || "",
    skype: initial.skype || "",
    twitter: initial.twitter || "",
    address: initial.address || "",
  })
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  return (
    <AdminModal title="Edit Contact Section" onClose={onClose} size="lg">
      <div className="admin-form-group">
        <label className="admin-form-label">Contact Subtitle Text</label>
        <textarea className="admin-form-textarea" rows={4} value={form.text} onChange={e => set("text", e.target.value)} placeholder="I am interested in working with..." />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Email</label>
        <input className="admin-form-input" value={form.email} onChange={e => set("email", e.target.value)} placeholder="ayub.devs@gmail.com" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Skype Invite URL</label>
        <input className="admin-form-input" value={form.skype} onChange={e => set("skype", e.target.value)} placeholder="https://join.skype.com/..." />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Twitter / X handle</label>
        <input className="admin-form-input" value={form.twitter} onChange={e => set("twitter", e.target.value)} placeholder="@ayub6717" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Address</label>
        <input className="admin-form-input" value={form.address} onChange={e => set("address", e.target.value)} placeholder="Nikunja-2, Khilkhet, Dhaka..." />
      </div>
      <div className="admin-form-actions">
        <button className="admin-form-cancel" onClick={onClose}>Cancel</button>
        <button className="admin-form-save" onClick={() => onSave(form)}>Save</button>
      </div>
    </AdminModal>
  )
}

