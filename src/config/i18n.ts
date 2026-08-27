import { en } from "@/content/en";
import { vi } from "@/content/vi";

export const locales = ["vi", "en"] as const;

export type Locale =
  (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export const content = {
  vi,
  en,
} as const;