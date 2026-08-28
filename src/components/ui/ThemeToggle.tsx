"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@teispace/next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(isLight ? "dark" : "light")
      }
      aria-label={
        isLight
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      className="
        inline-flex
        h-9
        w-9
        items-center
        justify-center
        rounded-md
        border
        border-border
        text-sm
        transition-colors
        hover:bg-accent
      "
    >
      <span aria-hidden="true">
        {isLight ? "☀" : "☾"}
      </span>
    </button>
  );
}