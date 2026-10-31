import { defineConfig, transformWithEsbuild } from "vite"
import react from "@vitejs/plugin-react"
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { getSlug } from "./src/utils/slug.js"

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
      // Emits project-meta.json (slug -> name/description) for the /project edge function
      name: "project-meta-json",
      generateBundle() {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, "src/data/data.json"), "utf8"))
        const meta: Record<string, { name: string; description: string }> = {}
        for (const list of Object.values<any[]>(data.portfolios || {})) {
          for (const p of list) {
            if (!p?.name) continue
            const slug = getSlug(p)
            if (!meta[slug]) meta[slug] = { name: p.name, description: String(p.summary || p.description || "") }
          }
        }
        this.emitFile({ type: "asset", fileName: "project-meta.json", source: JSON.stringify(meta) })
      },
    },
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
              // Keep base64 uploads out of data.json (it gets bundled into the JS): store them as files in src/data/image
              const imageDir = path.join(__dirname, "src/data/image")
              const extByMime: Record<string, string> = { png: "png", jpeg: "jpg", jpg: "jpg", webp: "webp", gif: "gif", "svg+xml": "svg" }
              const externalize = (value: unknown): unknown => {
                if (typeof value === "string") {
                  const m = /^data:image\/([a-z0-9.+-]+);base64,/i.exec(value)
                  if (!m || !extByMime[m[1].toLowerCase()]) return value
                  const buf = Buffer.from(value.slice(m[0].length), "base64")
                  const name = `upload-${crypto.createHash("sha1").update(buf).digest("hex").slice(0, 10)}.${extByMime[m[1].toLowerCase()]}`
                  fs.writeFileSync(path.join(imageDir, name), buf)
                  return name
                }
                if (Array.isArray(value)) return value.map(externalize)
                if (value && typeof value === "object") {
                  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, externalize(v)]))
                }
                return value
              }
              body = JSON.stringify(externalize(JSON.parse(body)))
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
