import type { ProjectRecord } from "@/pages/projects/catalog"
import { SiteShell } from "@/ui/site-shell"

const ProjectEntry = ({
  project,
  position,
}: {
  readonly project: ProjectRecord
  readonly position: number
}) => (
  <article
    class="flex h-full flex-col gap-6 border-t border-border py-8 sm:py-10"
    aria-labelledby={`project-${project.slug}`}
  >
    <header class="flex items-baseline justify-between gap-4">
      <h2
        id={`project-${project.slug}`}
        class="font-serif text-3xl tracking-tight sm:text-4xl"
      >
        {project.name}
      </h2>
      <span
        class="font-mono text-xs text-muted"
        aria-hidden="true"
      >
        {String(position).padStart(2, "0")}
      </span>
    </header>

    <p class="max-w-xl flex-1 text-base leading-7 text-muted sm:text-lg sm:leading-8">
      {project.summary}
    </p>

    <dl class="grid gap-5 font-mono text-xs">
      <div class="grid gap-2 sm:grid-cols-[7rem_1fr] sm:items-start">
        <dt class="text-muted">Status</dt>
        <dd>{project.status}</dd>
      </div>
      <div class="grid gap-2 sm:grid-cols-[7rem_1fr] sm:items-start">
        <dt class="text-muted">Technologies</dt>
        <dd>
          <ul class="flex flex-wrap gap-x-4 gap-y-2">
            {project.technologies.map((technology) => (
              <li>{technology}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>

    <a
      href={project.repository}
      class="text-link w-fit font-mono text-xs"
    >
      View repository <span aria-hidden="true">↗</span>
    </a>
  </article>
)

/** Render the Projects index within the shared site shell. */
export const ProjectsPage = ({ projects }: { readonly projects: ReadonlyArray<ProjectRecord> }) => (
  <SiteShell current="projects">
    <header class="editorial-grid">
      <div class="col-span-full flex max-w-4xl flex-col gap-7 lg:col-span-9">
        <p class="eyebrow">Selected work</p>
        <h1 class="display-heading">Projects</h1>
        <p class="max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
          Open-source tools and experiments across server-driven interfaces, developer workflows,
          and the Cloudflare platform.
        </p>
      </div>
    </header>

    <ol class="mt-16 grid gap-x-12 sm:mt-24 lg:grid-cols-2">
      {projects.map((project, index) => (
        <li>
          <ProjectEntry
            project={project}
            position={index + 1}
          />
        </li>
      ))}
    </ol>
  </SiteShell>
)
