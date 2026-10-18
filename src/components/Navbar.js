import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import { content } from "../Content"
import { useAuth } from "../context/AuthContext"
import "./navbar.css"

function Navbar() {
  const { nav } = content
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === "/"
  const headerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(isHome ? nav[0].link : null)
  const [scrolled, setScrolled] = useState(false)

  const scrollToSection = (hash, behavior) => {
    try {
      document.querySelector(hash)?.scrollIntoView({ behavior })
    } catch {
      /* ignore invalid hash */
    }
  }

  // Arrived from another page (e.g. a project) with a #section in the URL.
  useEffect(() => {
    if (!isHome || !location.hash) return
    const timers = [0, 300].map(ms => setTimeout(() => scrollToSection(location.hash, "auto"), ms))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Background once the page is scrolled; highlight the section currently in view.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (!isHome) return
      const line = window.innerHeight * 0.35
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = nav[0].link
      if (atBottom) {
        // the last section can be too short for its top to ever reach the line
        current = nav[nav.length - 1].link
      } else {
        // the section whose top is closest above the line, whatever order the menu lists them in
        let best = -Infinity
        for (const { link } of nav) {
          const top = document.querySelector(link)?.getBoundingClientRect().top
          if (top !== undefined && top <= line && top > best) {
            best = top
            current = link
          }
        }
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [isHome, nav])

  // Phone/tablet dropdown: close on outside click or Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = e => {
      if (!headerRef.current?.contains(e.target)) setOpen(false)
    }
    const onKeyDown = e => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown, { passive: true })
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  // Flag a nav-driven smooth scroll so section titles can wait for it to land (see Title).
  const markNavScroll = () => {
    const root = document.documentElement
    root.dataset.navScrolling = "1"
    let timer
    const finish = () => {
      window.removeEventListener("scroll", onScroll)
      delete root.dataset.navScrolling
      window.dispatchEvent(new Event("nav-scroll-end"))
    }
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(finish, 150)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    timer = setTimeout(finish, 300)
  }

  const handleClick = (e, link) => {
    e.preventDefault()
    setOpen(false)
    if (isHome) {
      setActive(link)
      markNavScroll()
      scrollToSection(link, "smooth")
    } else {
      navigate({ pathname: "/", hash: link })
    }
  }

  return (
    <header
      ref={headerRef}
      className={`site-nav${scrolled ? " scrolled" : ""}${isLoggedIn ? " with-admin-bar" : ""}`}
    >
      <button
        type="button"
        className="site-nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-nav-list"
        onClick={() => setOpen(o => !o)}
      >
        {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
      </button>
      <nav id="site-nav-list" className={`site-nav-list${open ? " open" : ""}`} aria-label="Sections">
        {nav.map(item => (
          <a
            key={item.link}
            href={item.link}
            onClick={e => handleClick(e, item.link)}
            className={`site-nav-link${item.link === active ? " active" : ""}`}
            aria-current={item.link === active ? "true" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
