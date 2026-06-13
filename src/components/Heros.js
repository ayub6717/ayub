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
          <div className="md:px-6 intro mt-[100px] md:mt-[150px] lg:mt-[200px] mb-0 md:mb-[60px] lg:-mb-0 ml-0 md:ml-[58px] lg:ml-0" data-aos="fade-down">
            {isLoggedIn && (
              <div className="admin-section-toolbar">
                <button className="admin-edit-btn" onClick={() => setShowEdit(true)}>
                  ✏️ Edit Hero Section
                </button>
              </div>
            )}
            <div>
              <p className="7xl:text-[32px] lg:text-[22px] text-[16px] text-[#a16c8d]">{hero.greeting}</p>
              <h1 className="7xl:text-[100px] lg:text-[78px] text-[50px] font-extrabold color-[#2c2c2c]">{hero.name}</h1>
              <p className="7xl:text-[36px] lg:text-[1.4rem] text-[16px] text-[#a16c8d] mt-[25px] font-bold">{hero.title}</p>
              <ul className='mt-2'>
                {(hero.tags || []).map((tag, i) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
              <a className="btn" target="_blank" rel="noopener noreferrer" href={hero.resumeUrl}>Get Resume</a>

            </div>
            <div className="flex flex-col justify-center pt-5 lmd:pt-11 items-center md:items-start">
                <div
                  data-aos="fade-down"
                  className="flex items-center w-48 lg:w-[12rem] xl:w-80 gap-5 md:mt-9">
                  <h3 className="7xl:text-[55px] text-[40px]">{hero.yearsExp}</h3>
                  <p className="7xl:text-[22px] text-[16px]">Years of Experinse in Web development</p>
                </div>
                <div
                  data-aos="fade-down"
                  className="flex items-center flex-row-reverse text-right w-48 lg:w-[14rem] xl:w-80 gap-5 mt-3">
                  <h3 className="7xl:text-[55px] text-[40px]">{hero.projects}</h3>
                  <p className="7xl:text-[22px] text-[16px]">Projects Worked in my career</p>
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