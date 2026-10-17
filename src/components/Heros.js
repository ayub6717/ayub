import React, { useState, useEffect } from "react"
import { FiArrowRight } from "react-icons/fi"
import profile from "../assets/images/Hero/person.png"
import SkillLogo from "./SkillLogo"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { HeroFormModal } from "../admin/FormModals"
import { resolveImage } from "../data/imageMap"

const SOCIALS = [
  { href: "https://github.com/ayub6717", label: "GitHub", icon: <svg aria-hidden="true" viewBox="0 0 496 512" className="h-[46%] w-[46%]" fill="currentColor"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/></svg> },,
  { href: "https://linkedin.com/in/ayub6717", label: "LinkedIn", icon: <svg aria-hidden="true" viewBox="0 0 448 512" className="h-[46%] w-[46%]" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg> },,
  { href: "https://twitter.com/ayub6717", label: "Twitter", icon: <svg aria-hidden="true" viewBox="0 0 512 512" className="h-[46%] w-[46%]" fill="currentColor"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg> },,
  { href: "https://codepen.io/ayub6717", label: "CodePen", icon: <svg aria-hidden="true" viewBox="0 0 512 512" className="h-[46%] w-[46%]" fill="currentColor"><path d="M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z"/></svg> },,
  { href: "https://medium.com/ayub6717", label: "Medium", icon: <svg aria-hidden="true" viewBox="0 0 512 512" className="h-[46%] w-[46%]" fill="currentColor"><path d="M71.5 142.3c.6-5.9-1.7-11.8-6.1-15.8L20.3 72.1V64h140.2l108.4 237.7L364.2 64h133.7v8.1l-38.6 37c-3.3 2.5-5 6.7-4.3 10.8v272c-.7 4.1 1 8.3 4.3 10.8l37.7 37v8.1H307.3v-8.1l39.1-37.9c3.8-3.8 3.8-5 3.8-10.8V171.2L241.5 447.1h-14.7L100.4 171.2v184.9c-1.1 7.8 1.5 15.6 7 21.2l50.8 61.6v8.1h-144v-8L65 377.3c5.4-5.6 7.9-13.5 6.5-21.2V142.3z"/></svg> },,
]

function Stat({ value, label }) {
  return (
    <div className="flex items-center gap-3 lg:gap-[1.6vw]">
      <span className="text-[32px] font-extrabold leading-none tracking-[-0.03em] text-[#774667] md:text-[40px] lg:text-[clamp(38px,3.1vw,60px)]">
        {value}
      </span>
      <span className="h-8 w-[1.5px] bg-[#d3cbd0] lg:h-[2vw]" />
      <p className="max-w-[100px] text-left text-[12px] font-medium leading-[1.3] text-[#56607a] lg:max-w-[max(92px,6.2vw)] lg:text-[clamp(11.5px,0.85vw,16px)]">
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
  const hasCustomImage = Boolean(hero.image)
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
      style={{ fontFamily: "'Montserrat', 'Lato', sans-serif" }}
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
          {hasCustomImage ? (
            <img
              src={photo}
              alt={hero.name || "Profile"}
              className="absolute inset-0 h-full w-full rounded-[32px] object-cover object-top"
            />
          ) : (
            <img
              src={photo}
              alt={hero.name || "Profile"}
              className="absolute bottom-0 max-w-none select-none"
              style={{ height: "111.5%", left: "-45%" }}
            />
          )}
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
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#6f3a5e] md:text-[13px] lg:text-[clamp(12px,0.97vw,18px)]">
            {hero.greeting}
          </p>
          <span className="relative block h-[5px] w-[34px] lg:w-[3vw]">
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#7f4a76]" />
            <span className="absolute left-0 top-0 h-[5px] w-[5px] rounded-full bg-[#7f4a76]" />
            <span className="absolute right-0 top-0 h-[5px] w-[5px] rounded-full bg-[#7f4a76]" />
          </span>
        </div>

        {/* name */}
        <h1 className="mt-3 text-[48px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0f172a] md:text-[64px] lg:mt-[0.67vw] lg:text-[clamp(60px,5.55vw,112px)]">
          {hero.name}
        </h1>

        {/* typed title */}
        <p className="mt-3 text-[18px] font-semibold text-[#111a2e] md:text-[22px] lg:mt-[0.8vw] lg:text-[clamp(18px,1.95vw,36px)]">
          {typedTitle}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>

        {/* tags */}
        {tagList.length > 0 && (
          <div className="mt-5 flex justify-center lg:mt-[1.15vw] lg:justify-start">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg leading-[1.2] bg-[#f4eced] px-4 py-2 text-[13px] font-medium text-[#4a5470] lg:gap-x-[1.1vw] lg:px-[1vw] lg:py-[0.53vw] lg:text-[clamp(13px,0.963vw,19px)]">
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
          <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.6] text-[#414b66] lg:mx-0 lg:mt-[1.6vw] lg:max-w-[max(420px,34.7vw)] lg:text-[clamp(14.5px,1.2vw,23px)]">
            {hero.bio}
          </p>
        )}

        {/* buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:mt-[1.6vw] lg:justify-start lg:gap-[1.85vw]">
          <a
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[14px] bg-[#8d597b] px-6 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#7a4868] lg:h-[clamp(46px,3.1vw,60px)] lg:px-[1.4vw] lg:text-[clamp(14px,1.02vw,20px)]"
            target="_blank"
            rel="noopener noreferrer"
            href={hero.resumeUrl}
          >
            View Resume <FiArrowRight className="text-[1.05em]" />
          </a>
          <a
            className="inline-flex h-[46px] items-center justify-center rounded-[14px] border-[1.5px] border-[#10172a] px-6 text-[14px] font-semibold text-[#10172a] transition-colors duration-300 hover:bg-[#10172a] hover:text-white lg:h-[clamp(46px,3.1vw,60px)] lg:px-[1.4vw] lg:text-[clamp(14px,1.02vw,20px)]"
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
          <Stat value={hero.projects} label="Projects Delivered" />
        </div>

        {/* social links */}
        <div className="mt-8 flex items-center justify-center gap-2 lg:mt-[2.05vw] lg:justify-start lg:gap-[0.55vw]">
          <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#676b85] lg:mr-[0.6vw] lg:text-[clamp(10.5px,0.72vw,15px)]">
            Find me on
          </span>
          {SOCIALS.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7e1e4] bg-white text-[#4b5068] shadow-[0_2px_8px_rgba(80,40,70,0.05)] transition-all duration-300 hover:border-[#8d597b] hover:text-[#8d597b] lg:h-[clamp(36px,2.63vw,50px)] lg:w-[clamp(36px,2.63vw,50px)]"
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
