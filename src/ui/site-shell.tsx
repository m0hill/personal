import { js, type HtmlChild } from "datastar-kit"
import { SITE, THEME_STORAGE_KEY } from "@/lib/constants"

const navigation = [
  { label: "Home", href: "/", section: "home" },
  { label: "About", href: "/about", section: "about" },
  { label: "Projects", href: "/projects", section: "projects" },
  { label: "Blog", href: "/blog", section: "blog" },
  { label: "Live", href: "/live", section: "live" },
] as const

type SiteSection = (typeof navigation)[number]["section"]

const readTheme = js(`
  try {
    const storedTheme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})
    $theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "system"
  } catch {
    $theme = "system"
  }
`)

const applyTheme = js(`
  document.documentElement.dataset.theme = $theme
  try {
    if ($theme === "system") localStorage.removeItem(${JSON.stringify(THEME_STORAGE_KEY)})
    else localStorage.setItem(${JSON.stringify(THEME_STORAGE_KEY)}, $theme)
  } catch {}
`)

const cycleTheme = js(
  `$theme = $theme === "system" ? "light" : $theme === "light" ? "dark" : "system"`,
)

const themeLabel = js<string>(
  `$theme === "system" ? "System" : $theme === "light" ? "Light" : "Dark"`,
)

const themeAriaLabel = js<string>(
  `"Theme: " + ($theme === "system" ? "System" : $theme === "light" ? "Light" : "Dark")`,
)

export const SiteShell = ({
  current,
  children,
}: {
  readonly current?: SiteSection
  readonly children: HtmlChild
}) => (
  <div
    class="site-shell"
    data-signals={{ theme: "system" }}
    data-init={readTheme}
    data-effect={applyTheme}
  >
    <a
      href="#content"
      class="skip-link"
    >
      Skip to content
    </a>
    <header class="site-header">
      <div class="site-container flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8">
        <a
          href="/"
          class="site-mark"
          data-nav-prefetch
        >
          <span>Mohil Garg</span>
          <span class="font-mono text-xs font-normal text-muted">mohil.dev</span>
        </a>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-4 sm:justify-end">
          <nav aria-label="Primary navigation">
            <ul class="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs">
              {navigation.map((item) => (
                <li>
                  <a
                    href={item.href}
                    aria-current={current === item.section ? "page" : undefined}
                    class="nav-link"
                    data-nav-prefetch
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            class="theme-control"
            aria-label="Theme: System"
            data-attr:aria-label={themeAriaLabel}
            data-on:click={cycleTheme}
          >
            <span aria-hidden="true">Theme</span>
            <span
              aria-hidden="true"
              data-text={themeLabel}
            >
              System
            </span>
          </button>
        </div>
      </div>
    </header>
    <main
      id="content"
      class="site-container flex-1 py-16 sm:py-24"
      tabindex="-1"
    >
      {children}
    </main>
    <footer class="site-footer">
      <div class="site-container flex flex-col gap-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p class="font-serif text-lg">Let&apos;s stay in touch.</p>
        <div class="flex flex-wrap gap-x-5 gap-y-3 font-mono text-xs">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a
            href={SITE.github}
            rel="me"
          >
            github.com/m0hill
          </a>
        </div>
      </div>
    </footer>
  </div>
)
