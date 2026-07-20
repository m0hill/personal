import { SITE_TITLE } from "@/lib/constants"

export const HomePage = () => (
  <main
    id="app"
    class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 p-4 sm:p-8"
  >
    <p class="text-sm font-medium text-muted">Personal site</p>
    <h1 class="text-3xl font-bold sm:text-4xl">{SITE_TITLE}</h1>
    <p class="max-w-xl text-muted">
      Portfolio and writing are taking shape. Projects, essays, and a collaborative experiment are
      coming next.
    </p>
  </main>
)
