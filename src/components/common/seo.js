import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet-async"

const siteMetadata = {
  title: "Front End Developer",
  description: "My personal portfolio website",
  author: "@Ayub",
}

function SEO({ description = "", lang = "bn", meta = [], title }) {
  const metaDescription = description || siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        { name: "description", content: metaDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: metaDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:creator", content: siteMetadata.author },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: metaDescription },
      ].concat(meta)}
    />
  )
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export { SEO }
