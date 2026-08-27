"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

type ResumeTransitionProps = {
  active: boolean;
  onComplete: () => void;
};

const TRANSITION_DURATION = 1800;

export function ResumeTransition({
  active,
  onComplete,
}: ResumeTransitionProps) {
  const [progress, setProgress] =
    useState(0);

  const completedRef = useRef(false);
  useEffect(() => {
    if (!active) {
      completedRef.current = false;
      return;
    }

    let frameId = 0;
    let startTime = 0;

    completedRef.current = false;

    const animate = (
      timestamp: number,
    ) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed =
        timestamp - startTime;

      const rawProgress = Math.min(
        elapsed / TRANSITION_DURATION,
        1,
      );
      const easedProgress =
        1 -
        Math.pow(
          1 - rawProgress,
          3,
        );

      const nextProgress = Math.round(
        easedProgress * 100,
      );

      setProgress(nextProgress);

      if (rawProgress < 1) {
        frameId =
          window.requestAnimationFrame(
            animate,
          );

        return;
      }

      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    };

    frameId =
      window.requestAnimationFrame(
        animate,
      );

    return () => {
      window.cancelAnimationFrame(
        frameId,
      );
    };
  }, [active, onComplete]);

  const visibleProgress = active
    ? progress
    : 0;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[#020304]
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-40
              [background-image:
                linear-gradient(
                  rgba(255,255,255,0.025) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.025) 1px,
                  transparent 1px
                )
              ]
              [background-size:48px_48px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-30
              [background-image:
                repeating-linear-gradient(
                  to_bottom,
                  transparent 0px,
                  transparent 3px,
                  rgba(255,255,255,0.018) 4px
                )
              ]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(
                circle_at_50%_50%,
                rgba(30,180,255,0.07),
                transparent_48%
              )]
            "
          />

          <div
            className="
              relative
              z-10
              w-full
              max-w-3xl
              px-8
            "
          >
            <div
              className="
                mb-16
                flex
                items-start
                justify-between
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-cyan-400/60
              "
            >
              <div>
                <p>
                  PORTFOLIO.OS
                </p>

                <p className="mt-3">
                  RESUME.EXE
                </p>
              </div>

              <div className="text-right">
                <p>
                  TRANSFER
                </p>

                <p className="mt-3">
                  PORTFOLIO → RESUME
                </p>
              </div>
            </div>

            <div
              className="
                flex
                flex-col
                items-center
              "
            >
              <div
                className="
                  mb-8
                  flex
                  items-center
                  gap-4
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.45em]
                  text-white/60
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_16px_rgba(34,211,238,0.8)]
                  "
                />

                <span>
                  LOADING RESUME
                </span>
              </div>

              <div
                className="
                  mb-5
                  font-mono
                  text-4xl
                  font-medium
                  tracking-[0.15em]
                  text-cyan-300
                  drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]
                "
              >
                {String(
                  visibleProgress,
                ).padStart(3, "0")}
                %
              </div>

              <div
                className="
                  h-3
                  w-full
                  overflow-hidden
                  border
                  border-cyan-400/20
                  bg-black
                  p-[2px]
                "
              >
                <motion.div
                  className="
                    h-full
                    bg-cyan-300
                    shadow-[0_0_20px_rgba(34,211,238,0.8)]
                  "
                  style={{
                    width: `${visibleProgress}%`,
                  }}
                />
              </div>

              <p
                className="
                  mt-8
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.5em]
                  text-white/40
                "
              >
                ESTABLISHING RESUME
                SESSION
              </p>
            </div>

            <div
              className="
                mt-20
                flex
                justify-between
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/25
              "
            >
              <span>
                SOURCE
                <br />

                <span className="text-cyan-400/40">
                  PORTFOLIO
                </span>
              </span>

              <span className="text-right">
                DESTINATION
                <br />

                <span className="text-cyan-400/40">
                  RESUME
                </span>
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-8
              border
              border-white/5
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-8
              top-8
              h-10
              w-10
              border-l
              border-t
              border-cyan-400/40
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-8
              top-8
              h-10
              w-10
              border-r
              border-t
              border-cyan-400/40
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-8
              left-8
              h-10
              w-10
              border-b
              border-l
              border-cyan-400/40
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-8
              right-8
              h-10
              w-10
              border-b
              border-r
              border-cyan-400/40
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}