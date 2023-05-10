import React from "react"
import { useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";
import {
  // Intro,
  LoveToDo,
  Portfolio,
  About,
  Experience,
  Skill,
  Education,
  Contact,
} from "../components"
import { Layout, SEO } from "../components/common"
import Heros from "../components/Heros"
import Navbar from "../components/Navbar";

const IndexPage = () => {
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
      disable: "mobile",
    });
  }, []);
  return (
    <div className="">
    <Layout>
      <Navbar />
        <SEO title="Ayub Shamim" />
        <Heros />
        {/* <Intro /> */}
        <About />
        <Experience />
        <Skill />
        <Portfolio />
        <LoveToDo />
        <Education />
        <Contact />
    </Layout>
    </div>
  );
};

export default IndexPage
