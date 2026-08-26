"use client";

import {
  type CSSProperties,
  type ReactNode,
} from "react";

type JourneyLayerProps = {
  children: ReactNode;

  /**
   * Visual depth of the layer.
   *
   * Higher values move more aggressively
   * with the scene camera.
   *
   * Suggested:
   * 0 = background
   * 1 = atmosphere
   * 2 = visual
   * 3 = content
   * 4 = foreground
   */
  depth?: number;

  /**
   * Parallax multiplier.
   *
   * 0 = no movement
   * 1 = normal movement
   * >1 = foreground / aggressive movement
   */
  parallax?: number;

  /**
   * Maximum scale variation.
   *
   * Example:
   * 0.08 = up to 8% scale variation.
   */
  scale?: number;

  /**
   * Maximum opacity variation.
   *
   * 0 = always fully visible
   * 1 = fully fades during enter/exit
   */
  opacity?: number;

  /**
   * Maximum blur in pixels.
   */
  blur?: number;

  /**
   * Maximum rotation in degrees.
   */
  rotate?: number;

  /**
   * Additional classes.
   */
  className?: string;

  /**
   * Whether the layer should fill
   * the entire scene.
   *
   * Default: true.
   */
  fill?: boolean;
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

export function JourneyLayer({
  children,
  depth = 0,
  parallax = 0,
  scale = 0,
  opacity = 0,
  blur = 0,
  rotate = 0,
  className = "",
  fill = true,
}: JourneyLayerProps) {
  const safeDepth = Math.max(
    0,
    depth,
  );

  const safeParallax = clamp(
    parallax,
    -2,
    2,
  );

  const safeScale = clamp(
    scale,
    0,
    0.5,
  );

  const safeOpacity = clamp(
    opacity,
    0,
    1,
  );

  const safeBlur = clamp(
    blur,
    0,
    40,
  );

  const safeRotate = clamp(
    rotate,
    -30,
    30,
  );

  /*
   * JourneyScene provides:
   *
   * --journey-progress
   * --journey-enter
   * --journey-exit
   * --journey-index
   *
   * JourneyLayer consumes those values without
   * creating another scroll listener or animation loop.
   */

  const style = {
    "--journey-layer-depth":
      safeDepth,

    "--journey-layer-parallax":
      safeParallax,

    "--journey-layer-scale":
      safeScale,

    "--journey-layer-opacity":
      safeOpacity,

    "--journey-layer-blur":
      `${safeBlur}px`,

    "--journey-layer-rotate":
      `${safeRotate}deg`,

    /*
     * PARALLAX
     *
     * The layer moves relative to the scene's
     * local progress.
     *
     * progress = 0
     *     → entering
     *
     * progress = 0.5
     *     → centered
     *
     * progress = 1
     *     → leaving
     */
    transform: `
      translate3d(
        0,
        calc(
          (
            0.5 -
            var(--journey-progress)
          ) *
          var(--journey-layer-parallax) *
          18vh
        ),
        0
      )

      scale(
        calc(
          1 +
          (
            (
              1 -
              var(--journey-enter)
            ) +
            var(--journey-exit)
          ) *
          var(--journey-layer-scale)
        )
      )

      rotate(
        calc(
          (
            var(--journey-progress) -
            0.5
          ) *
          2 *
          var(--journey-layer-rotate)
        )
      )
    `,

    /*
     * OPACITY
     *
     * opacity = 0
     *     → layer stays fully visible
     *
     * opacity > 0
     *     → layer fades in and out.
     *
     * The `max()` prevents the computed opacity
     * from becoming negative.
     */
    opacity:
      safeOpacity > 0
        ? `max(
            0,
            calc(
              1 -
              (
                (
                  1 -
                  var(--journey-enter)
                ) +
                var(--journey-exit)
              ) *
              var(--journey-layer-opacity)
            )
          )`
        : 1,

    /*
     * BLUR
     *
     * Blur increases while the layer is
     * entering or leaving and becomes sharp
     * around the center of the scene.
     */
    filter:
      safeBlur > 0
        ? `
          blur(
            calc(
              (
                (
                  1 -
                  var(--journey-enter)
                ) +
                var(--journey-exit)
              ) *
              var(--journey-layer-blur)
            )
          )
        `
        : "none",

    /*
     * GPU-friendly animation properties.
     */
    willChange:
      "transform, opacity, filter",

    backfaceVisibility:
      "hidden",

    WebkitBackfaceVisibility:
      "hidden",
  } as CSSProperties;

  return (
    <div
      data-journey-layer
      data-journey-depth={
        safeDepth
      }
      className={`
        relative
        ${fill ? "absolute inset-0" : ""}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
}