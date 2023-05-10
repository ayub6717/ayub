import React from 'react'
import profile from "../assets/images/Hero/person.png";
import Socials from './Socials';
import "./socials.css"
import SkillLogo from './SkillLogo';

function Heros() {
  return(
    <section id="home" className="overflow-hidden md:pl-[50px] 2xl:pl-[75px] 5xl:pl-[190px] 7xl:pl-[290px]">
    <div className="md:min-h-screen relative flex md:flex-row flex-col-reverse">
        <Socials />
        <SkillLogo />
        {/* first col */}
          <div className="intro-area">
            <p title="Follow Me" social height="320px" />
          </div>
          <div className="md:px-6 intro mt-[100px] md:mt-[150px] lg:mt-[200px]" data-aos="fade-down">
            <div>
              <p className="7xl:text-[32px] lg:text-[22px] text-[16px] text-[#a16c8d]">Hello I'm</p>
              <h1 className="7xl:text-[100px] lg:text-[78px] text-[50px] font-extrabold color-[#2c2c2c]">AYUB</h1>
              <p className="7xl:text-[36px] lg:text-[1.4rem] text-[16px] text-[#a16c8d] mt-[25px] font-bold">Front-End Developer</p>
              <ul className='mt-2'>
                <li>Web Developer</li>
                <li>Programmer</li>
              </ul>
              <a className="btn" target="_blank" href="https://drive.google.com/file/d/1xRvc3RkiZ_6FgWqYqK5pXM06q7b1JJYJ/view?usp=sharing">Get Resume</a>

            </div>
            <div className="flex flex-col justify-center pt-5 lmd:pt-11 items-center md:items-start">
                <div
                  data-aos="fade-down"
                  className="flex items-center w-48 lg:w-[12rem] xl:w-80 gap-5 md:mt-9">
                  <h3 className="7xl:text-[55px] text-[40px]">3+</h3>
                  <p className="7xl:text-[22px] text-[16px]">Years of Experinse in Web development</p>
                </div>
                <div
                  data-aos="fade-down"
                  className="flex items-center flex-row-reverse text-right w-48 lg:w-[14rem] xl:w-80 gap-5 mt-3">
                  <h3 className="7xl:text-[55px] text-[40px]">21+</h3>
                  <p className="7xl:text-[22px] text-[16px]">Projects Worked in my career</p>
                </div>
            </div>
          </div>

          {/* sec col */}
          <div className="">
            <img
              src={profile}
              data-aos="slide-up"
              alt="..."
              className="h-full object-cover absolute right-3 hidden lg:block"
            />
          </div>
      </div>
  </section>
  )
}

export default Heros