import React from "react"
import PropTypes from "prop-types"
import { Footer } from "./footer"
import "./layout.css"

const Layout = ({ children, noFooter = false }) => {
  return (
    <div>
      <main>{children}</main>
      {!noFooter && <Footer />}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  noFooter: PropTypes.bool,
}

export { Layout }
