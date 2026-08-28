"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
} from "@teispace/next-themes";

export function ThemeProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}