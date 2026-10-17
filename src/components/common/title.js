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

  useEffect(() => {
    const trigger = innerRef.current
    const line = lineRef.current
    if (!trigger || !line) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.classList.add("animate")
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(trigger)
    return () => observer.disconnect()
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

