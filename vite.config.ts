import { defineConfig, transformWithEsbuild } from "vite"
import react from "@vitejs/plugin-react"
import fs from "node:fs"
import path from "node:path"

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null
        return transformWithEsbuild(code, id, { loader: "jsx", jsx: "automatic" })
      },
    },
    react(),
    {
      name: "save-data-api",
      configureServer(server) {
        server.middlewares.use("/api/save-data", (req, res, next) => {
          if (req.method !== "POST") return next()
          let body = ""
          req.on("data", (chunk: Buffer) => { body += chunk })
          req.on("end", () => {
            try {
              const dataPath = path.join(__dirname, "src/data/data.json")
              fs.writeFileSync(dataPath, body, "utf8")
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ success: true }))
            } catch (err: any) {
              res.statusCode = 500
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        })
      },
    },
  ],
})
