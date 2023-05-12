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
              Hello! I'm Md. Ayub, a Web developer. I develop websites, web applications. My core skill is
              based on JavaScript and I love to do most things using JavaScript. As a front-end team leader, I play the role in the technical design of new systems, assist with difficult code solutions and maintain the workflow. I have familiar with a wide range of data structures, algorithms, Object-oriented programming, and
              databases. I am available for any kind of job opportunity that suits my
              interests.
            </p>
            <div className="about-action">
              <a className="bg-[#a16c8d] text-white px-4 py-3 rounded" href="https://drive.google.com/file/d/1xRvc3RkiZ_6FgWqYqK5pXM06q7b1JJYJ/view?usp=sharing" target="_blank"
              > Get Resume</a>
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