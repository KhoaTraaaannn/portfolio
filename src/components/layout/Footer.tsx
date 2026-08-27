"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = useLocale();

  return (
    <footer
      className="
        border-t
        bg-background
      "
    >
      <Container
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-6
          py-10
          text-sm
          text-muted-foreground
          md:flex-row
        "
      >
        <p>
          © {currentYear} {siteConfig.name}.{" "}
          {content.footer.rights}
        </p>

        <nav
          aria-label="Footer navigation"
          className="
            flex
            items-center
            gap-6
          "
        >
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              transition-colors
              hover:text-foreground
            "
          >
            GitHub
          </Link>

          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              transition-colors
              hover:text-foreground
            "
          >
            LinkedIn
          </Link>

          <Link
            href={`mailto:${siteConfig.links.email}`}
            className="
              transition-colors
              hover:text-foreground
            "
          >
            Email
          </Link>
        </nav>
      </Container>
    </footer>
  );
}