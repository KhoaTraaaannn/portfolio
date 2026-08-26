"use client";

import {
  useEffect,
  type CSSProperties,
} from "react";

export function Hero() {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("portfolio:navigate", {
          detail: "about",
        }),
      );
    }, 20000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  const style = {
    transform: `
      translate3d(
        0,
        calc(
          (
            1 -
            var(--journey-enter)
          ) *
          12vh
          -
          var(--journey-exit) *
          18vh
        ),
        0
      )
      scale(
        calc(
          0.94 +
          var(--journey-enter) *
          0.06 +
          var(--journey-exit) *
          0.04
        )
      )
    `,
    opacity: `
      calc(
        var(--journey-enter) *
        (
          1 -
          var(--journey-exit)
        )
      )
    `,
    filter: `
      blur(
        calc(
          (
            1 -
            var(--journey-enter)
          ) *
          14px
          +
          var(--journey-exit) *
          10px
        )
      )
    `,
    willChange:
      "transform, opacity, filter",
    backfaceVisibility:
      "hidden",
    WebkitBackfaceVisibility:
      "hidden",
  } as CSSProperties;

  return (
    <div
      className="
        flex
        min-h-[calc(100vh-4rem)]
        w-full
        items-center
        justify-center
        overflow-hidden
      "
    >
      <h1
        data-journey-welcome
        aria-label="Welcome"
        style={style}
        className="
          select-none
          whitespace-nowrap
          text-center
          text-[clamp(4rem,9vw,9rem)]
          font-black
          leading-none
          tracking-[-0.06em]
          text-foreground
        "
      >
        WELCOME!
      </h1>
    </div>
  );
}