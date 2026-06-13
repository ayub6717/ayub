import React, { createContext, useContext, useState } from "react"

// ─── Initial Data (migrated from all data/*.js files) ────────────────────────

const initialData = {
  hero: {
    greeting: "Hello I'm",
    name: "AYUB",
    title: "Front-End Developer",
    tags: ["Web Developer", "Programmer"],
    yearsExp: "4+",
    projects: "21+",
    resumeUrl: "https://drive.google.com/file/d/1eKdPP2tcZ-yxeT0aPRvGZ-Qd8y8FVshU/view?usp=sharing",
  },

  about: {
    bio: "Greetings! I'm Md. Ayub, a proficient Web developer with a passion for crafting dynamic websites and innovative web applications. My expertise revolves around the realm of JavaScript. In my capacity as a front-end team leader, I actively contribute technical design of new systems, provide innovative solutions for intricate code challenges, and ensure the smooth progression of workflow. My proficiency spans across diverse domains such as, I have a deep understanding of modern web development practices, including component-based architecture, state management with tools like Redux, and integrating APIs to deliver seamless user experiences. I am readily open to engaging with captivating job opportunities that align with my fervor and skill set.",
    resumeUrl: "https://drive.google.com/file/d/1eKdPP2tcZ-yxeT0aPRvGZ-Qd8y8FVshU/view?usp=sharing",
  },

  experience: [
    {
      id: "exp1",
      title: "Software Engineer (React JS)",
      company: "FinSource Limited (Empowering Fintech Software Solutions)",
      address: "5 Mohakhali Commercial Area, Mohakhali, Dhaka -1212.",
      period: "1st March 2024 to Running",
      description: "In my current role, I focus on front-end development using React.js, TypeScript, Redux, Material UI, and Next.js. I am responsible for creating complex interfaces and building efficient, scalable logic for both the user panel and admin panel of our in-house fintech software, which is part of an American retirement plan software suite.\n\nMy tasks include:\n- Conduct front-end development with React.js, Next.js, TypeScript, and Material UI and APIs.\n- Utilizing Redux for streamlined state management.\n- Efficiently manage projects with Git, Azure DevOps, and agile methodologies.\n- Leverage daily scrum for seamless collaboration in large teams.\n- Implement component testing using Jest to ensure robust development practices.\n- Design and deploy scalable front-end architectures for enterprise applications.\n- Utilized Azure DevOps for CI/CD pipelines to streamline software releases.",
    },
    {
      id: "exp2",
      title: "Software Engineer (React JS)",
      company: "Techvillage (Software Company)",
      address: "House-19, Road-19, Nikunja-2, Dhaka 1229",
      period: "15th September 2020 to 29th February 2024",
      description: "In my previous role, I focused on front-end development using React.js and APIs, catering to both User and Admin functionalities. I also took on the responsibility of guiding a skilled team of front-end engineers to enhance our company's software applications, resulting in a better user experience.\n\nMy tasks include:\n- Fixing issues and improving overall system performance.\n- Collaborating with Back-End and Front-End Developers to ensure smooth teamwork.\n- Solving complex code challenges while maintaining high-quality, well-documented code.\n- Setting coding standards and ensuring the technical strength of product segments.\n- Introducing new concepts and mentoring developers in best Git practices.\n- Managing developer tasks, reviewing progress, and providing reports.\n- Analyzing website content and staying updated with current web trends for dynamic designs.\n- Providing timely customer support.\nIn summary, I blend technical skills with leadership to drive innovation and enhance user satisfaction.",
    },
    {
      id: "exp3",
      title: "Front-End Developer",
      company: "HRSOFTBD (Software Development company)",
      address: "12/6, Solimullah Road, Mohammadpur, Dhaka.",
      period: "4th January 2020 to 14th September 2020",
      description: "I have worked as a Front End Developer. My responsibilities there were to create front-end websites, project mastering, made Invoices, Email templates, level design independently. Gave and collaborate ideas to make many other projects.",
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "B.Sc (CSE)",
      institute: "Daffodil International University",
      session: "2016-2020",
    },
    {
      id: "edu2",
      degree: "HSC (Science)",
      institute: "Dr. Azhar Uddin Degree College",
      session: "2013-2014",
    },
    {
      id: "edu3",
      degree: "SSC (Science)",
      institute: "Lalmohan Gov't High School",
      session: "2011-2012",
    },
  ],

  skills: {
    Web: [
      { name: "HTML", percent: 95 },
      { name: "CSS", percent: 95 },
      { name: "Tailwind CSS", percent: 95 },
      { name: "Bootstrap", percent: 95 },
      { name: "React Js", percent: 90 },
      { name: "Next Js", percent: 50 },
      { name: "React Native", percent: 60 },
      { name: "Redux", percent: 60 },
      { name: "TypeScript", percent: 40 },
      { name: "Alpine Js", percent: 20 },
      { name: "Node JS", percent: 20 },
      { name: "MySQL", percent: 50 },
    ],
    Others: [
      { name: "Data Structure", percent: 70 },
      { name: "Algorithms", percent: 60 },
      { name: "OOP", percent: 80 },
      { name: "Git, Github", percent: 80 },
      { name: "Sass/Scss", percent: 50 },
      { name: "jQuery", percent: 65 },
      { name: "Ajax", percent: 50 },
    ],
    Programming: [
      { name: "JavaScript", percent: 90 },
      { name: "C", percent: 90 },
      { name: "C++", percent: 75 },
      { name: "Java", percent: 30 },
    ],
    Development_tools: [
      { name: "Visual Studio Code", percent: 90 },
      { name: "Atom", percent: 90 },
      { name: "Sublime text", percent: 70 },
      { name: "NetBeans", percent: 60 },
      { name: "Eclipse", percent: 60 },
    ],
  },

  portfolios: {
    Web: [
      { id: "p1", name: "React Martvill POS Addon", image: "pos-updated.jpg", images: ["pos-updated.jpg","pos.jpg","pos-update.jpg"], description: "A Collection of React, Redux, Tailwind CSS / Compatible Browsers: IE10, IE11, Firefox, Safari, Chrome, Software Version: PHP 7.x", adminLog: "Admin Login: admin@techvill.net", userLog: "User Login: user@techvill.net", pass: "Password: 123456", demo: "https://www.demo.martvill.techvill.net/pos", demo2: "https://codecanyon.net/item/martvill-point-of-sale-pos-addon/48726500", source: "", features: ["Real-time Synchronized POS Terminal","Comprehensive Inventory & Stock Alert System","Multi-payment Gateway & Invoice Generator","Detailed Analytics Dashboard for Sales Report"], category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "2-4 Weeks" },
      { id: "p2", name: "React AI Chat SDK", image: "AI_Chat_sdk.jpg", images: ["AI_Chat_sdk.jpg","AI_Chat_sdk1.jpg"], description: "A Collection of React, Redux, Tailwind CSS / Compatible Browsers: IE10, IE11, Firefox, Safari, Chrome", adminLog: "Admin Login: admin@techvill.net", userLog: "User Login: user@techvill.net", pass: "Password: 123456", demo: "https://demo.artifism.techvill.net/chat", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "2-4 Weeks" },
      { id: "p3", name: "Martvill", image: "Multivendor_Home.jpg", images: ["Multivendor_Home.jpg","Multivendor_Home2.jpg"], description: "A Collection of PHP Scripts, Tailwind CSS, CSS module, JavaScript / Project Management Tools Compatible Browsers: Firefox, Safari, Opera, Chrome, Edge, Software Version: PHP 8.x", adminLog: "Admin Login: admin@techvill.net", userLog: "User Login: user@techvill.net", pass: "Password: 123456", demo: "https://demo.martvill.techvill.net/", demo2: "https://codecanyon.net/item/martvill-a-global-multivendor-ecommerce-platform-to-sell-anything/43288879", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "6+ Months" },
      { id: "p4", name: "Artifism", image: "artifisms.png", description: "A Collection of PHP Scripts, Tailwind CSS, javascript / Compatible Browsers: IE10, IE11, Firefox, Safari, Chrome, Software Version: PHP 8.x", adminLog: "Admin Login: admin@techvill.net", userLog: "User Login: user@techvill.net", pass: "Password: 123456", demo: "https://demo.artifism.techvill.net/", demo2: "https://codecanyon.net/item/artifism-ai-content-image-generator-saas/47251169?s_rank=2", source: "", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "3-4 Months" },
      { id: "p5", name: "Martvill Landing Page", image: "Martvill.jpg", description: "A Collection of React Hooks, Tailwind CSS, CSS module, JavaScript", demo: "https://martvill.techvill.net/", demo2: "https://preview.codecanyon.net/item/martvill-a-global-multivendor-ecommerce-platform-to-sell-anything/full_screen_preview/43288879", soon: "Under development. Coming soon, please check preview option", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "2-3 Weeks" },
      { id: "p6", name: "AmaderService.com", image: "Home _ AmaderSer.png", description: "A Collection of React Hooks, React-bootstrap, CSS module, JavaScript", demo: "https://amaderservice.com/", category: "Web", role: "Front-End Developer", client: "Client", timeline: "1-2 Months" },
      { id: "p7", name: "React Crypto User Dashboard", image: "Crypto_userdashboard.jpg", description: "A Collection of React Hooks, Tailwind CSS, CSS module, JavaScript", demo: "https://react-crypto-userdashboard.netlify.app/", source: "https://github.com/ayub6717/react-crypto-dashboard", category: "Web", role: "Front-End Developer", client: "Personal", timeline: "1-2 Weeks" },
      { id: "p8", name: "Pay Money New User Dashboard", image: "paymoney-userdashboard.jpg", description: "A Collection of PHP Scripts, Bootstrap 5, javascript / Compatible Browsers: IE10, IE11, Firefox, Safari, Chrome, Software Version: PHP 7.x", adminLog: "Admin Login: admin@techvill.net", userLog: "User Login: irish@gmail.com", pass: "Password: 123456", demo: "https://demo.paymoney.techvill.net/dashboard", source: "", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "2-4 Weeks" },
      { id: "p9", name: "Pay Money Modern", image: "Home.jpg", description: "A Collection of PHP Scripts PHP, Bootstrap, CSS module, JavaScript / High Resolution: Yes, Compatible Browsers: IE10, IE11, Firefox, Safari, Chrome, Software Version: PHP 8.x", demo: "https://demo.paymoney.techvill.net/", demo2: "https://codecanyon.net/item/paymoney-secure-online-payment-gateway/22341650?s_rank=12", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "3-4 Months" },
      { id: "p10", name: "Pay Money", image: "paymoney.jpg", description: "A Collection of PHP Scripts, Bootstrap, CSS module, JavaScript / Compatible Browsers: IE10, IE11, Firefox, Safari, Chrome, Software Version: PHP 7.x", demo: "https://paymoney.techvill.org/", demo2: "https://preview.codecanyon.net/item/paymoney-secure-online-payment-gateway/full_screen_preview/22341650", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "3-4 Months" },
      { id: "p11", name: "Pay Money Cryptoexchange", image: "CryptoLandingPage.png", description: "A Collection of PHP Scripts, Bootstrap, CSS module, JavaScript / Compatible Browsers: IE10, IE11, Firefox, Safari, Chrome, Software Version: PHP 8.x", demo: "https://demo.paymoney.techvill.net/crypto-exchange/create", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "2-4 Weeks" },
      { id: "p12", name: "Vrent", image: "Vrent.jpg", description: "A Collection of PHP Scripts, Bootstrap, CSS module, JavaScript. Software Version: PHP 8.x", demo: "https://vrent.techvill.org/", demo2: "https://codecanyon.net/item/vrent-vacation-rental-marketplace/19418596?s_rank=13", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "3-4 Months" },
      { id: "p13", name: "Ratool Sourcing", image: "BuyingHouse.png", description: "A Collection of Tailwind CSS, CSS module, JavaScript", demo: "https://ratoolsourcing.com/", category: "Web", role: "Front-End Developer", client: "Client", timeline: "2-4 Weeks" },
      { id: "p14", name: "RoverCRM", image: "roverCRM.jpg", description: "A Collection of PHP Scripts, Bootstrap, CSS module, JavaScript", demo: "https://rovercrm.net/", demo2: "https://codecanyon.net/item/rovercrm-customer-relationship-and-project-management-system/27995551?s_rank=10", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "3-4 Months" },
      { id: "p15", name: "Hotel Searching", image: "Hotel-2.jpg", description: "A Collection of HTML, Bootstrap 4, CSS, JavaScript, jQuery", demo: "https://ayub6717.github.io/Bdhotels/", source: "https://github.com/ayub6717/Bdhotels", category: "Web", role: "Front-End Developer", client: "Personal", timeline: "1-2 Weeks" },
      { id: "p16", name: "Brikkhorongon", image: "Brikkhorongon.jpg", description: "A Collection of React Hooks, React-bootstrap, CSS module, JavaScript", demo: "https://ayub6717.github.io/brikkhorongon/", source: "https://github.com/ayub6717/brikkhorongon", category: "Web", role: "Front-End Developer", client: "Personal", timeline: "1-2 Weeks" },
      { id: "p17", name: "PayMoney - Mobile App", image: "mobileapp.png", description: "A Collection of Mobile / Native Web Software Version: jQuery, CSS3, HTML5", demo2: "https://codecanyon.net/item/paymoney-mobile-app/22707492?s_rank=11", category: "Web", role: "Front-End Developer", client: "Techvill", timeline: "1-2 Months" },
    ],
    App: [
      { id: "a1", name: "Martvill - Customer Mobile App", image: "martvill-app.jpg", description: "A Collection of Jsx, React Native, Redux and, CSS. It supports IOS and Android both platform", demo: "https://drive.google.com/file/d/1S9ebmvqLAy-PdIfZSAbYyb1DW8Nxh2Il/view?pli=1", demo2: "https://codecanyon.net/item/martvill-customer-mobile-app/46063913?s_rank=3", category: "App", role: "Front-End Developer", client: "Techvill", timeline: "2-3 Months" },
      { id: "a2", name: "Artifism - OpenAI | ChatGPT Content & Image Generator Mobile App", image: "artifism-app.png", description: "A Collection of Jsx, React Native, Redux and, CSS. It supports IOS and Android both platform", demo: "https://drive.google.com/file/d/1-2rA_VZ27tqrc5o4rd8RacC6DJsvtgFF/view", demo2: "https://codecanyon.net/item/artifism-openai-chatgpt-content-image-generator-mobile-app/47596315?s_rank=1", category: "App", role: "Front-End Developer", client: "Techvill", timeline: "2-3 Months" },
      { id: "a3", name: "WalletPay - PayMoney Multi Wallet Mobile App", image: "wallet-pay-banner.png", description: "A Collection of Jsx, React Native, Redux and, CSS. It supports IOS and Android both platform", demo: "https://drive.google.com/file/d/1lantzLXk93n91SN24A3VkO-pZMZBFZKe/view", demo2: "https://codecanyon.net/item/walletpay-paymoney-multi-wallet-mobile-app/45435953?s_rank=5", category: "App", role: "Front-End Developer", client: "Techvill", timeline: "2-3 Months" },
    ],
    Others: [
      { id: "o1", name: "covid-19-info", image: "Covid.jpg", description: "A Collection of React.js, HTML, Bootstrap 4, CSS, JavaScript", demo: "https://ayub6717.github.io/covid-19-info", source: "https://github.com/ayub6717/covid-19-info", category: "Others", role: "Front-End Developer", client: "Personal", timeline: "1 Week" },
      { id: "o2", name: "React Hooks planet", image: "Hooks.jpg", description: "A Collection of React.js, HTML, Bootstrap 4, CSS, JavaScript", demo: "https://ayub6717.github.io/React-Hooks-Planet/", source: "https://github.com/ayub6717/React-Hooks-Planet", category: "Others", role: "Front-End Developer", client: "Personal", timeline: "1 Week" },
      { id: "o3", name: "PharmaLogy", image: "Pharmacy.jpg", description: "A Collection of HTML, Bootstrap, CSS, JavaScript, jQuery, Ajax. Back-End: Node.js, Express.js, SQLite", demo: "https://ayub6717.github.io/Pharmalogy/", source: "https://github.com/ayub6717/Pharmalogy", category: "Others", role: "Full-Stack Developer", client: "Personal", timeline: "2-3 Weeks" },
      { id: "o4", name: "Tic Toc Toi", image: "tic-tac-toe.jpg", description: "This is a Tic Tok Toi game. using Java", source: "https://github.com/ayub6717/Compiler_project_Tic_Toc_Toi_", category: "Others", role: "Developer", client: "Personal", timeline: "1 Week" },
      { id: "o5", name: "Todo-react-hooks", image: "todo.jpg", description: "A Collection of React hooks", demo: "https://daily-todo-hooks.netlify.app/", source: "https://github.com/ayub6717/Todo-react-hooks", category: "Others", role: "Front-End Developer", client: "Personal", timeline: "1 Week" },
      { id: "o6", name: "Airlines Management System", image: "Plan.jpg", description: "A Collection of PHP, HTML, CSS, JavaScript. This is the project of Airlines management system. Customer check their flight and also book ticket and cancel their flight.", source: "https://github.com/ayub6717/Project-of-Airlines-management-System-", category: "Others", role: "Developer", client: "Personal", timeline: "1 Month" },
      { id: "o7", name: "Medical", image: "medical-website.jpg", description: "A Collection of React.js, HTML, Bootstrap 4, CSS, JavaScript", demo: "https://ayub6717.github.io/Medical", source: "https://github.com/ayub6717/Medical", category: "Others", role: "Front-End Developer", client: "Personal", timeline: "1-2 Weeks" },
      { id: "o8", name: "TravelsupportBd", image: "Travelsupport.jpg", description: "A Collection of Front-End: HTML, Bootstrap 4, CSS, JavaScript, jQuery", demo: "https://ayub6717.github.io/Travelsupport/", source: "https://github.com/ayub6717/Travelsupport", category: "Others", role: "Front-End Developer", client: "Personal", timeline: "1-2 Weeks" },
      { id: "o9", name: "School", image: "Edu.jpg", description: "A Collection of HTML, Bootstrap 4, CSS, JavaScript, jQuery", demo: "https://ayub6717.github.io/school/", source: "https://github.com/ayub6717/school", category: "Others", role: "Front-End Developer", client: "Personal", timeline: "1-2 Weeks" },
    ],
  },

  languages: [
    { id: "Bengali", text: "ধন্যবাদ", progress: 99 },
    { id: "English", text: "Thanks", progress: 90 },
  ],
  contact: {
    text: "I am interested in working with any company that thinks my skill will be helpful for them. If you are looking for someone like me, please let me know. Or you can just 'say hi' to me.",
    email: "ayub.devs@gmail.com",
    skype: "https://join.skype.com/invite/YMlpuNDTBf2g",
    twitter: "@ayub6717",
    address: "Nikunja-2, Khilkhet, Dhaka, Bangladesh"
  }
}


// ─── Context ─────────────────────────────────────────────────────────────────

const DataContext = createContext(null)

function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    // Try to load saved data from localStorage
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ayub_portfolio_data")
        if (saved) return JSON.parse(saved)
      } catch (e) {}
    }
    return initialData
  })

  const persist = (newData) => {
    setData(newData)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ayub_portfolio_data", JSON.stringify(newData))
      } catch (e) {}
    }
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
    const catProjects = [...(data.portfolios[category] || []), newProject]
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
