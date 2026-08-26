"use client";

import {
  Children,
  type CSSProperties,
  type ReactNode,
} from "react";

import {
  JOURNEY_SECTION_COUNT,
} from "./journey.config";

import { JourneyScene } from "./JourneyScene";

type JourneyTrackProps = {
  children: ReactNode;
  progress: number;
};

export function JourneyTrack({
  children,
  progress,
}: JourneyTrackProps) {
  const style = {
    minHeight: `${JOURNEY_SECTION_COUNT * 100}vh`,
  } satisfies CSSProperties;

  const scenes = Children.toArray(
    children,
  );

  return (
    <div
      data-journey-track
      className="relative w-full"
      style={style}
    >
      {scenes.map(
        (child, index) => (
          <JourneyScene
            key={
              `journey-scene-${index}`
            }
            index={index}
            progress={progress}
            sceneCount={
              JOURNEY_SECTION_COUNT
            }
          >
            {child}
          </JourneyScene>
        ),
      )}
    </div>
  );
}