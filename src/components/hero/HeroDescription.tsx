import { siteConfig } from "@/config/site";

export function HeroDescription() {
  return (
    <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
      {siteConfig.description}
    </p>
  );
}