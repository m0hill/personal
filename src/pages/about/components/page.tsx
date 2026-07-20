import { SiteShell } from "@/ui/site-shell"

export const AboutPage = () => (
  <SiteShell current="about">
    <article class="editorial-grid">
      <header class="col-span-full flex max-w-3xl flex-col gap-7 lg:col-span-8 lg:col-start-3">
        <p class="eyebrow">Tokyo, Japan</p>
        <h1 class="display-heading">About</h1>
        <p class="font-serif text-2xl leading-snug text-balance sm:text-3xl">
          I&apos;m Mohil Garg, a software engineer interested in the point where dependable systems
          meet thoughtful interfaces.
        </p>
      </header>

      <div class="col-span-full mt-16 flex max-w-3xl flex-col gap-14 lg:col-span-8 lg:col-start-3 lg:mt-24">
        <section
          class="about-section"
          aria-labelledby="about-work"
        >
          <h2 id="about-work">Work</h2>
          <div class="prose-copy">
            <p>
              My work has moved between full-stack product engineering, cloud infrastructure, and
              technical leadership. At MONOLISIX, I worked on application architecture, delivery
              pipelines, and the tooling around a growing web platform.
            </p>
            <p>
              At SIND, I led engineering work across cloud services and realtime audio systems,
              including infrastructure for machine-learning workloads and the everyday practices
              that help a team ship with confidence.
            </p>
            <p>
              Open source is where I explore the same concerns in public: simpler developer tools,
              server-driven web applications, and software with a small operational footprint.
            </p>
          </div>
        </section>

        <section
          class="about-section"
          aria-labelledby="about-education"
        >
          <h2 id="about-education">Education</h2>
          <div class="prose-copy">
            <p>
              I studied Electrical and Information Engineering at Kumamoto University. Before that,
              I studied Japanese at Tokyo University of Foreign Studies after coming to Japan as a
              MEXT scholar in 2019.
            </p>
          </div>
        </section>

        <section
          class="about-section"
          aria-labelledby="about-now"
        >
          <h2 id="about-now">What I value</h2>
          <div class="prose-copy">
            <p>
              I like technology that earns its complexity. That usually means clear boundaries,
              strong defaults, useful feedback, and an experience that does not expose the machinery
              behind it unless you want to look closer.
            </p>
          </div>
        </section>
      </div>
    </article>
  </SiteShell>
)
