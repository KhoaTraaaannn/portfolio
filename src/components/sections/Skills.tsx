"use client";

import { Container } from "@/components/layout/Container";
import { useLocale } from "@/hooks/useLocale";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "ASP.NET Core",
  "PostgreSQL",
  "Docker",
  "Figma",
] as const;

export function Skills() {
  const { content } = useLocale();

  return (
    <section
      id="skills"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {content.skills.label}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {content.skills.title}
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="
                rounded-full
                border
                px-4
                py-2
                text-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-foreground/30
              "
            >
              {skill}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}