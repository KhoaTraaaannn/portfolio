"use client";

import { useLocale } from "@/hooks/useLocale";

export function HeroDescription() {
  const { content } = useLocale();

  return (
    <div className="space-y-3">
      <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
        {content.hero.description}
      </p>

      <p className="text-sm font-medium text-muted-foreground/70">
        {content.hero.hireMe}
      </p>
    </div>
  );
}