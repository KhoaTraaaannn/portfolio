"use client";

import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

type SectionNavigatorProps = {
  targetId: string;
  children: ReactNode;
};

export function SectionNavigator({
  targetId,
  children,
}: SectionNavigatorProps) {
  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const shouldReduceMotion = useReducedMotion();

  const animationFrame = useRef<number | null>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (isTransitioning) {
        return;
      }

      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }

      if (shouldReduceMotion) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        return;
      }

      setIsTransitioning(true);

      const start = window.scrollY;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        64;

      const distance = Math.abs(
        targetPosition - start,
      );

      const duration = Math.min(
        Math.max(900 + distance * 0.35, 900),
        2600,
      );

      const startTime = performance.now();

      const easeInOutCubic = (value: number) => {
        return value < 0.5
          ? 4 * value * value * value
          : 1 -
              Math.pow(-2 * value + 2, 3) /
                2;
      };

      const animate = (time: number) => {
        const elapsed = time - startTime;

        const progress = Math.min(
          elapsed / duration,
          1,
        );

        const eased = easeInOutCubic(progress);

        window.scrollTo(
          0,
          start +
            (targetPosition - start) *
              eased,
        );

        if (progress < 1) {
          animationFrame.current =
            requestAnimationFrame(animate);

          return;
        }

        setIsTransitioning(false);
        animationFrame.current = null;
      };

      animationFrame.current =
        requestAnimationFrame(animate);
    },
    [
      isTransitioning,
      shouldReduceMotion,
      targetId,
    ],
  );

  return (
    <>
      <a
        href={`#${targetId}`}
        onClick={handleClick}
      >
        {children}
      </a>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
        initial={false}
        animate={{
          opacity: isTransitioning ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-48 w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-background/90 blur-3xl"
          animate={
            isTransitioning
              ? {
                  scale: [0.8, 1.25, 1],
                  x: ["-15%", "8%", "0%"],
                }
              : {
                  scale: 0.8,
                  x: "-15%",
                }
          }
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.div
          className="absolute -left-[15%] top-[25%] h-32 w-[70%] rounded-full bg-background/70 blur-3xl"
          animate={
            isTransitioning
              ? {
                  x: ["-10%", "25%"],
                  opacity: [0, 1, 0.5],
                }
              : {
                  x: "-10%",
                  opacity: 0,
                }
          }
          transition={{
            duration: 1.1,
            ease: "easeOut",
          }}
        />

        <motion.div
          className="absolute -right-[15%] bottom-[20%] h-40 w-[75%] rounded-full bg-background/70 blur-3xl"
          animate={
            isTransitioning
              ? {
                  x: ["15%", "-25%"],
                  opacity: [0, 1, 0.5],
                }
              : {
                  x: "15%",
                  opacity: 0,
                }
          }
          transition={{
            duration: 1.3,
            ease: "easeOut",
          }}
        />
      </motion.div>
    </>
  );
}