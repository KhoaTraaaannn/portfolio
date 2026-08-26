"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const SECTION_COUNT = 7;

const SPRING = 0.015;
const EPSILON = 0.1;

const WHEEL_THRESHOLD = 8;

/*
 * One wheel gesture = one scene.
 *
 * The camera moves one full viewport height
 * instead of moving by the raw wheel delta.
 */
const WHEEL_SECTION_STEP = 1;

const VELOCITY_SMOOTHING = 0.18;
const VELOCITY_EPSILON = 0.01;

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    Math.max(value, min),
    max,
  );
}

function getMaxScroll(
  viewportHeight: number,
) {
  return Math.max(
    0,
    (SECTION_COUNT - 1) *
      viewportHeight,
  );
}

export function useJourneyScroll() {
  const [offset, setOffset] =
    useState(0);

  const [progress, setProgress] =
    useState(0);

  const [
    viewportHeight,
    setViewportHeight,
  ] = useState(0);

  const [
    cameraVelocity,
    setCameraVelocity,
  ] = useState(0);

  const [
    cameraDirection,
    setCameraDirection,
  ] = useState<1 | -1 | 0>(0);

  const currentY =
    useRef(0);

  const targetY =
    useRef(0);

  const previousY =
    useRef(0);

  const velocity =
    useRef(0);

  const direction =
    useRef<1 | -1 | 0>(0);

  const reducedMotion =
    useRef(false);

  /*
   * Current logical section.
   *
   * This prevents a single wheel gesture
   * from being interpreted as hundreds of
   * tiny scroll movements.
   */
  const currentSection =
    useRef(0);

  /*
   * Resize.
   */
  useEffect(() => {
    const updateViewport = () => {
      const height =
        window.innerHeight;

      setViewportHeight(height);

      const maxY =
        getMaxScroll(height);

      currentY.current =
        clamp(
          currentY.current,
          0,
          maxY,
        );

      targetY.current =
        clamp(
          targetY.current,
          0,
          maxY,
        );

      /*
       * Recalculate logical section after resize.
       */
      currentSection.current =
        clamp(
          Math.round(
            targetY.current /
              Math.max(height, 1),
          ),
          0,
          SECTION_COUNT - 1,
        );

      previousY.current =
        currentY.current;

      velocity.current = 0;
      direction.current = 0;

      const nextProgress =
        maxY === 0
          ? 0
          : currentY.current /
            maxY;

      setOffset(
        currentY.current,
      );

      setProgress(
        clamp(
          nextProgress,
          0,
          1,
        ),
      );
    };

    updateViewport();

    window.addEventListener(
      "resize",
      updateViewport,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateViewport,
      );
    };
  }, []);

  /*
   * Camera animation.
   */
  useEffect(() => {
    let frameId = 0;
    let running = true;

    const animate = () => {
      if (!running) {
        return;
      }

      const maxY =
        getMaxScroll(
          viewportHeight,
        );

      if (
        reducedMotion.current
      ) {
        currentY.current =
          targetY.current;
      } else {
        const difference =
          targetY.current -
          currentY.current;

        if (
          Math.abs(difference) >
          EPSILON
        ) {
          currentY.current +=
            difference * SPRING;
        } else {
          currentY.current =
            targetY.current;
        }
      }

      /*
       * Camera velocity.
       */
      const frameDelta =
        currentY.current -
        previousY.current;

      velocity.current +=
        (
          frameDelta -
          velocity.current
        ) *
        VELOCITY_SMOOTHING;

      if (
        Math.abs(
          velocity.current,
        ) <
        VELOCITY_EPSILON
      ) {
        velocity.current = 0;
      }

      let nextDirection:
        | 1
        | -1
        | 0 = 0;

      if (
        velocity.current > 0
      ) {
        nextDirection = 1;
      } else if (
        velocity.current < 0
      ) {
        nextDirection = -1;
      }

      direction.current =
        nextDirection;

      setCameraVelocity(
        velocity.current,
      );

      setCameraDirection(
        nextDirection,
      );

      previousY.current =
        currentY.current;

      const nextProgress =
        maxY === 0
          ? 0
          : currentY.current /
            maxY;

      setOffset(
        currentY.current,
      );

      setProgress(
        clamp(
          nextProgress,
          0,
          1,
        ),
      );

      frameId =
        window.requestAnimationFrame(
          animate,
        );
    };

    frameId =
      window.requestAnimationFrame(
        animate,
      );

    return () => {
      running = false;

      window.cancelAnimationFrame(
        frameId,
      );
    };
  }, [viewportHeight]);

  /*
   * Wheel navigation.
   *
   * IMPORTANT:
   *
   * We do NOT add deltaY directly to targetY.
   *
   * Instead:
   *
   * wheel down → next scene
   * wheel up   → previous scene
   *
   * Each scene is exactly one viewport tall.
   */
    /*
   * Wheel gesture navigation.
   *
   * A single physical scroll gesture can emit
   * many wheel events, especially on trackpads.
   *
   * We therefore accumulate wheel movement and
   * allow only ONE section change per gesture.
   *
   * Example:
   *
   *   deltaY 12
   *   deltaY 18
   *   deltaY 30
   *   deltaY 22
   *
   * becomes:
   *
   *   section 0 → section 1
   *
   * The user must release / settle the wheel
   * before another section transition is allowed.
   */

    useEffect(() => {
        const WHEEL_TRIGGER = 32;
        const WHEEL_SETTLE_DELAY = 140;

        let wheelAccumulator = 0;
        let wheelDirection: 1 | -1 | 0 = 0;

        let settleTimer:
        | number
        | null = null;

        let gestureConsumed = false;

        const resetGesture = () => {
        wheelAccumulator = 0;
        wheelDirection = 0;
        gestureConsumed = false;
        settleTimer = null;
        };

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
        * Keep the gesture alive while wheel
        * events continue arriving.
        */
        if (settleTimer !== null) {
            window.clearTimeout(
            settleTimer,
            );
        }

        settleTimer =
            window.setTimeout(
            resetGesture,
            WHEEL_SETTLE_DELAY,
            );

        /*
        * Once this physical gesture has already
        * changed section, ignore the remaining
        * wheel events.
        */
        if (gestureConsumed) {
            return;
        }

        const incomingDirection:
            | 1
            | -1 =
            event.deltaY > 0
            ? 1
            : -1;

        /*
        * If the user changes direction while
        * the gesture is still building, reset
        * the accumulator.
        */
        if (
            wheelDirection !== 0 &&
            incomingDirection !==
            wheelDirection
        ) {
            wheelAccumulator = 0;
        }

        wheelDirection =
            incomingDirection;

        wheelAccumulator +=
            Math.abs(event.deltaY);

        if (
            wheelAccumulator <
            WHEEL_TRIGGER
        ) {
            return;
        }

        const nextSection =
            clamp(
            currentSection.current +
                wheelDirection,
            0,
            SECTION_COUNT - 1,
            );

        /*
        * At the beginning/end of the journey,
        * consume the gesture anyway.
        *
        * This prevents a trackpad from building
        * a huge accumulator while sitting at a
        * boundary.
        */
        gestureConsumed = true;

        wheelAccumulator = 0;

        if (
            nextSection ===
            currentSection.current
        ) {
            return;
        }

        /*
        * Change logical section exactly once.
        */
        currentSection.current =
            nextSection;

        /*
        * Move the camera exactly one viewport.
        */
        targetY.current =
            nextSection *
            window.innerHeight;
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
            settleTimer !== null
        ) {
            window.clearTimeout(
            settleTimer,
            );
        }
        };
    }, []);

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      const navigationKeys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
      ];

      if (
        !navigationKeys.includes(
          event.key,
        )
      ) {
        return;
      }

      event.preventDefault();

      const height =
        window.innerHeight;

      const maxSection =
        SECTION_COUNT - 1;

      let nextSection =
        currentSection.current;

      if (
        event.key ===
          "ArrowDown" ||
        event.key ===
          "PageDown"
      ) {
        nextSection += 1;
      }

      if (
        event.key ===
          "ArrowUp" ||
        event.key ===
          "PageUp"
      ) {
        nextSection -= 1;
      }

      if (
        event.key === "Home"
      ) {
        nextSection = 0;
      }

      if (
        event.key === "End"
      ) {
        nextSection =
          maxSection;
      }

      nextSection =
        clamp(
          nextSection,
          0,
          maxSection,
        );

      currentSection.current =
        nextSection;

      targetY.current =
        nextSection * height;
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
  }, []);

  /*
   * Reduced motion.
   */
  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    const applyReducedMotion =
      () => {
        reducedMotion.current =
          mediaQuery.matches;

        if (
          !mediaQuery.matches
        ) {
          return;
        }

        currentY.current =
          targetY.current;

        previousY.current =
          currentY.current;

        velocity.current = 0;
        direction.current = 0;

        const maxY =
          getMaxScroll(
            window.innerHeight,
          );

        setOffset(
          currentY.current,
        );

        setProgress(
          maxY === 0
            ? 0
            : clamp(
                currentY.current /
                  maxY,
                0,
                1,
              ),
        );
      };

    applyReducedMotion();

    mediaQuery.addEventListener(
      "change",
      applyReducedMotion,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        applyReducedMotion,
      );
    };
  }, []);

  return {
    offset: -offset,
    progress,
    velocity:
      cameraVelocity,
    direction:
      cameraDirection,
    viewportHeight,
  };
}