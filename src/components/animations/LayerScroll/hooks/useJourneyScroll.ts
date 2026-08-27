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

  
  const currentSection =
    useRef(0);

  
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

       
        if (gestureConsumed) {
            return;
        }

        const incomingDirection:
            | 1
            | -1 =
            event.deltaY > 0
            ? 1
            : -1;

       
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

        
        gestureConsumed = true;

        wheelAccumulator = 0;

        if (
            nextSection ===
            currentSection.current
        ) {
            return;
        }

        
        currentSection.current =
            nextSection;

        
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