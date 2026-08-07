import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
        <p>
          © {currentYear} {siteConfig.name}. All rights reserved.
        </p>

        <nav className="flex items-center gap-6">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>

          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>

          <Link href={`mailto:${siteConfig.links.email}`}>
            Email
          </Link>
        </nav>
      </Container>
    </footer>
  );
}