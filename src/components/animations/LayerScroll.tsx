"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useReducedMotion } from "motion/react";

import { Footer } from "@/components/layout/Footer";

import { LiquidTransition } from "./LiquidTransition";

type LayerScrollProps = {
  children: ReactNode;
};

type TransitionSource =
  | "wheel"
  | "navbar";

type TransitionState = {
  active: boolean;
  direction: 1 | -1;
  label: string;
  source: TransitionSource;
};

const LAYERS = [
  {
    id: "hero",
    label: "Home",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "skills",
    label: "Skills",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "experience",
    label: "Experience",
  },
  {
    id: "timeline",
    label: "Timeline",
  },
  {
    id: "contact",
    label: "Contact",
  },
  
] as const;

/*
 * Liquid animation duration.
 *
 * This is purely visual.
 * It does NOT lock scrolling.
 */
const TRANSITION_DURATION = 1000;

/*
 * The liquid should cover the old scene
 * before we swap the active scene.
 */
const FLOOR_SWITCH_DELAY = 500;

const WHEEL_THRESHOLD = 8;

export function LayerScroll({
  children,
}: LayerScrollProps) {
  const shouldReduceMotion =
    useReducedMotion();

  const [activeLayer, setActiveLayer] =
    useState(0);

  const [transition, setTransition] =
    useState<TransitionState>({
      active: false,
      direction: 1,
      label: "",
      source: "wheel",
    });

  /*
   * Current logical section.
   *
   * This is intentionally independent from
   * React state so wheel handlers never suffer
   * from stale state.
   */
  const activeLayerRef =
    useRef(0);

  /*
   * Prevent multiple section changes from
   * the same physical wheel gesture.
   */
  const gestureConsumed =
    useRef(false);

  /*
   * Accumulate trackpad wheel movement.
   */
  const wheelAccumulator =
    useRef(0);

  const wheelDirection =
    useRef<1 | -1 | 0>(0);

  const wheelResetTimer =
    useRef<number | null>(null);

  /*
   * Transition timers.
   *
   * These are ONLY used to synchronize the
   * liquid cover/reveal with the scene swap.
   *
   * They are NOT used to lock wheel input.
   */
  const transitionTimers =
    useRef<number[]>([]);

  const clearTransitionTimers =
    useCallback(() => {
      transitionTimers.current.forEach(
        (timer) => {
          window.clearTimeout(timer);
        },
      );

      transitionTimers.current = [];
    },
    []);

  const scheduleTransition =
    useCallback(
      (
        callback: () => void,
        delay: number,
      ) => {
        const timer =
          window.setTimeout(
            callback,
            delay,
          );

        transitionTimers.current.push(
          timer,
        );

        return timer;
      },
      [],
    );

  /*
   * Navigate to a specific section.
   *
   * Flow:
   *
   * 1. Liquid covers current scene.
   * 2. Swap active scene.
   * 3. Liquid reveals new scene.
   *
   * There is NO wheel lock here.
   */
  const transitionTo =
    useCallback(
      (
        targetIndex: number,
        source: TransitionSource,
      ) => {
        const currentIndex =
          activeLayerRef.current;

        if (
          targetIndex < 0 ||
          targetIndex >=
            LAYERS.length
        ) {
          return;
        }

        if (
          targetIndex ===
          currentIndex
        ) {
          return;
        }

        const direction: 1 | -1 =
          targetIndex >
          currentIndex
            ? 1
            : -1;

        const target =
          LAYERS[targetIndex];

        /*
         * Reduced motion:
         *
         * Skip the liquid entirely.
         */
        if (
          shouldReduceMotion
        ) {
          activeLayerRef.current =
            targetIndex;

          setActiveLayer(
            targetIndex,
          );

          return;
        }

        clearTransitionTimers();

        /*
         * Start liquid cover.
         */
        setTransition({
          active: true,
          direction,
          label:
            target.label,
          source,
        });

        /*
         * Once liquid covers the screen,
         * swap the actual scene.
         */
        scheduleTransition(
          () => {
            activeLayerRef.current =
              targetIndex;

            setActiveLayer(
              targetIndex,
            );
          },
          FLOOR_SWITCH_DELAY,
        );

        /*
         * Reveal the new scene.
         */
        scheduleTransition(
          () => {
            setTransition(
              (current) => ({
                ...current,
                active: false,
              }),
            );
          },
          TRANSITION_DURATION,
        );
      },
      [
        shouldReduceMotion,
        clearTransitionTimers,
        scheduleTransition,
      ],
    );

  /*
   * Reset the current physical wheel gesture.
   *
   * This is what allows:
   *
   * wheel gesture #1
   *     → About
   *
   * release / settle
   *
   * wheel gesture #2
   *     → Skills
   */
  const resetWheelGesture =
    useCallback(() => {
      wheelAccumulator.current =
        0;

      wheelDirection.current =
        0;

      gestureConsumed.current =
        false;

      wheelResetTimer.current =
        null;
    }, []);

  /*
   * Wheel navigation.
   *
   * One physical gesture produces
   * one logical section change.
   */
  useEffect(() => {
    const handleWheel = (
      event: WheelEvent,
    ) => {
      if (
        Math.abs(event.deltaY) <
        WHEEL_THRESHOLD
      ) {
        return;
      }

      event.preventDefault();

      /*
       * Keep the gesture alive while
       * wheel events continue arriving.
       */
      if (
        wheelResetTimer.current !==
        null
      ) {
        window.clearTimeout(
          wheelResetTimer.current,
        );
      }

      wheelResetTimer.current =
        window.setTimeout(
          resetWheelGesture,
          140,
        );

      /*
       * One gesture = one section.
       */
      if (
        gestureConsumed.current
      ) {
        return;
      }

      const incomingDirection:
        | 1
        | -1 =
        event.deltaY > 0
          ? 1
          : -1;

      /*
       * Direction reversal means this
       * is probably a new gesture.
       */
      if (
        wheelDirection.current !==
          0 &&
        wheelDirection.current !==
          incomingDirection
      ) {
        wheelAccumulator.current =
          0;
      }

      wheelDirection.current =
        incomingDirection;

      wheelAccumulator.current +=
        Math.abs(event.deltaY);

      /*
       * Ignore very tiny wheel noise.
       */
      if (
        wheelAccumulator.current <
        32
      ) {
        return;
      }

      /*
       * Consume this physical gesture.
       */
      gestureConsumed.current =
        true;

      wheelAccumulator.current =
        0;

      const nextIndex =
        activeLayerRef.current +
        incomingDirection;

      /*
       * Boundary.
       */
      if (
        nextIndex < 0 ||
        nextIndex >=
          LAYERS.length
      ) {
        return;
      }

      transitionTo(
        nextIndex,
        "wheel",
      );
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel,
      );

      if (
        wheelResetTimer.current !==
        null
      ) {
        window.clearTimeout(
          wheelResetTimer.current,
        );
      }
    };
  }, [
    resetWheelGesture,
    transitionTo,
  ]);

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      let direction:
        | 1
        | -1
        | null = null;

      if (
        event.key ===
          "ArrowDown" ||
        event.key ===
          "PageDown"
      ) {
        direction = 1;
      }

      if (
        event.key ===
          "ArrowUp" ||
        event.key ===
          "PageUp"
      ) {
        direction = -1;
      }

      if (
        direction === null
      ) {
        return;
      }

      event.preventDefault();

      transitionTo(
        activeLayerRef.current +
          direction,
        "wheel",
      );
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [transitionTo]);

  /*
   * Navbar navigation.
   */
  useEffect(() => {
    const handleNavigation = (
      event: Event,
    ) => {
      const customEvent =
        event as CustomEvent<string>;

      const targetId =
        customEvent.detail;

      if (!targetId) {
        return;
      }

      const targetIndex =
        LAYERS.findIndex(
          (layer) =>
            layer.id === targetId,
        );

      if (
        targetIndex === -1
      ) {
        return;
      }

      transitionTo(
        targetIndex,
        "navbar",
      );
    };

    window.addEventListener(
      "portfolio:navigate",
      handleNavigation,
    );

    return () => {
      window.removeEventListener(
        "portfolio:navigate",
        handleNavigation,
      );
    };
  }, [transitionTo]);

  /*
   * Lock native browser scrolling.
   */
  useEffect(() => {
    const html =
      document.documentElement;

    const body =
      document.body;

    const previousHtmlOverflow =
      html.style.overflow;

    const previousBodyOverflow =
      body.style.overflow;

    html.style.overflow =
      "hidden";

    body.style.overflow =
      "hidden";

    return () => {
      html.style.overflow =
        previousHtmlOverflow;

      body.style.overflow =
        previousBodyOverflow;
    };
  }, []);

  /*
   * Cleanup.
   */
  useEffect(() => {
    return () => {
      clearTransitionTimers();

      if (
        wheelResetTimer.current !==
        null
      ) {
        window.clearTimeout(
          wheelResetTimer.current,
        );
      }
    };
  }, [
    clearTransitionTimers,
  ]);

  /*
   * Normalize children.
   */
  const layerChildren =
    Array.isArray(children)
      ? children
      : [children];

  return (
    <div
      className="
        absolute
        inset-0
        bottom-0
        top-16
        overflow-hidden
        bg-[#020304]
      "
    >
      {/* Cinematic background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          [background-image:
            linear-gradient(
              rgba(255,255,255,0.025)_1px,
              transparent_1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025)_1px,
              transparent_1px
            )
          ]
          [background-size:64px_64px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
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
            circle_at_50%_20%,
            rgba(30,180,255,0.045),
            transparent_42%
          )]
        "
      />

      {layerChildren.map(
        (child, index) => (
          <div
            key={
              LAYERS[index]?.id ??
              index
            }
            aria-hidden={
              index !==
              activeLayer
            }
            className="
              absolute
              inset-0
            "
            style={{
              visibility:
                index ===
                activeLayer
                  ? "visible"
                  : "hidden",

              pointerEvents:
                index ===
                activeLayer
                  ? "auto"
                  : "none",
            }}
          >
            {child}
          </div>
        ),
      )}

      <LiquidTransition
        active={
          transition.active
        }
        direction={
          transition.direction
        }
        label={
          transition.label
        }
        source={
          transition.source
        }
      />
    </div>
  );
  
}