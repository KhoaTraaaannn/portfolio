"use client";

import { motion } from "motion/react";

import { useLocale } from "@/hooks/useLocale";

type LiquidTransitionProps = {
  active: boolean;
  direction: 1 | -1;
  label: string;
  source: "wheel" | "navbar";
};

export function LiquidTransition({
  active,
  direction,
  label,
  source,
}: LiquidTransitionProps) {
  const { content } = useLocale();

  const fromTop =
    source === "navbar" ||
    direction > 0;

  const enterY =
    fromTop ? "-105%" : "105%";

  const exitY =
    fromTop ? "105%" : "-105%";

  return (
    <motion.div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-[9990]
        overflow-hidden
      "
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: active ? 1 : 0,
      }}
      transition={{
        duration: 0.1,
      }}
    >
      <motion.div
        className="
          absolute
          inset-0
        "
        initial={{
          y: enterY,
        }}
        animate={{
          y: active
            ? "0%"
            : exitY,
        }}
        transition={{
          duration: active
            ? 0.65
            : 0.55,
          ease: [
            0.76,
            0,
            0.24,
            1,
          ],
        }}
      >
        <div
          className="
            absolute
            inset-0
            bg-black
          "
        />

        <LiquidEdge
          fromTop={fromTop}
        />

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.96,
            }}
            animate={{
              opacity: active ? 1 : 0,
              y: active ? 0 : 24,
              scale: active ? 1 : 0.96,
            }}
            transition={{
              delay: active
                ? 0.25
                : 0,
              duration: 0.4,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="text-center"
          >
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.4em]
                text-white/35
              "
            >
              {content.transition.entering}
            </p>

            <h2
              className="
                mt-3
                text-5xl
                font-semibold
                tracking-[-0.04em]
                text-white
                md:text-7xl
                lg:text-8xl
              "
            >
              {label}
            </h2>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LiquidEdge({
  fromTop,
}: {
  fromTop: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`
        absolute
        left-0
        w-full
        ${
          fromTop
            ? "top-0"
            : "bottom-0 rotate-180"
        }
      `}
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
    >
      <defs>
        <filter
          id="liquid-edge"
          x="-10%"
          y="-40%"
          width="120%"
          height="180%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.035"
            numOctaves="4"
            seed="17"
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="48"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <path
        filter="url(#liquid-edge)"
        fill="black"
        d="
          M0 92

          C90 45
          155 118
          255 76

          C355 34
          425 112
          530 70

          C635 26
          705 108
          810 64

          C915 22
          990 112
          1090 68

          C1190 28
          1280 104
          1440 52

          L1440 180
          L0 180
          Z
        "
      />

      <path
        d="
          M0 92

          C90 45
          155 118
          255 76

          C355 34
          425 112
          530 70

          C635 26
          705 108
          810 64

          C915 22
          990 112
          1090 68

          C1190 28
          1280 104
          1440 52
        "
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}