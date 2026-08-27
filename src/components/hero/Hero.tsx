"use client";

import type { CSSProperties } from "react";

import { HeroActions } from "@/components/hero/HeroActions";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroDescription } from "@/components/hero/HeroDescription";
import { HeroTitle } from "@/components/hero/HeroTitle";

export function Hero() {
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

    willChange: "transform, opacity, filter",

    backfaceVisibility: "hidden",

    WebkitBackfaceVisibility: "hidden",
  } as CSSProperties;

  return (
    <section
      id="hero"
      className="
        relative
        flex
        min-h-[calc(100vh-4rem)]
        w-full
        items-center
        overflow-hidden
      "
    >
      <HeroBackground />

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          justify-center
          px-6
          py-24
          md:px-8
          lg:px-12
        "
      >
        <div
          style={style}
          className="
            max-w-5xl
            space-y-8
          "
        >
          <HeroTitle />

          <HeroDescription />

          <HeroActions />
        </div>
      </div>
    </section>
  );
}