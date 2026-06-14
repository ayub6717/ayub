import React, { createContext, useContext, useState } from "react"

// ─── Initial Data ────────────────────────────────────────────────────────────
import initialData from "../data/data.json"


// ─── Context ─────────────────────────────────────────────────────────────────

const DataContext = createContext(null)

function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function DataProvider({ children }) {
  const [data, setData] = useState(initialData)

  // No localStorage. State is initialized from data.json at build/start time.
  // All changes are written back to data.json via the local Express API.

  const persist = (newData) => {
    setData(newData)
    // Write directly to src/data/data.json via the Gatsby dev server middleware
    fetch("/api/save-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          console.log("[DataContext] Saved to src/data/data.json ✓")
        } else {
          console.warn("[DataContext] Save failed:", resData.error)
        }
      })
      .catch(err => {
        console.warn("[DataContext] Could not reach /api/save-data:", err.message)
      })
  }


  // ── Hero ──────────────────────────────────────────────────────────────────
  const updateHero = (updates) => {
    persist({ ...data, hero: { ...data.hero, ...updates } })
  }

  // ── About ─────────────────────────────────────────────────────────────────
  const updateAbout = (updates) => {
    persist({ ...data, about: { ...data.about, ...updates } })
  }

  // ── Experience ────────────────────────────────────────────────────────────
  const addExperience = (entry) => {
    const newEntry = { ...entry, id: generateId() }
    persist({ ...data, experience: [newEntry, ...data.experience] })
  }
  const updateExperience = (id, updates) => {
    persist({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, ...updates } : e),
    })
  }
  const deleteExperience = (id) => {
    persist({ ...data, experience: data.experience.filter(e => e.id !== id) })
  }

  // ── Education ─────────────────────────────────────────────────────────────
  const addEducation = (entry) => {
    const newEntry = { ...entry, id: generateId() }
    persist({ ...data, education: [...data.education, newEntry] })
  }
  const updateEducation = (id, updates) => {
    persist({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, ...updates } : e),
    })
  }
  const deleteEducation = (id) => {
    persist({ ...data, education: data.education.filter(e => e.id !== id) })
  }
  const updateEducationImage = (image) => {
    persist({ ...data, educationImage: image })
  }

  // ── Skills ────────────────────────────────────────────────────────────────
  const addSkill = (category, skill) => {
    const catSkills = [...(data.skills[category] || []), { name: skill.name, percent: skill.percent }]
    persist({ ...data, skills: { ...data.skills, [category]: catSkills } })
  }
  const updateSkill = (category, name, updates) => {
    const catSkills = data.skills[category].map(s => s.name === name ? { ...s, ...updates } : s)
    persist({ ...data, skills: { ...data.skills, [category]: catSkills } })
  }
  const deleteSkill = (category, name) => {
    const catSkills = data.skills[category].filter(s => s.name !== name)
    persist({ ...data, skills: { ...data.skills, [category]: catSkills } })
  }
  const addSkillCategory = (categoryName) => {
    if (data.skills[categoryName]) return
    persist({ ...data, skills: { ...data.skills, [categoryName]: [] } })
  }

  // ── Portfolios ────────────────────────────────────────────────────────────
  const addProject = (category, project) => {
    const newProject = { ...project, id: generateId() }
    // New project goes to the BEGINNING of the list
    const catProjects = [newProject, ...(data.portfolios[category] || [])]
    persist({ ...data, portfolios: { ...data.portfolios, [category]: catProjects } })
  }
  const updateProject = (category, id, updates) => {
    const catProjects = data.portfolios[category].map(p => p.id === id ? { ...p, ...updates } : p)
    persist({ ...data, portfolios: { ...data.portfolios, [category]: catProjects } })
  }
  const deleteProject = (category, id) => {
    const catProjects = data.portfolios[category].filter(p => p.id !== id)
    persist({ ...data, portfolios: { ...data.portfolios, [category]: catProjects } })
  }

  // ── Languages ─────────────────────────────────────────────────────────────
  const updateLanguage = (id, updates) => {
    persist({
      ...data,
      languages: data.languages.map(l => l.id === id ? { ...l, ...updates } : l),
    })
  }
  const addLanguage = (lang) => {
    persist({ ...data, languages: [...data.languages, lang] })
  }
  const deleteLanguage = (id) => {
    persist({ ...data, languages: data.languages.filter(l => l.id !== id) })
  }

  // ── Export JSON ───────────────────────────────────────────────────────────
  const exportJSON = () => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Contact ──────────────────────────────────────────────────────────────
  const updateContact = (updates) => {
    persist({ ...data, contact: { ...data.contact, ...updates } })
  }

  // ── Reset to initial ──────────────────────────────────────────────────────
  const resetData = () => {
    persist(initialData)
  }

  return (
    <DataContext.Provider value={{
      data,
      // Hero
      updateHero,
      // About
      updateAbout,
      // Experience
      addExperience, updateExperience, deleteExperience,
      // Education
      addEducation, updateEducation, deleteEducation, updateEducationImage,
      // Skills
      addSkill, updateSkill, deleteSkill, addSkillCategory,
      // Portfolios
      addProject, updateProject, deleteProject,
      // Languages
      updateLanguage, addLanguage, deleteLanguage,
      // Contact
      updateContact,
      // Utils
      exportJSON, resetData,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
