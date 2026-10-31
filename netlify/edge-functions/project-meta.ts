// Rewrites the Open Graph tags of /project/<slug> so crawlers (LinkedIn, Slack, ...)
// that don't run JavaScript see the real page URL, title and description.
// Legacy /project?name=... links are pointed at the clean /project/<slug> URL.
type Meta = Record<string, { name: string; description: string }>

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const slugify = (name: string) =>
  name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const truncate = (text: string, max = 200) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text)

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const response = await context.next()
  if (!(response.headers.get("content-type") || "").includes("text/html")) return response

  const url = new URL(request.url)
  const pathSlug = decodeURIComponent(url.pathname.replace(/^\/project\/?/, "")).replace(/\/$/, "")
  const slug = pathSlug || slugify(url.searchParams.get("name") || "")
  if (!slug) return response

  let meta: Meta | null = null
  try {
    const res = await fetch(new URL("/project-meta.json", url.origin))
    if (res.ok) meta = await res.json()
  } catch {
    // metadata unavailable: serve the page untouched
  }
  if (!meta) return response

  // Unknown or hidden project: still serve the app (it renders its "Not Found" page) but with a real 404 status
  const project = meta[slug]
  if (!project) {
    const headers = new Headers(response.headers)
    headers.delete("content-length")
    return new Response(await response.text(), { status: 404, headers })
  }

  const title = escapeHtml(`${project.name} | Ayub Shamim`)
  const description = escapeHtml(truncate(project.description))
  const canonical = escapeHtml(`${url.origin}/project/${slug}`)

  const html = (await response.text())
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)

  const headers = new Headers(response.headers)
  headers.delete("content-length")
  return new Response(html, { status: response.status, headers })
}

export const config = { path: ["/project", "/project/*"] }
