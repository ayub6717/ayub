import React, { useRef, useEffect } from "react"
import {
  FaGithub,
  FaCodepen,
  FaLinkedinIn,
  FaMediumM,
  FaTwitter,
} from "react-icons/fa"

import "./title.css"

export const Title = ({ title, social }) => {
  const innerRef = useRef(null)
  const lineRef = useRef(null)

  // Draw the underline as soon as the title scrolls into view. The one exception is a
  // nav-triggered smooth scroll (see Navbar): titles fly past, so wait until it lands.
  useEffect(() => {
    const trigger = innerRef.current
    const line = lineRef.current
    if (!trigger || !line) return
    const root = document.documentElement
    let visible = false
    const stop = () => {
      observer.disconnect()
      window.removeEventListener("nav-scroll-end", play)
    }
    const play = () => {
      if (!visible || root.dataset.navScrolling) return
      line.classList.add("animate")
      stop()
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        play()
      },
      { threshold: 0.2 }
    )
    observer.observe(trigger)
    window.addEventListener("nav-scroll-end", play)
    return stop
  }, [])

  return (
    <div className="title">
      <div className="title-inner" ref={innerRef}>
        <p>{title}</p>
        <div className="title-line" ref={lineRef}></div>
      </div>
      {social && (
        <ul>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/ayub6717">
              <FaGithub />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://codepen.io/ayub6717">
              <FaCodepen />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ayub6717">
              <FaLinkedinIn />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://medium.com/ayub6717">
              <FaMediumM />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ayub6717">
              <FaTwitter />
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}

