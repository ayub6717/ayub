import React from "react"

import {
  Intro,
  LoveToDo,
  Portfolio,
  About,
  Experience,
  Skill,
  Education,
  Contact,
} from "../components"
import { Layout, SEO } from "../components/common"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Ayub Shamim" />
      <Intro />
      <About />
      <Experience />
      <Skill />
      <Portfolio />
      <LoveToDo />
      <Education />
      <Contact />
    </Layout>
  </>
)

export default IndexPage
