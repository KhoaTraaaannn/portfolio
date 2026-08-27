"use client";

import {
  type CSSProperties,
  type ReactNode,
} from "react";

type JourneyLayerProps = {
  children: ReactNode;
  depth?: number;
  parallax?: number;  
  scale?: number;
  opacity?: number;
  blur?: number;
  rotate?: number;
  className?: string;
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