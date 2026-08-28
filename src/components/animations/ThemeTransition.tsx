"use client";

import {
  useSyncExternalStore,
} from "react";

import { useTheme } from "@teispace/next-themes";

import { LiquidTransition } from "./LiquidTransition";
import { LightTransition } from "./LightTransition";

type ThemeTransitionProps = {
  active: boolean;
  direction: 1 | -1;
  label: string;
  source: "wheel" | "navbar";
};



function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}


export function ThemeTransition({
  active,
  direction,
  label,
  source,
}: ThemeTransitionProps) {
  const { resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  
  if (!mounted) {
    return null;
  }

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