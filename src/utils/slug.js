// "American Trust Custody" -> "american-trust-custody"
export function slugify(name = "") {
  return String(name)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// A project may pin its URL with an explicit `slug` (so renaming it doesn't break shared links)
export const getSlug = (project) => project.slug || slugify(project.name)

export const projectPath = (project) =>
  `/project/${typeof project === "string" ? slugify(project) : getSlug(project)}`
