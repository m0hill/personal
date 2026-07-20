import { DATASTAR_RUNTIME, THEME_STORAGE_KEY, canonicalUrl } from "@/lib/constants"

const navigationPrefetchRules = JSON.stringify({
  prefetch: [
    {
      source: "document",
      where: {
        and: [
          { href_matches: "/*" },
          { selector_matches: "a[data-nav-prefetch]:not([target='_blank']):not([download])" },
        ],
      },
      eagerness: "moderate",
    },
  ],
})

const themeBootstrap = `try{const theme=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(theme==="light"||theme==="dark")document.documentElement.dataset.theme=theme}catch{}`

export const pageHead = ({
  canonicalPath,
  description,
}: {
  readonly canonicalPath?: `/${string}`
  readonly description?: string
} = {}) => [
  <meta charset="utf-8" />,
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />,
  <meta
    name="color-scheme"
    content="light dark"
  />,
  description === undefined ? null : (
    <meta
      name="description"
      content={description}
    />
  ),
  canonicalPath === undefined ? null : (
    <link
      rel="canonical"
      href={canonicalUrl(canonicalPath)}
    />
  ),
  <script>{themeBootstrap}</script>,
  <link
    rel="stylesheet"
    href="/app.css"
  />,
  <script type="speculationrules">{navigationPrefetchRules}</script>,
  <script
    type="module"
    src={DATASTAR_RUNTIME}
  />,
]
