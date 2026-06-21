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

  // Functional updater-based persist — avoids stale closure issues
  const persistFn = (updaterFn) => {
    setData(prev => {
      const newData = updaterFn(prev)
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
      return newData
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
    if (!skill.name || !skill.name.trim()) return
    persistFn(prev => {
      const existing = prev.skills[category] || []
      // Prevent duplicates
      if (existing.some(s => s.name === skill.name)) return prev
      const catSkills = [...existing, { name: skill.name.trim(), percent: skill.percent }]
      return { ...prev, skills: { ...prev.skills, [category]: catSkills } }
    })
  }
  const updateSkill = (category, oldName, updates) => {
    if (!updates.name || !updates.name.trim()) return
    persistFn(prev => {
      const catSkills = (prev.skills[category] || []).map(s =>
        s.name === oldName ? { ...s, name: updates.name.trim(), percent: updates.percent } : s
      )
      return { ...prev, skills: { ...prev.skills, [category]: catSkills } }
    })
  }
  const deleteSkill = (category, name) => {
    persistFn(prev => {
      const catSkills = (prev.skills[category] || []).filter(s => s.name !== name)
      return { ...prev, skills: { ...prev.skills, [category]: catSkills } }
    })
  }
  const addSkillCategory = (categoryName) => {
    persistFn(prev => {
      if (prev.skills[categoryName]) return prev
      return { ...prev, skills: { ...prev.skills, [categoryName]: [] } }
    })
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
  const moveProject = (fromCategory, toCategory, id, updatedProject) => {
    // Remove from old category
    const fromList = (data.portfolios[fromCategory] || []).filter(p => p.id !== id)
    // Add to new category (at beginning), keep same id
    const toList = [{ ...updatedProject, id }, ...(data.portfolios[toCategory] || [])]
    persist({
      ...data,
      portfolios: {
        ...data.portfolios,
        [fromCategory]: fromList,
        [toCategory]: toList,
      },
    })
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
      addProject, updateProject, moveProject, deleteProject,
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
