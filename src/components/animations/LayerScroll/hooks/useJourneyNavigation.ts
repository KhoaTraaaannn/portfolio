"use client";

import { useMemo } from "react";

type JourneyNavigationOptions = {
  offset: number;
  viewportHeight: number;
  sectionCount?: number;
};

export function useJourneyNavigation({
  offset,
  viewportHeight,
  sectionCount = 7,
}: JourneyNavigationOptions) {
  const activeIndex = useMemo(() => {
    if (viewportHeight <= 0) {
      return 0;
    }

    const absoluteY = Math.max(0, -offset);
    const rawIndex = absoluteY / viewportHeight;

    return Math.min(
      sectionCount - 1,
      Math.max(0, Math.round(rawIndex)),
    );
  }, [
    offset,
    viewportHeight,
    sectionCount,
  ]);

  const navigationProgress = useMemo(() => {
    if (
      viewportHeight <= 0 ||
      sectionCount <= 1
    ) {
      return 0;
    }

    const absoluteY = Math.max(0, -offset);

    const maxY =
      (sectionCount - 1) *
      viewportHeight;

    return Math.min(
      1,
      Math.max(0, absoluteY / maxY),
    );
  }, [
    offset,
    viewportHeight,
    sectionCount,
  ]);

  return {
    activeIndex,
    navigationProgress,
  };
}