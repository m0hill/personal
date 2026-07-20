import { Effect } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { datastarPage } from "@/lib/datastar"
import { annotate } from "@/lib/observability/request-log"
import { parseProjectCatalog } from "@/pages/projects/catalog"
import { ProjectsPage } from "@/pages/projects/components/page"
import { pageHead } from "@/ui/head"
import { SiteShell } from "@/ui/site-shell"

const unavailablePage = () =>
  datastarPage(
    <SiteShell current="projects">
      <section class="flex max-w-2xl flex-col gap-7 py-8 sm:py-16">
        <p class="eyebrow">Projects / Error</p>
        <h1 class="display-heading">Project catalog unavailable</h1>
        <p class="max-w-xl text-lg leading-8 text-muted">
          The project catalog could not be loaded. Please try again after the site has been updated.
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
      title: "Projects unavailable — Mohil.dev",
      head: pageHead(),
    },
    { status: 500 },
  )

/** Build the Projects route around a source value that must satisfy the catalog schema. */
export const makeProjectsRoutes = (projectSource: unknown) => {
  const projectsPage = Effect.gen(function* () {
    yield* annotate({ page: { name: "projects" } })
    const projects = yield* parseProjectCatalog(projectSource)

    return datastarPage(<ProjectsPage projects={projects} />, {
      title: "Projects — Mohil.dev",
      head: pageHead({
        canonicalPath: "/projects",
        description: "Selected open-source projects by Mohil Garg.",
      }),
    })
  }).pipe(
    Effect.catchTag("InvalidProjectCatalogError", () =>
      Effect.gen(function* () {
        yield* annotate({ page: { name: "projects", catalog: "invalid" } })
        return unavailablePage()
      }),
    ),
    Effect.withSpan("projects.page"),
  )

  return HttpRouter.add("GET", "/projects", projectsPage)
}
