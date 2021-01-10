import React from "react"

import { Container, Title, Button } from "./common"

import "./intro.css"

const Intro = () => {
  return (
    <div className="intro-area">
      <Title title="Follow Me" social height="320px" />
      <Container>
        <div className="intro">
          <div className="intro-text">
            <p>Hello! I am</p>
            <h1>AYUB</h1>
            <h3>Front-End Developer</h3>
            <ul>
              <li>Web Developer</li>
              <li>Programmer</li>
            </ul>
            <div className="action">
              <Button
                link="https://drive.google.com/file/d/1xRvc3RkiZ_6FgWqYqK5pXM06q7b1JJYJ/view?usp=sharing"
                target="__blank"
                bgColor="#00cf5d"
                title="Get Resume"
              />
              <Button clickEvent link="#about" ml="15px" title="About Me" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export { Intro }
