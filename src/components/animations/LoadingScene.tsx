"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LOADING_DURATION = 4000;

export function LoadingScene() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let frameId = 0;
    let completeTimeout = 0;

    const update = (now: number) => {
      const elapsed = now - startedAt;

      const nextProgress = Math.min(
        elapsed / LOADING_DURATION,
        1,
      );

      setProgress(nextProgress);

      if (nextProgress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        completeTimeout = window.setTimeout(() => {
          setComplete(true);

          window.setTimeout(() => {
            window.dispatchEvent(
              new CustomEvent("portfolio:navigate", {
                detail: "about",
              }),
            );
          }, 700);
        }, 500);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(completeTimeout);
    };
  }, []);

  const percentage = Math.round(progress * 100);

  return (
    <motion.div
      aria-label="Loading portfolio"
      aria-live="polite"
      className={`
        fixed
        inset-0
        z-[9999]
        overflow-hidden
        bg-[#020304]
        text-white
        ${complete ? "pointer-events-none" : "pointer-events-auto"}
      `}
      initial={{ opacity: 1 }}
      animate={{
        opacity: complete ? 0 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Large grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.11]
            [background-image:linear-gradient(rgba(90,220,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(90,220,255,0.07)_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />

        {/* Small grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.07]
            [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
            [background-size:18px_18px]
          "
        />

        {/* Scanlines */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.6)_4px)]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.48)_100%)]
          "
        />
      </div>

      {/* =====================================================
          OUTER FRAME
          ===================================================== */}

      <div className="pointer-events-none absolute inset-7 border border-white/[0.07] md:inset-8">
        {/* Top left */}
        <div className="absolute -left-px -top-px h-10 w-10 border-l border-t border-cyan-300/60" />

        {/* Top right */}
        <div className="absolute -right-px -top-px h-10 w-10 border-r border-t border-cyan-300/60" />

        {/* Bottom left */}
        <div className="absolute -bottom-px -left-px h-10 w-10 border-b border-l border-cyan-300/60" />

        {/* Bottom right */}
        <div className="absolute -bottom-px -right-px h-10 w-10 border-b border-r border-cyan-300/60" />
      </div>

      {/* =====================================================
          TOP HUD
          ===================================================== */}

      <div className="absolute left-14 right-14 top-14 flex items-start justify-between md:left-14 md:right-14">
        <div className="space-y-2">
          <p className="font-mono text-[10px] tracking-[0.35em] text-cyan-200/60">
            PORTFOLIO.OS
          </p>

          <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-200/50">
            v1.0.0
          </p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-200/55">
            SYSTEM INITIALIZATION
          </p>

          <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-cyan-200/45">
            PLEASE WAIT
          </p>
        </div>
      </div>

      {/* =====================================================
          LOADING STATUS
          ===================================================== */}

      <div className="absolute left-1/2 top-[12%] -translate-x-1/2">
        <div className="flex items-center gap-4">
          <motion.span
            className="
              h-2
              w-2
              rounded-full
              bg-cyan-300
              shadow-[0_0_14px_rgba(103,232,249,0.9)]
            "
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <span className="font-mono text-[11px] tracking-[0.42em] text-white/45">
            LOADING...
          </span>
        </div>
      </div>

      {/* =====================================================
          MAIN SCENE
          ===================================================== */}

      <div className="absolute inset-x-0 top-[23%] px-6 md:top-[25%] md:px-12">
        <div className="mx-auto w-full max-w-[1200px]">

          {/* Scene */}
          <div className="relative h-[270px] md:h-[310px]">

            {/* Atmospheric glow behind fire */}
            <motion.div
              className="
                absolute
                left-[55%]
                top-[48%]
                h-32
                w-32
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-orange-400/[0.07]
                blur-3xl
              "
              animate={{
                scale: [0.85, 1.15, 0.9],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* =================================================
                GROUND
                ================================================= */}

            <div
              className="
                absolute
                bottom-5
                left-0
                right-0
                h-px
                bg-white/[0.12]
              "
            />

            <div
              className="
                absolute
                bottom-[19px]
                left-[8%]
                right-[8%]
                h-px
                bg-gradient-to-r
                from-transparent
                via-orange-300/20
                to-transparent
              "
            />

            {/* Tiny ground marks */}

            <div className="absolute bottom-4 left-[13%] h-1 w-10 border-t border-white/10" />
            <div className="absolute bottom-4 left-[28%] h-1 w-6 border-t border-white/10" />
            <div className="absolute bottom-4 right-[27%] h-1 w-12 border-t border-white/10" />
            <div className="absolute bottom-4 right-[12%] h-1 w-7 border-t border-white/10" />

            {/* =================================================
                STICKMAN
                Sitting + hugging knees
                ================================================= */}

            <motion.div
              className="
                absolute
                bottom-6
                left-[43%]
                -translate-x-1/2
              "
              animate={{
                y: [0, -1, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="150"
                height="170"
                viewBox="0 0 150 170"
                fill="none"
                aria-hidden="true"
              >
                {/* Head */}
                <circle
                  cx="60"
                  cy="32"
                  r="17"
                  stroke="white"
                  strokeWidth="3"
                />

                {/* Slightly tired eyes */}
                <circle
                  cx="54"
                  cy="30"
                  r="1.5"
                  fill="white"
                />

                <circle
                  cx="66"
                  cy="30"
                  r="1.5"
                  fill="white"
                />

                {/* Tiny tired mouth */}
                <path
                  d="M56 38 Q60 35 64 38"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Body */}
                <path
                  d="M59 49 L65 82"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Left arm wrapping knee */}
                <motion.path
                  d="
                    M57 54
                    L43 67
                    L48 84
                    L67 92
                  "
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Right arm wrapping knee */}
                <motion.path
                  d="
                    M61 55
                    L75 67
                    L82 82
                    L68 91
                  "
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{
                    rotate: [1, -1, 1],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />

                {/* Left bent leg */}
                <path
                  d="
                    M65 82
                    L43 102
                    L29 105
                  "
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Left foot */}
                <path
                  d="M29 105 L18 105"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Right bent leg / knee */}
                <path
                  d="
                    M65 82
                    L88 99
                    L103 99
                  "
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Right foot */}
                <path
                  d="M103 99 L113 99"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Cold breath */}
                <motion.path
                  d="M80 55 Q89 50 84 42"
                  stroke="#67e8f9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.35"
                  animate={{
                    opacity: [0.1, 0.45, 0.1],
                    y: [2, -5, 2],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>

            {/* =================================================
                CAMPFIRE
                ================================================= */}

            <div
              className="
                absolute
                bottom-5
                left-[57%]
                -translate-x-1/2
              "
            >
              {/* Fire glow */}
              <motion.div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-28
                  w-28
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-orange-500/20
                  blur-2xl
                "
                animate={{
                  scale: [0.8, 1.2, 0.9],
                  opacity: [0.3, 0.65, 0.3],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Sparks */}
              {[...Array(12)].map((_, index) => (
                <motion.span
                  key={index}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-1
                    w-1
                    rounded-full
                    bg-orange-300
                  "
                  style={{
                    marginLeft: `${(index % 4) * 8 - 12}px`,
                    marginTop: `${-(index + 2) * 7}px`,
                  }}
                  animate={{
                    y: [-2, -25 - (index % 3) * 12],
                    x: [
                      0,
                      ((index % 2 === 0 ? 1 : -1) *
                        (5 + (index % 4) * 5)),
                    ],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.2],
                  }}
                  transition={{
                    duration: 1.5 + (index % 4) * 0.25,
                    repeat: Infinity,
                    delay: index * 0.16,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Fire */}
              <motion.div
                className="relative h-20 w-24"
                animate={{
                  scaleX: [1, 0.96, 1.04, 1],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Outer flame */}
                <motion.div
                  className="
                    absolute
                    bottom-2
                    left-1/2
                    h-14
                    w-10
                    -translate-x-1/2
                    rotate-45
                    rounded-[70%_30%_70%_30%]
                    bg-orange-500
                    shadow-[0_0_25px_rgba(249,115,22,0.6)]
                  "
                  animate={{
                    scale: [0.9, 1.08, 0.92],
                    rotate: [43, 47, 43],
                  }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Inner flame */}
                <motion.div
                  className="
                    absolute
                    bottom-2
                    left-1/2
                    h-9
                    w-6
                    -translate-x-1/2
                    rotate-45
                    rounded-[70%_30%_70%_30%]
                    bg-yellow-300
                  "
                  animate={{
                    scale: [0.85, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Logs */}
              <div className="absolute bottom-0 left-1/2 h-3 w-16 -translate-x-1/2 rotate-12 rounded-full bg-orange-900/80" />
              <div className="absolute bottom-0 left-1/2 h-3 w-16 -translate-x-1/2 -rotate-12 rounded-full bg-orange-950/80" />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PROGRESS
          ===================================================== */}

      <div className="absolute bottom-[18%] left-1/2 w-[76%] max-w-[1080px] -translate-x-1/2">

        {/* Labels */}
        <div className="mb-3 flex items-end justify-between">
          <span className="font-mono text-[11px] tracking-[0.25em] text-cyan-300/80">
            0%
          </span>

          <motion.span
            className="
              font-mono
              text-2xl
              tracking-[0.15em]
              text-cyan-300
              drop-shadow-[0_0_10px_rgba(103,232,249,0.55)]
            "
          >
            {String(percentage).padStart(3, "0")}%
          </motion.span>

          <span className="font-mono text-[11px] tracking-[0.25em] text-cyan-300/80">
            100%
          </span>
        </div>

        {/* Bar */}
        <div className="relative h-5 border border-white/25 bg-black/50 p-[3px]">

          <motion.div
            className="
              relative
              h-full
              origin-left
              bg-cyan-300
              shadow-[0_0_18px_rgba(103,232,249,0.8)]
            "
            style={{
              scaleX: progress,
            }}
          >
            <div className="absolute inset-y-0 right-0 w-10 bg-white/35 blur-[3px]" />
          </motion.div>

          {/* scan highlight */}
          <motion.div
            className="
              pointer-events-none
              absolute
              inset-y-0
              w-16
              bg-white/20
              blur-md
            "
            animate={{
              left: ["0%", "100%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Loading text */}
        <div className="mt-10 text-center">
          <p className="font-mono text-sm tracking-[0.45em] text-white/55">
            LOADING... PLEASE WAIT
          </p>
        </div>
      </div>

      {/* =====================================================
          BOTTOM HUD
          ===================================================== */}

      <div className="absolute bottom-10 left-14 right-14 flex items-end justify-between">

        {/* Left */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/40">
            SECURE CONNECTION
          </p>

          <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-white/35">
            ESTABLISHING...
          </p>

          <div className="mt-4 flex gap-1">
            <span className="h-px w-12 bg-cyan-300/50" />
            <span className="h-px w-4 bg-white/20" />
            <span className="h-px w-2 bg-white/10" />
          </div>
        </div>

        {/* Right */}
        <div className="text-right">
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/40">
            SYSTEM STATUS
          </p>

          <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-white/35">
            {complete ? "ONLINE" : "CONNECTING..."}
          </p>

          <div className="mt-4 flex justify-end gap-1">
            <span className="h-px w-2 bg-white/10" />
            <span className="h-px w-4 bg-white/20" />
            <span className="h-px w-12 bg-cyan-300/50" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}