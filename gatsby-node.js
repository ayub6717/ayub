const fs = require("fs")
const path = require("path")
const express = require("express")

exports.onCreateDevServer = ({ app }) => {
  app.use(express.json({ limit: "200mb" }))

  app.post("/api/save-data", (req, res) => {
    try {
      const dataPath = path.join(__dirname, "src/data/data.json")
      fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2), "utf8")
      console.log("Successfully wrote updated portfolio data to src/data/data.json")
      res.status(200).json({ success: true, message: "Successfully saved to disk" })
    } catch (error) {
      console.error("Error writing data.json to disk:", error)
      res.status(500).json({ success: false, error: error.message })
    }
  })
}
