import React from "react"

import {
  Intro,
  LoveToDo,
  Portfolio,
  About,
  Experience,
  Skill,
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
      <LoveToDo />
      <Portfolio />
      <Contact />
    </Layout>
  </>
)

export default IndexPage
