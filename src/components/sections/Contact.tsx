"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";

export function Contact() {
  const { content } = useLocale();

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {content.contact.label}
          </p>

          <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            {content.contact.title}
          </h2>

          <p className="mt-6 max-w-2xl text-muted-foreground">
            {content.contact.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`mailto:${siteConfig.links.email}`}
              className="
                rounded-lg
                bg-foreground
                px-6
                py-3
                text-sm
                font-medium
                text-background
                transition-opacity
                hover:opacity-90
              "
            >
              {content.contact.email}
            </Link>

            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                px-6
                py-3
                text-sm
                font-medium
                transition-colors
                hover:bg-accent
              "
            >
              {content.contact.linkedin}
            </Link>

            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                px-6
                py-3
                text-sm
                font-medium
                transition-colors
                hover:bg-accent
              "
            >
              {content.contact.github}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}