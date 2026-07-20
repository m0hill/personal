import { Effect } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { SITE_TITLE } from "@/lib/constants"
import { datastarPage } from "@/lib/datastar"
import { pageHead } from "@/ui/head"
import { SiteShell } from "@/ui/site-shell"

const notFoundPage = Effect.sync(() =>
  datastarPage(
    <SiteShell>
      <section class="flex max-w-2xl flex-col gap-7 py-8 sm:py-16">
        <p class="eyebrow">404 / Not found</p>
        <h1 class="display-heading">Page not found</h1>
        <p class="max-w-xl text-lg leading-8 text-muted">
          The page you requested does not exist or may have moved elsewhere.
        </p>
        <a
          href="/"
          class="text-link w-fit font-mono text-xs"
          data-nav-prefetch
        >
          Return home <span aria-hidden="true">→</span>
        </a>
      </section>
    </SiteShell>,
    {
      title: `Page not found — ${SITE_TITLE}`,
      head: pageHead(),
    },
    { status: 404 },
  ),
)

export const notFoundRoute = HttpRouter.add("*", "/*", notFoundPage)
