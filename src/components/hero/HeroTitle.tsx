"use client";

import {
  type CSSProperties,
} from "react";

import { siteConfig } from "@/config/site";

export function HeroTitle() {
  const style = {
    transform: `
      translate3d(
        0,
        calc(
          (
            1 -
            var(--journey-enter)
          ) *
          50px
          -
          var(--journey-exit) *
          70px
        ),
        0
      )
      scale(
        calc(
          0.96 +
          (
            var(--journey-enter) *
            0.04
          ) +
          (
            var(--journey-exit) *
            0.03
          )
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
            (
              1 -
              var(--journey-enter)
            ) *
            10px
          ) +
          (
            var(--journey-exit) *
            8px
          )
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
    <h1
      id="hero-title"
      data-journey-hero-title
      className="
        text-balance
        text-5xl
        font-bold
        tracking-tight
        sm:text-6xl
        md:text-7xl
        lg:text-8xl
      "
      style={style}
    >
      Hi, I&apos;m{" "}
      <span className="text-muted-foreground">
        {siteConfig.name}
      </span>
      .
      <br />
      I build Software for breads.
    </h1>
  );
}