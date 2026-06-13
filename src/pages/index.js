import React, { useEffect } from "react";
import { Link } from "gatsby";
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
import { useAuth } from "../context/AuthContext";
import AdminBar from "../admin/AdminBar";

const IndexPage = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
    });
  }, []);

  return (
    <div>
        {isLoggedIn && <AdminBar />}
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

        {!isLoggedIn && (
          <div className="admin-login-hint">
            <Link to="/admin" className="admin-login-trigger" title="Admin Login">
              🔐
            </Link>
          </div>
        )}
    </div>
  );
};

export default IndexPage

