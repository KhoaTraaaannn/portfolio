"use client";

import { Container } from "@/components/layout/Container";
import { useLocale } from "@/hooks/useLocale";

export function About() {
  const { content } = useLocale();

  return (
    <section
      id="about"
      className="
        py-24
        md:py-32
      "
    >
      <Container>
        <div
          className="
            mx-auto
            flex
            max-w-4xl
            flex-col
            items-center
            text-center
          "
        >
          <p
            className="
              mb-4
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
          >
            {content.about.label}
          </p>

          <h2
            className="
              max-w-3xl
              text-4xl
              font-bold
              tracking-tight
              md:text-5xl
              lg:text-6xl
          "
          >
            {content.about.title}
          </h2>

          <p
            className="
              mt-8
              max-w-3xl
              text-lg
              leading-8
              text-muted-foreground
              md:text-xl
              md:leading-9
            "
          >
            {content.about.description}
          </p>
        </div>
      </Container>
    </section>
  );
}