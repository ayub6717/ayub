import React from "react"

import { Container, Title, Button } from "./common"

import profile from "../assets/image/profile.jpg"

import "./about.css"

const About = () => {
  return (
    <div id="about" className="about-area">
      <Container>
        <Title side="right" title="About Me" />
        <div data-aos="slide-right" className="about">
          <div className="about-details">
            <p>
              Greetings! I'm Md. Ayub, a proficient Web developer
              with a passion for crafting dynamic websites and innovative web
              applications. My expertise revolves around the realm of
              JavaScript. In my capacity as a front-end team leader, I actively
              contribute technical design of new systems, provide
              innovative solutions for intricate code challenges, and ensure the
              smooth progression of workflow. My proficiency spans across
              diverse domains such as, I have a deep understanding of modern web
              development practices, including component-based architecture,
              state management with tools like Redux, and integrating APIs to
              deliver seamless user experiences. I am readily open to engaging
              with captivating job opportunities that align with my fervor and
              skill set.
            </p>
            <div className="about-action">
              <a
                className="bg-[#a16c8d] text-white px-4 py-3 rounded"
                href="https://drive.google.com/file/d/1OdO54e0Sw6D1ZST6d8J_3GppF99M9ntI/view?usp=sharing"
                target="_blank"
              >
                {" "}
                Get Resume
              </a>
              <Button clickEvent link="#skill" ml="15px" title="My Skills" />
            </div>
          </div>
          <div className="about-image">
            <div className="image">
              <img alt="profile" src={profile} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export { About }
