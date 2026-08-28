"use client";

import {
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";

import { useTheme } from "@teispace/next-themes";

type ThemeMode = "auto" | "light" | "dark";

const STORAGE_KEY = "portfolio-theme-mode";



function getTimeTheme(): "light" | "dark" {
  const hour = new Date().getHours();

  return hour >= 6 && hour < 18 ? "light" : "dark";
}


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



function subscribeClock(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  
  const interval = window.setInterval(callback, 30_000);

  return () => {
    window.clearInterval(interval);
  };
}

function getClockSnapshot(): "light" | "dark" {
  return getTimeTheme();
}

function getClockServerSnapshot(): "light" | "dark" {
  
  return "light";
}


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
        
        setTheme(getTimeTheme());
      } else {
      
        setTheme(nextMode);
      }
    },
    [setTheme],
  );

  

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

  

  const activeTheme =
    mode === "auto"
      ? timeTheme
      : resolvedTheme === "light"
        ? "light"
        : "dark";

  const isLight = activeTheme === "light";

  

  const icon =
    mode === "auto"
      ? "◐"
      : isLight
        ? "☀"
        : "☾";

  

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