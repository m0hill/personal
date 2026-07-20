import { SiteShell } from "@/ui/site-shell"

export const HomePage = () => (
  <SiteShell current="home">
    <div class="editorial-grid items-end">
      <section class="col-span-full flex max-w-4xl flex-col gap-8 lg:col-span-10">
        <p class="eyebrow">Software engineer</p>
        <h1 class="display-heading text-balance">
          I build cloud systems, developer tools, and realtime web experiences.
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
          I&apos;m <span class="text-foreground">Mohil Garg</span>. I care about software that makes
          complex systems feel direct, useful, and human.
        </p>
        <div class="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs">
          <a
            href="/about"
            class="text-link"
            data-nav-prefetch
          >
            More about me <span aria-hidden="true">→</span>
          </a>
          <a
            href="https://github.com/m0hill"
            class="text-link"
            rel="me"
          >
            View GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <p class="col-span-full mt-12 max-w-sm border-t border-border pt-4 font-mono text-xs leading-5 text-muted lg:col-span-2 lg:mt-0">
        Portfolio, field notes, and one large collaborative web experiment.
      </p>
    </div>
  </SiteShell>
)
