"use client";

import {
  type CSSProperties,
  type ReactNode,
  useMemo,
} from "react";

type JourneySceneProps = {
  children: ReactNode;

  /**
   * Zero-based scene index.
   *
   * Example:
   * 0 = Hero
   * 1 = About
   * 2 = Skills
   */
  index?: number;

  /**
   * Global journey progress.
   *
   * Expected range:
   * 0 → 1
   */
  progress?: number;

  /**
   * Total number of scenes.
   */
  sceneCount?: number;
};

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    Math.max(value, min),
    max,
  );
}

function smoothstep(value: number) {
  const t = clamp(value, 0, 1);

  return (
    t *
    t *
    (3 - 2 * t)
  );
}

export function JourneyScene({
  children,
  index = 0,
  progress = 0,
  sceneCount = 7,
}: JourneySceneProps) {
  const sceneProgress = useMemo(() => {
    if (sceneCount <= 1) {
      return 1;
    }

    const safeProgress = clamp(
      progress,
      0,
      1,
    );

    const sceneSize =
      1 / sceneCount;

    const sceneStart =
      index * sceneSize;

    return clamp(
      (safeProgress - sceneStart) /
        sceneSize,
      0,
      1,
    );
  }, [
    index,
    progress,
    sceneCount,
  ]);

  /*
   * Enter / exit progress.
   *
   * These intentionally overlap the scene's
   * local progress so transitions can begin
   * before the camera reaches the exact
   * beginning/end of a scene.
   */
  const enterProgress = useMemo(() => {
    return smoothstep(
      sceneProgress / 0.35,
    );
  }, [sceneProgress]);

  const exitProgress = useMemo(() => {
    return smoothstep(
      (sceneProgress - 0.65) /
        0.35,
    );
  }, [sceneProgress]);

  const isActive =
    sceneProgress > 0 &&
    sceneProgress < 1;

  /*
   * CSS custom properties become the contract
   * between JourneyScene and JourneyLayer.
   */
  const style = {
    "--journey-progress": sceneProgress,
    "--journey-enter": enterProgress,
    "--journey-exit": exitProgress,
    "--journey-index": index,
  } as CSSProperties;

  return (
    <section
      data-journey-scene
      data-scene-index={index}
      data-scene-active={isActive}
      className="
        relative
        flex
        min-h-[calc(100vh-4rem)]
        w-full
        shrink-0
        items-center
        justify-center
        overflow-hidden
      "
      style={style}
    >
      {children}
    </section>
  );
}