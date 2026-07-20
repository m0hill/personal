export const DATASTAR_RUNTIME = "/datastar.js"

export const SITE = {
  title: "Mohil.dev",
  origin: "https://mohil.dev",
  email: "mohilg@outlook.com",
  github: "https://github.com/m0hill",
} as const

export const SITE_TITLE = SITE.title
export const THEME_STORAGE_KEY = "mohil-theme"

export const canonicalUrl = (path: `/${string}`): string => new URL(path, SITE.origin).href
