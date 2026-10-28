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

export const projectPath = (name) => `/project/${slugify(name)}`
