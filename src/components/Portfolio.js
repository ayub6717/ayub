import React, { useState } from "react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

import { Container } from "./common"

import { portfolios } from "../data"

import "./portfolio.css"
import PortfolioAction from "./PortfolioAction"

const Portfolio = () => {
  const portfoliosName = Object.keys(portfolios)
  const [selectedPortfolio, setSelectedPortfolio] = useState(portfoliosName[0])
  const selectedFeaturedPortfolios = portfolios[selectedPortfolio].filter(
    portfolio => portfolio.type === "featured"
  )
  const selectedPortfolios = portfolios[selectedPortfolio].filter(
    portfolio => portfolio.type === "regular"
  )
  return (
    <div id="portfolio" className="portfolio-area">
      <Container>
        <div className="title left" style={{ height: "160px" }}>
          <p>Portfolio</p>
        </div>
        <div className="portfolios">
          <ul className="portfolio-nav">
            {portfoliosName.map(name => (
              <li
                onClick={() => setSelectedPortfolio(name)}
                className={name === selectedPortfolio ? "active" : ""}
                key={name}
              >
                {name}
              </li>
            ))}
          </ul>
          <div className="portfolio-items portfolios-featured">
            {selectedFeaturedPortfolios.map((portfolio, index) => (
              <div key={index} className="portfolio w-full lg:w-[31%] xl:w-[32%]">
                <div className="portfolio-img">
                  <img alt={portfolio.name} src={portfolio.image} />
                </div>
                <div className="details">
                  <h4>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={portfolio.demo}
                    >
                      {portfolio.name}
                    </a>
                  </h4>
                  <p className="text-[16px]">{portfolio.description}</p>

                  <p className="text-[#9c9c9c] mt-2 text-xs">{portfolio.adminLog}</p>
                  <p className="text-[#9c9c9c] text-xs">{portfolio.userLog}</p>
                  <p className="text-[#9c9c9c] text-xs">{portfolio.pass}</p>

                  <p className="text-[#A16C8D] mt-1.5">{portfolio.soon}</p>
                  <div className="links">
                    <ul>
                      {portfolio.source && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={portfolio.source}
                          >
                            <FaGithub />
                          </a>
                        </li>
                      )}
                      {portfolio.demo && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={portfolio.demo}
                          >
                            <FaExternalLinkAlt />
                          </a>
                        </li>
                      )}

                      {portfolio.demo2 && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={portfolio.demo2}
                            className="mb-1"
                          >
                            <svg height="25" viewBox="-34.32047659 -70.74 659.48047659 705.28041072" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m467 26.32c-82.74-97.06-350.5 90.93-348.33 333.27-.02 1.48-.33 2.93-.91 4.29a11.39 11.39 0 0 1 -2.44 3.62 11.19 11.19 0 0 1 -3.63 2.45c-1.35.58-2.8.89-4.27.91-.98-.01-1.94-.14-2.88-.4-.94-.25-1.84-.63-2.68-1.11s-1.62-1.07-2.32-1.75c-.69-.68-1.3-1.44-1.8-2.27-6.8-14.83-12.2-30.26-16.11-46.1s-6.32-32.01-7.19-48.3c-.88-16.29-.22-32.63 1.97-48.8 2.18-16.16 5.89-32.09 11.06-47.56.78-2.29.74-4.78-.12-7.05a10.45 10.45 0 0 0 -11.49-6.65c-2.38.4-4.56 1.6-6.16 3.42-11.03 11.77-20.93 24.56-29.57 38.19s-15.97 28.04-21.91 43.05a258.192 258.192 0 0 0 -13.47 46.39 257.972 257.972 0 0 0 -4.56 48.1c-.39 34.25 6.05 68.23 18.96 99.95a256.996 256.996 0 0 0 56.21 84.74 256.804 256.804 0 0 0 84.66 56.28 256.458 256.458 0 0 0 99.84 18.97c365.3-8.3 280.99-487.06 207.14-573.64z" fill="currentColor"/></svg>
                          </a>
                        </li>
                      )}
                      
                    </ul>
                  </div>
                  <ul className="portfolio-tools">
                    {portfolio.tools.map(tool => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="portfolio-items portfolios-regular">
            {selectedPortfolios.map((portfolio, index) => (
              <div key={index} className="portfolio small">
                <div className="details">
                  <h4>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={portfolio.demo}
                    >
                      {portfolio.name}
                    </a>
                  </h4>
                  <p>{portfolio.description}</p>
                  <div className="links">
                    <ul>
                      {portfolio.source && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={portfolio.source}
                          >
                            <FaGithub />
                          </a>
                        </li>
                      )}
                      {portfolio.demo && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={portfolio.demo}
                          >
                            <FaExternalLinkAlt />
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                  <ul className="portfolio-tools">
                    {portfolio.tools.map(tool => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <PortfolioAction />
        </div>
      </Container>
    </div>
  )
}

export { Portfolio }
