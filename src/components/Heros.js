import React, { useState, useEffect } from "react"
import { FiArrowRight, FiMail } from "react-icons/fi"
import profile from "../assets/images/Hero/person.png"
import SkillLogo from "./SkillLogo"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { HeroFormModal } from "../admin/FormModals"
import { resolveImage } from "../data/imageMap"

const SOCIALS = [
  { href: "https://github.com/ayub6717", label: "GitHub", icon: <svg aria-hidden="true" viewBox="0 0 496 512" className="h-[46%] w-[46%]" fill="currentColor"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/></svg> },
  { href: "https://linkedin.com/in/ayub6717", label: "LinkedIn", icon: <svg aria-hidden="true" viewBox="0 0 448 512" className="h-[46%] w-[46%]" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg> },
  { href: "mailto:ayub.devs@gmail.com", label: "Email", icon: <FiMail aria-hidden="true" className="h-[46%] w-[46%]" /> },
]

function Stat({ value, label }) {
  return (
    <div className="flex items-center gap-3 lg:gap-[1.6vw]">
      <span className="text-[32px] font-extrabold leading-none tracking-[-0.03em] text-[#774667] md:text-[40px] lg:text-[clamp(38px,3.1vw,52px)]">
        {value}
      </span>
      <span className="h-8 w-[1.5px] bg-[#d3cbd0] lg:h-[2vw]" />
      <p className="max-w-[100px] text-left text-[12px] font-medium leading-[1.3] text-[#56607a] lg:max-w-[max(92px,6.2vw)] lg:text-[clamp(11.5px,0.85vw,14px)]">
        {label}
      </p>
    </div>
  )
}

function Heros() {
  const { isLoggedIn } = useAuth()
  const { data, updateHero } = useData()
  const [showEdit, setShowEdit] = useState(false)

  const hero = data?.hero || {}
  const photo = resolveImage(hero.image) || profile
  const tagList = (hero.tags || [])
    .flatMap((t) => t.split("•"))
    .map((t) => t.trim())
    .filter(Boolean)

  const [typedTitle, setTypedTitle] = useState("")
  useEffect(() => {
    const title = hero.title || ""
    setTypedTitle("")
    let i = 0
    const interval = setInterval(() => {
      i++
      setTypedTitle(title.slice(0, i))
      if (i >= title.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [hero.title])
  const isTyping = typedTitle.length < (hero.title || "").length

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden bg-[#f9f6f3] pb-14 pt-[110px] md:pb-[70px] md:pt-[130px] lg:min-h-screen lg:flex-row lg:items-center lg:pb-[7vh] lg:pt-[11.4vh]"
    >
      {/* soft background circles */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-18.4vw] top-[64vh] hidden h-[33.3vw] w-[33.3vw] rounded-full bg-[#f4eced] lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[84.6vw] top-[80vh] hidden h-[29.4vw] w-[29.4vw] rounded-full bg-[#f4eced] lg:block" />

      <SkillLogo />

      {/* photo card - LEFT */}
      <div className="hidden w-[38.6%] shrink-0 pl-[5%] lg:block">
        <div
          data-aos="fade-in"
          className="relative"
          style={{ width: "min(29.2vw, 51.8vh)", aspectRatio: "488 / 768" }}
        >
          <div
            className="absolute inset-0 rounded-[32px]"
            style={{ background: "radial-gradient(ellipse 95% 60% at 4% 5%, #f6eded 0%, #e5d6da 100%)" }}
          />
          {/* cut-out portrait that pops out of the card; same layout for the default and uploaded image */}
          <img
            src={photo}
            alt={hero.name || "Profile"}
            className="absolute bottom-0 max-w-none select-none"
            style={{ height: "111.5%", left: "56.9%", transform: "translateX(-50%)" }}
          />
        </div>
      </div>

      {/* text - RIGHT */}
      <div className="relative z-10 min-w-0 flex-1 px-6 text-center md:px-10 lg:px-0 lg:pb-[1.1vw] lg:pr-[11vw] lg:text-left">
        {isLoggedIn && (
          <div className="admin-section-toolbar" style={{ marginBottom: "15px" }}>
            <button className="admin-edit-btn" onClick={() => setShowEdit(true)}>
              ✏️ Edit Hero Section
            </button>
          </div>
        )}

        {/* greeting */}
        <div className="flex items-center justify-center gap-4 lg:justify-start lg:gap-[1.8vw]">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#6f3a5e] md:text-[13px] lg:text-[clamp(12px,0.97vw,15px)]">
            {hero.greeting}
          </p>
          <span className="relative block h-[5px] w-[34px] lg:w-[3vw]">
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#7f4a76]" />
            <span className="absolute left-0 top-0 h-[5px] w-[5px] rounded-full bg-[#7f4a76]" />
            <span className="absolute right-0 top-0 h-[5px] w-[5px] rounded-full bg-[#7f4a76]" />
          </span>
        </div>

        {/* name */}
        <h1 className="mt-3 text-[48px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0f172a] md:text-[64px] lg:mt-[0.67vw] lg:text-[clamp(60px,5.55vw,88px)]">
          {hero.name}
        </h1>

        {/* typed title */}
        <p className="mt-3 text-[18px] font-semibold text-[#111a2e] md:text-[22px] lg:mt-[0.8vw] lg:text-[clamp(18px,1.95vw,28px)]">
          {typedTitle}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>

        {/* tags */}
        {tagList.length > 0 && (
          <div className="mt-5 flex justify-center lg:mt-[1.15vw] lg:justify-start">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg leading-[1.2] bg-[#f4eced] px-4 py-2 text-[13px] font-medium text-[#4a5470] lg:gap-x-[1.1vw] lg:px-[1vw] lg:py-[0.53vw] lg:text-[clamp(13px,0.963vw,16px)]">
              {tagList.map((tag, i) => (
                <React.Fragment key={`${tag}-${i}`}>
                  {i > 0 && <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-[#b3a4ae]" />}
                  <span>{tag}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* bio */}
        {hero.bio && (
          <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.6] text-[#414b66] lg:mx-0 lg:mt-[1.6vw] lg:max-w-[max(420px,34.7vw)] lg:text-[clamp(14.5px,1.2vw,19px)]">
            {hero.bio}
          </p>
        )}

        {/* buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:mt-[1.6vw] lg:justify-start">
          <a
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[10px] bg-[#8d597b] px-[26px] text-[14px] font-bold text-white transition-colors duration-300 hover:bg-[#7a4868]"
            target="_blank"
            rel="noopener noreferrer"
            href={hero.resumeUrl}
          >
            View Resume <FiArrowRight />
          </a>
          <a
            className="inline-flex h-[46px] items-center justify-center rounded-[10px] border-[1.5px] border-[#10172a] px-[26px] text-[14px] font-bold text-[#10172a] transition-colors duration-300 hover:bg-[#10172a] hover:text-white"
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Contact Me
          </a>
        </div>

        {/* divider */}
        <div className="mx-auto mt-8 h-px w-full max-w-[520px] bg-[#e2dfe1] lg:mx-0 lg:mt-[1.9vw] lg:w-[36vw] lg:max-w-full" />

        {/* stats */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 lg:mt-[1.36vw] lg:justify-start lg:gap-x-[5vw]">
          <Stat value={hero.yearsExp} label="Years of Professional Experience" />
          <Stat value={hero.projects} label="Frontend Engineers Led" />
        </div>

        {/* social links */}
        <div className="mt-8 flex items-center justify-center gap-2 lg:mt-[2.05vw] lg:justify-start lg:gap-[0.55vw]">
          <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#676b85] lg:mr-[0.6vw] lg:text-[clamp(10.5px,0.72vw,12.5px)]">
            Find me on
          </span>
          {SOCIALS.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7e1e4] bg-white text-[#4b5068] shadow-[0_2px_8px_rgba(80,40,70,0.05)] transition-all duration-300 hover:border-[#8d597b] hover:text-[#8d597b] lg:h-[clamp(36px,2.63vw,42px)] lg:w-[clamp(36px,2.63vw,42px)]"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {showEdit && (
        <HeroFormModal
          initial={hero}
          onSave={(updated) => {
            updateHero(updated)
            setShowEdit(false)
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </section>
  )
}

export default Heros
