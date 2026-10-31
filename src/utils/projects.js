// Project visibility + ordering helpers (used by the Projects section, the detail page and the build).
//
// Data lives in src/data/data.json under "portfolios".
//   "hidden": true  -> project stays in the data (images, content, everything) but is not shown anywhere
//                      on the site and its /project/<slug> page behaves like "not found".
//                      To bring it back, delete the flag or set it to false.
//   "order": <number> -> position inside its tab (lowest first). Projects without "order" go last.

export const isVisibleProject = (project) => Boolean(project) && !project.hidden

const byOrder = (a, b) =>
  (Number.isFinite(a.order) ? a.order : Infinity) - (Number.isFinite(b.order) ? b.order : Infinity)

// Visible projects of one category, sorted by "order" (stable for equal / missing order).
export function getVisibleProjects(list = []) {
  return list
    .filter(isVisibleProject)
    .map((project, index) => ({ project, index }))
    .sort((a, b) => byOrder(a.project, b.project) || a.index - b.index)
    .map(({ project }) => project)
}

// { category: visibleProjects } without categories that have nothing visible (e.g. an empty "Others" tab).
export function getVisiblePortfolios(portfolios = {}) {
  return Object.fromEntries(
    Object.entries(portfolios)
      .map(([category, list]) => [category, getVisibleProjects(list)])
      .filter(([, list]) => list.length > 0)
  )
}

// Order value that places a project before everything else in a category.
export function orderBeforeFirst(list = []) {
  const orders = list.map((p) => p?.order).filter(Number.isFinite)
  return orders.length ? Math.min(...orders) - 10 : 0
}
