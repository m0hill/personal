import { Effect } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { datastarPage } from "@/lib/datastar"
import { annotate } from "@/lib/observability/request-log"
import { pageHead } from "@/ui/head"
import { HomePage } from "@/pages/home/components/page"

const homePage = Effect.gen(function* () {
  yield* annotate({ page: { name: "home" } })

  return datastarPage(<HomePage />, {
    title: "Mohil Garg — Software engineer",
    head: pageHead({
      canonicalPath: "/",
      description:
        "Mohil Garg builds cloud systems, developer tools, and realtime web experiences.",
    }),
  })
}).pipe(Effect.withSpan("home.page"))

export const homeRoutes = HttpRouter.add("GET", "/", homePage)
