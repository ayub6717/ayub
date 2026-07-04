import React, { useState } from 'react'
import profile from "../assets/images/Hero/person.png";
import Socials from './Socials';
import "./socials.css"
import SkillLogo from './SkillLogo';
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import { HeroFormModal } from "../admin/FormModals"
import { resolveImage } from "../data/imageMap"

function Heros() {
  const { isLoggedIn } = useAuth()
  const { data, updateHero } = useData()
  const [showEdit, setShowEdit] = useState(false)

  const hero = data?.hero || {}

  return (
    <section id="home" className="bg-[#a16c8d0f] overflow-hidden md:pl-[50px] 2xl:pl-[75px] 5xl:pl-[190px] 7xl:pl-[290px] relative">
      <div className="lg:min-h-screen relative flex md:flex-row flex-col-reverse">
        <Socials />
        <SkillLogo />
        {/* first col */}
        <div className="md:px-6 intro mt-[100px] md:mt-[150px] lg:mt-[160px] xl:mt-[200px] mb-0 md:mb-[60px] lg:-mb-0 ml-0 md:ml-[58px] lg:ml-0" data-aos="fade-down">
          {isLoggedIn && (
            <div className="admin-section-toolbar" style={{ marginBottom: "15px" }}>
              <button className="admin-edit-btn" onClick={() => setShowEdit(true)}>
                ✏️ Edit Hero Section
              </button>
            </div>
          )}
          <div>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] 7xl:text-[24px] font-bold text-[#a16c8d] uppercase tracking-widest mb-1 md:mb-2">{hero.greeting}</p>
            <h1 className="text-[48px] md:text-[68px] lg:text-[80px] 7xl:text-[100px] font-black text-[#2c2c2c] leading-tight tracking-tight">{hero.name}</h1>
            <p className="text-[20px] md:text-[24px] lg:text-[28px] 7xl:text-[36px] text-slate-800 mt-[10px] md:mt-[15px] font-extrabold">{hero.title}</p>
            <div className="mt-3 flex items-center flex-wrap gap-1.5 text-slate-500 font-medium text-[13px] md:text-[14px] 7xl:text-[18px]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#a16c8d] opacity-50 mr-1"></span>
              {(hero.tags || []).map((tag, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="mx-1 text-[#a16c8d]/50">•</span>}
                  <span>{tag}</span>
                </React.Fragment>
              ))}
            </div>

            <p className="mt-6 text-slate-600 text-[14px] md:text-[15px] lg:text-[16px] 7xl:text-[20px] leading-relaxed max-w-[500px]">
              I build scalable, responsive, and high-performance web applications using React, TypeScript, Next.js, and modern frontend technologies.
            </p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                className="bg-[#a16c8d] text-white hover:bg-[#855473] transition-all duration-300 inline-flex items-center justify-center font-bold"
                style={{ paddingTop: "8px", paddingBottom: "8px", paddingLeft: "22px", paddingRight: "22px", borderRadius: "6px", fontSize: "13px" }}
                target="_blank"
                rel="noopener noreferrer"
                href={hero.resumeUrl}
              >
                View Resume
              </a>
              <a
                className="btn bg-transparent text-[#2c2c2c] border-[#06223F] hover:bg-[#06223f10] transition-all duration-300 inline-flex items-center justify-center"
                style={{ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "22px", paddingRight: "22px", fontSize: "13px" }}
                href="#contact"
                onClick={e => {
                  e.preventDefault();
                  const contactEl = document.querySelector("#contact");
                  if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="flex flex-row gap-6 md:gap-10 mt-10 justify-start items-center flex-wrap" data-aos="fade-up">
            <div className="flex items-center gap-3">
              <span className="text-[36px] md:text-[44px] lg:text-[48px] 7xl:text-[55px] font-black text-[#a16c8d] leading-none">{hero.yearsExp}</span>
              <div className="w-[1.5px] h-7 bg-slate-300"></div>
              <p className="text-[12px] md:text-[13px] lg:text-[14px] 7xl:text-[18px] text-slate-500 font-bold leading-tight max-w-[110px]">Years of Professional Experience</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[36px] md:text-[44px] lg:text-[48px] 7xl:text-[55px] font-black text-[#a16c8d] leading-none">{hero.projects}</span>
              <div className="w-[1.5px] h-7 bg-slate-300"></div>
              <p className="text-[12px] md:text-[13px] lg:text-[14px] 7xl:text-[18px] text-slate-500 font-bold leading-tight max-w-[110px]">Projects Delivered</p>
            </div>
          </div>
        </div>

        {/* sec col */}
        <div className="">
          <img
            src={resolveImage(hero.image) || profile}
            data-aos="slide-up"
            alt="..."
            className="h-full object-cover absolute right-3 hidden lg:block"
          />
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