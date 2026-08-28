"use client";

import { useTheme } from "@teispace/next-themes";

import { LiquidTransition } from "./LiquidTransition";
import { LightTransition } from "./LightTransition";

type ThemeTransitionProps = {
  active: boolean;
  direction: 1 | -1;
  label: string;
  source: "wheel" | "navbar";
};

export function ThemeTransition({
  active,
  direction,
  label,
  source,
}: ThemeTransitionProps) {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "light") {
    return (
      <LightTransition
        active={active}
        direction={direction}
        label={label}
        source={source}
      />
    );
  }

  return (
    <LiquidTransition
      active={active}
      direction={direction}
      label={label}
      source={source}
    />
  );
}