"use client";

import {
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";

import { useTheme } from "@teispace/next-themes";

type ThemeMode = "auto" | "light" | "dark";

const STORAGE_KEY = "portfolio-theme-mode";

/* ----------------------------------------------------------------
 * TIME-BASED THEME
 *
 * 06:00 -> 17:59 = Light
 * 18:00 -> 05:59 = Dark
 *
 * Uses the user's local browser time.
 * ---------------------------------------------------------------- */

function getTimeTheme(): "light" | "dark" {
  const hour = new Date().getHours();

  return hour >= 6 && hour < 18 ? "light" : "dark";
}

/* ----------------------------------------------------------------
 * THEME MODE STORE
 * ---------------------------------------------------------------- */

function getMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "auto";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (
    stored === "auto" ||
    stored === "light" ||
    stored === "dark"
  ) {
    return stored;
  }

  return "auto";
}

function subscribeMode(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = () => callback();
  const handleModeChange = () => callback();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(
    "portfolio-theme-mode-change",
    handleModeChange,
  );

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(
      "portfolio-theme-mode-change",
      handleModeChange,
    );
  };
}

function getServerMode(): ThemeMode {
  return "auto";
}

/* ----------------------------------------------------------------
 * CLOCK STORE
 * ---------------------------------------------------------------- */

function subscribeClock(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  /*
   * Re-check the local time every 30 seconds.
   *
   * This allows Auto mode to switch automatically
   * when crossing 06:00 or 18:00 without a reload.
   */
  const interval = window.setInterval(callback, 30_000);

  return () => {
    window.clearInterval(interval);
  };
}

function getClockSnapshot(): "light" | "dark" {
  return getTimeTheme();
}

function getClockServerSnapshot(): "light" | "dark" {
  /*
   * Keep SSR deterministic.
   *
   * The server cannot reliably know the browser's local timezone,
   * so do not calculate the time-based theme during SSR.
   */
  return "light";
}

/* ----------------------------------------------------------------
 * COMPONENT
 * ---------------------------------------------------------------- */

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mode = useSyncExternalStore(
    subscribeMode,
    getMode,
    getServerMode,
  );

  const timeTheme = useSyncExternalStore(
    subscribeClock,
    getClockSnapshot,
    getClockServerSnapshot,
  );

  /* --------------------------------------------------------------
   * KEEP NEXT-THEMES IN SYNC WITH AUTO MODE
   *
   * This is important.
   *
   * Auto mode is controlled by local time, but next-themes
   * still controls the actual "dark" class on <html>.
   *
   * Without this effect, LoadingScene can be Light while
   * the actual portfolio is still Dark after loading finishes.
   * -------------------------------------------------------------- */

  useEffect(() => {
    if (mode !== "auto") {
      return;
    }

    if (resolvedTheme !== timeTheme) {
      setTheme(timeTheme);
    }
  }, [
    mode,
    timeTheme,
    resolvedTheme,
    setTheme,
  ]);

  /* --------------------------------------------------------------
   * SET THEME MODE
   * -------------------------------------------------------------- */

  const setMode = useCallback(
    (nextMode: ThemeMode) => {
      window.localStorage.setItem(
        STORAGE_KEY,
        nextMode,
      );

      window.dispatchEvent(
        new Event("portfolio-theme-mode-change"),
      );

      if (nextMode === "auto") {
        /*
         * Immediately apply the current local-time theme.
         *
         * Do not wait for the 30-second clock subscription.
         */
        setTheme(getTimeTheme());
      } else {
        /*
         * Manual mode ignores the clock.
         */
        setTheme(nextMode);
      }
    },
    [setTheme],
  );

  /* --------------------------------------------------------------
   * CYCLE:
   *
   * Auto -> Light -> Dark -> Auto
   * -------------------------------------------------------------- */

  const cycleTheme = useCallback(() => {
    switch (mode) {
      case "auto":
        setMode("light");
        break;

      case "light":
        setMode("dark");
        break;

      case "dark":
        setMode("auto");
        break;
    }
  }, [mode, setMode]);

  /* --------------------------------------------------------------
   * ACTIVE THEME
   *
   * Auto   -> local clock
   * Light  -> next-themes
   * Dark   -> next-themes
   * -------------------------------------------------------------- */

  const activeTheme =
    mode === "auto"
      ? timeTheme
      : resolvedTheme === "light"
        ? "light"
        : "dark";

  const isLight = activeTheme === "light";

  /* --------------------------------------------------------------
   * ICON
   * -------------------------------------------------------------- */

  const icon =
    mode === "auto"
      ? "◐"
      : isLight
        ? "☀"
        : "☾";

  /* --------------------------------------------------------------
   * ACCESSIBILITY
   * -------------------------------------------------------------- */

  const ariaLabel =
    mode === "auto"
      ? `Automatic theme — ${
          isLight ? "light" : "night"
        }`
      : mode === "light"
        ? "Manual light mode — switch to dark"
        : "Manual dark mode — switch to automatic";

  const title =
    mode === "auto"
      ? `Automatic · ${
          isLight ? "Light" : "Night"
        }`
      : mode === "light"
        ? "Manual · Light"
        : "Manual · Night";

  /* --------------------------------------------------------------
   * UI
   * -------------------------------------------------------------- */

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={ariaLabel}
      title={title}
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
        {icon}
      </span>
    </button>
  );
}