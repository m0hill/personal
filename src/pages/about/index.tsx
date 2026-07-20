import { Effect } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { datastarPage } from "@/lib/datastar"
import { annotate } from "@/lib/observability/request-log"
import { AboutPage } from "@/pages/about/components/page"
import { pageHead } from "@/ui/head"

const aboutPage = Effect.gen(function* () {
  yield* annotate({ page: { name: "about" } })

  return datastarPage(<AboutPage />, {
    title: "About — Mohil.dev",
    head: pageHead({
      canonicalPath: "/about",
      description: "About Mohil Garg, a software engineer based in Tokyo, Japan.",
    }),
  })
}).pipe(Effect.withSpan("about.page"))

export const aboutRoutes = HttpRouter.add("GET", "/about", aboutPage)
