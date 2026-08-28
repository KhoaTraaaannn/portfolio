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

/* ----------------------------------------------------------------
 * HYDRATION GATE
 *
 * Server:
 *   false
 *
 * First client render:
 *   false
 *
 * After hydration:
 *   true
 *
 * This guarantees that the transition tree is identical during
 * SSR hydration, regardless of the current theme.
 * ---------------------------------------------------------------- */

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/* ----------------------------------------------------------------
 * COMPONENT
 * ---------------------------------------------------------------- */

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

  /*
   * IMPORTANT:
   *
   * Do not render either transition during SSR hydration.
   *
   * The actual theme is allowed to decide which transition
   * gets mounted only after React has hydrated on the client.
   */
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