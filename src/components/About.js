import React from "react"

import { Container, Title, Button } from "./common"

import profile from "../assets/image/profile.jpg"

import "./about.css"

const About = () => {
return (
<div id="about" className="about-area">
  <Container>
    <Title side="right" title="About Me" />
    <div className="about">
      <div className="about-details">
        <p>
          Hello! I'm Md. Ayub, a Web developer. I develop websites, web applications. My core skill is
          based on JavaScript and I love to do most things using JavaScript. I love to make the web more open to the
          world. I have familiar with a wide range of data structures, algorithms, Object-oriented programming, and
          databases. I have graduated with a bachelor's degree in Computer Science Engineering from Daffodil
          International University, Bangladesh in 2020. I am available for any kind of job opportunity that suits my
          interests.
        </p>
        <div className="about-action">
          <Button link="https://github.com/ayub6717/ayub/raw/main/src/data/file/MyResume.pdf" target="_blank"
            bgColor="#00cf5d" title="Get Resume" />
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