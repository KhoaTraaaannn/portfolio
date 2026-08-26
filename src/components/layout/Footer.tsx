import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        border-t
        border-white/10
        bg-white/[0.02]
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
          © {currentYear} {siteConfig.name}. All rights reserved.
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