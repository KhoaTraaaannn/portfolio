"use client";

import { Container } from "@/components/layout/Container";
import { useLocale } from "@/hooks/useLocale";

const timeline = [
  {
    year: "2022",
    key: "startedComputerScience",
  },
  {
    year: "2025",
    key: "softwareDeveloperIntern",
  },
  {
    year: "2025",
    key: "publishedAiFridgeResearch",
  },
] as const;

export function Timeline() {
  const { content } = useLocale();

  return (
    <section
      id="timeline"
      className="py-24"
    >
      <Container>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {content.timeline.label}
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          {content.timeline.title}
        </h2>

        <div className="mt-8 space-y-6">
          {timeline.map((item) => {
            const entry =
              content.timeline.items[item.key];

            return (
              <div
                key={`${item.year}-${item.key}`}
                className="border-l-2 pl-6"
              >
                <p className="text-sm text-muted-foreground">
                  {item.year}
                </p>

                <h3 className="text-xl font-semibold">
                  {entry.title}
                </h3>

                <p className="text-muted-foreground">
                  {entry.company}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}