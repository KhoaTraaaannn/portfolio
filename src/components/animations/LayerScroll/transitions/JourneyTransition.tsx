"use client";

import { motion } from "motion/react";

type JourneyTransitionProps = {
  activeIndex: number;
  progress: number;
  label: string;
};

export function JourneyTransition({
  activeIndex,
  progress,
  label,
}: JourneyTransitionProps) {
  const intensity =
    Math.min(1, Math.abs(
      progress - activeIndex,
    ) * 2);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      <motion.div
        className="
          absolute inset-x-0 top-0 h-[22vh]
          bg-[linear-gradient(to_bottom,rgba(2,3,4,0.72),transparent)]
        "
        animate={{
          opacity: 0.2 + intensity * 0.45,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="
          absolute inset-x-0 bottom-0 h-[18vh]
          bg-[linear-gradient(to_top,rgba(2,3,4,0.72),transparent)]
        "
        animate={{
          opacity: 0.18 + intensity * 0.35,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
      />

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <motion.div
          key={activeIndex}
          initial={{
            opacity: 0,
            y: 10,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: intensity > 0.04 ? 1 : 0,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            whitespace-nowrap
            font-mono
            text-[9px]
            uppercase
            tracking-[0.4em]
            text-white/35
          "
        >
          {String(activeIndex + 1).padStart(2, "0")} / {label}
        </motion.div>
      </div>
    </div>
  );
}
