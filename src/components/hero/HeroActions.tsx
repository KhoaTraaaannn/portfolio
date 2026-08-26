import Link from "next/link";

import { siteConfig } from "@/config/site";

export function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        href="#projects"
        className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        View Projects
      </Link>

      <Link
        href={siteConfig.links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
      >
        LinkedIn
      </Link>
    </div>
  );
}