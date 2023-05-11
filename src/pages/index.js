import React, { useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";
import {
  LoveToDo,
  Portfolio,
  About,
  Experience,
  Skill,
  Education,
  Contact,
} from "../components"
import { SEO } from "../components/common"
import Heros from "../components/Heros"
import Navbar from "../components/Navbar";

const IndexPage = () => {
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
    });
  }, []);
  return (
    <div>
        <Navbar />
        <SEO title="Ayub Shamim" />
        <Heros />
        <About />
        <Experience />
        <Skill />
        <Portfolio />
        <LoveToDo />
        <Education />
        <Contact />
    </div>
  );
};

export default IndexPage
