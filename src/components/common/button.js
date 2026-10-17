import React from "react"

import "./button.css"

const Button = ({
  title = "Button",
  link = "https://ayub6717.netlify.app/",
  target = "",
  clickEvent,
  onMouseOver,
  onMouseOut,
  color = "#2c2c2c",
  bgColor = "transparent",
  borderColor = "#06223F",
  mt,
  mb,
  ml,
  mr,
}) => {
  const handleClick = e => {
    e.preventDefault()
    const hash = e.target.hash
    const el = document.querySelector(hash)
    const offsetTop = el.offsetTop
    window.scrollTo({
      top: offsetTop,
      left: 0,
      behavior: "smooth",
    })
  }
  return (
    <a
      style={{
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        color,
        borderColor,
        backgroundColor: bgColor,
      }}
      target={target}
      onClick={clickEvent && handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      rel={target ? "noopener noreferrer" : ""}
      className="btn"
      href={link}
    >
      {title}
    </a>
  )
}

export { Button }
