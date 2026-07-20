import { Effect } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { SITE_TITLE } from "@/lib/constants"
import { datastarPage } from "@/lib/datastar"
import { pageHead } from "@/ui/head"

const notFoundPage = Effect.sync(() =>
  datastarPage(
    <main
      id="app"
      class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 p-4 sm:p-8"
    >
      <p class="text-sm font-medium text-muted">404</p>
      <h1 class="text-3xl font-bold sm:text-4xl">Page not found</h1>
      <p class="max-w-xl text-muted">The page you requested does not exist.</p>
      <a
        href="/"
        class="w-fit font-medium underline"
      >
        Return home
      </a>
    </main>,
    {
      title: `Page not found — ${SITE_TITLE}`,
      head: pageHead(),
    },
    { status: 404 },
  ),
)

export const notFoundRoute = HttpRouter.add("*", "/*", notFoundPage)
