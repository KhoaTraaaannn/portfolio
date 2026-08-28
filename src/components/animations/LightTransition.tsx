"use client";

import { motion } from "motion/react";

import { useLocale } from "@/hooks/useLocale";

type LightTransitionProps = {
  active: boolean;
  direction: 1 | -1;
  label: string;
  source: "wheel" | "navbar";
};

export function LightTransition({
  active,
  direction,
  label,
  source,
}: LightTransitionProps) {
  const { content } = useLocale();

  const fromTop = source === "navbar" || direction > 0;

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
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="
          absolute
          inset-0
        "
        initial={{
          x: fromTop ? "-115%" : "115%",
          y: fromTop ? "-115%" : "115%",
        }}
        animate={{
          x: active
            ? "0%"
            : fromTop
              ? "115%"
              : "-115%",
          y: active
            ? "0%"
            : fromTop
              ? "115%"
              : "-115%",
        }}
        transition={{
          duration: active ? 0.7 : 0.55,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <div
          className="
            absolute
            -inset-[20%]
            bg-white
          "
        />

        <LightLiquidEdge fromTop={fromTop} />

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
              delay: active ? 0.2 : 0,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center"
          >
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.4em]
                text-black/40
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
                text-black
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

function LightLiquidEdge({
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
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
    >
      <defs>
        <filter
          id="light-liquid-edge"
          x="-10%"
          y="-40%"
          width="120%"
          height="180%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.028"
            numOctaves="4"
            seed="23"
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="55"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <path
        filter="url(#light-liquid-edge)"
        fill="white"
        d="
          M0 115

          C100 55
          180 145
          290 90

          C400 35
          485 145
          600 82

          C720 20
          805 140
          925 76

          C1045 18
          1130 145
          1240 82

          C1330 35
          1380 95
          1440 58

          L1440 220
          L0 220
          Z
        "
      />

      <path
        filter="url(#light-liquid-edge)"
        d="
          M0 115

          C100 55
          180 145
          290 90

          C400 35
          485 145
          600 82

          C720 20
          805 140
          925 76

          C1045 18
          1130 145
          1240 82

          C1330 35
          1380 95
          1440 58
        "
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}