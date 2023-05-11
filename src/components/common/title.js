import React from "react"
import {
  FaGithub,
  FaCodepen,
  FaLinkedinIn,
  FaMediumM,
  FaTwitter,
} from "react-icons/fa"

import "./title.css"

export const Title = ({ title, social, side, height }) => {
  return (
    <div
      data-aos="fade-in"
      style={{ height }}
      className={`title ${side} ${social ? "social" : ""}`}
    >
      {social && (
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/ayub6717"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://codepen.io/ayub6717"
            >
              <FaCodepen />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/ayub6717"
            >
              <FaLinkedinIn />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/ayub6717"
            >
              <FaMediumM />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/ayub6717"
            >
              <FaTwitter />
            </a>
          </li>
        </ul>
      )}
      <p>{title}</p>
    </div>
  )
}

Title.defaultProps = {
  side: "left",
  height: "160px",
}
