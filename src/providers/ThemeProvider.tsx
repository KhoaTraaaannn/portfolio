"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
} from "@teispace/next-themes";

export const THEME_MODE_STORAGE_KEY =
  "portfolio-theme-mode";

export const ACTIVE_THEME_STORAGE_KEY =
  "portfolio-active-theme";

export function ThemeProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey={ACTIVE_THEME_STORAGE_KEY}
    >
      {children}
    </NextThemesProvider>
  );
}