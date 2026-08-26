import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>

          <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Please Hired me, i need food and money to pay for my bread.
          </h2>

          <p className="mt-6 max-w-2xl text-muted-foreground">
            I&apos;m currently looking for new opportunities. If you have a
            project or role that you think I would be a good fit for, please don&apos;t
            hesitate to reach out. I&apos;d love to hear from you!
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`mailto:${siteConfig.links.email}`}
              className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>

            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              LinkedIn
            </Link>

            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              GitHub
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}