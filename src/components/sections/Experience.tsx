import { Container } from "@/components/layout/Container";

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Experience
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Where I&apos;ve worked.
          </h2>
        </div>

        <article className="grid gap-8 border-t pt-8 md:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Jun 2025 — Aug 2025
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Ho Chi Minh City
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Software Developer Intern
            </h3>

            <p className="mt-1 text-muted-foreground">
              SHPT Software Joint Stock Company
            </p>

            <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
              Contributed to the development of a Human Resource Management
              (HRM) online portal as a full-stack developer, working across
              the frontend, backend, and database layers.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "React.js",
                "ASP.NET",
                "Microsoft SQL Server",
                "Git",
              ].map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}