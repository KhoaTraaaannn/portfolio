"use client";

import {
  type CSSProperties,
  type ReactNode,
} from "react";

type JourneyViewportProps = {
  children: ReactNode;
  offset: number;
};

export function JourneyViewport({
  children,
  offset,
}: JourneyViewportProps) {
  const style: CSSProperties = {
    transform: `translate3d(0, ${offset}px, 0)`,
    willChange: "transform",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  return (
    <div
      data-journey-viewport
      className="
        fixed
        inset-x-0
        bottom-0
        top-16
        overflow-hidden
        bg-[#020304]
      "
    >
      <div
        data-journey-camera
        className="relative w-full"
        style={style}
      >
        {children}
      </div>
    </div>
  );
}