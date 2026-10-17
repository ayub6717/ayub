// Maps image filenames to their Vite-processed URLs.
// import.meta.glob eagerly imports all images so Vite can hash/bundle them.
const modules = import.meta.glob('./image/*', { eager: true, import: 'default' })

const imageMap = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.replace('./image/', ''), url])
)

/**
 * Resolves an image value:
 * - If it starts with http/https/data:/  → treat as URL, return as-is
 * - If it's a filename → look up in imageMap
 * - Otherwise return null
 */
export function resolveImage(value) {
  if (!value) return null
  if (typeof value === "object") return value.default ?? value
  if (value.startsWith("http") || value.startsWith("data:") || value.startsWith("/")) return value
  return imageMap[value] || null
}

export default imageMap
