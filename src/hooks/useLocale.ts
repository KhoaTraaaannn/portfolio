"use client";

import {
  useCallback,
  useSyncExternalStore,
} from "react";

import {
  content,
  defaultLocale,
  type Locale,
} from "@/config/i18n";

const LOCALE_STORAGE_KEY =
  "portfolio:locale";

let currentLocale: Locale =
  defaultLocale;

const listeners = new Set<
  () => void
>();

function getLocale(): Locale {
  return currentLocale;
}

function getServerLocale(): Locale {
  return defaultLocale;
}

function subscribe(
  listener: () => void,
) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function setLocaleValue(
  locale: Locale,
) {
  currentLocale = locale;

  window.localStorage.setItem(
    LOCALE_STORAGE_KEY,
    locale,
  );

  listeners.forEach(
    (listener) => listener(),
  );
}

export function useLocale() {
  const locale =
    useSyncExternalStore(
      subscribe,
      getLocale,
      getServerLocale,
    );

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      setLocaleValue(nextLocale);
    },
    [],
  );

  return {
    locale,

    setLocale,

    content: content[locale],

    isVietnamese:
      locale === "vi",

    isEnglish:
      locale === "en",
  };
}