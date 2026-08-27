"use client";

import { Container } from "@/components/layout/Container";
import { useLocale } from "@/hooks/useLocale";

const technologies = [
  "React.js",
  "ASP.NET",
  "Microsoft SQL Server",
  "Git",
];

export function Experience() {
  const { content } = useLocale();

  return (
    <section
      id="experience"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {content.experience.label}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {content.experience.title}
          </h2>
        </div>

        <article className="grid gap-8 border-t pt-8 md:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
            {content.experience.date}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
            {content.experience.location}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {content.experience.role}
            </h3>

            <p className="mt-1 text-muted-foreground">
              {content.experience.company}
            </p>

            <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
              {content.experience.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {technologies.map(
                (technology) => (
                  <span
                    key={technology}
                    className="
                      rounded-full
                      border
                      px-3
                      py-1
                      text-sm
                      text-muted-foreground
                    "
                  >
                    {technology}
                  </span>
                ),
              )}
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}