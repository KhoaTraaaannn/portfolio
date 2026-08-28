"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { motion } from "motion/react";

import LoadingCharacter from "@/public/Loading.png";
import LoadingCharacterLight from "@/public/LoadingLight.png";

const LOADING_DURATION = 10000;
type Theme = "light" | "dark";

function getThemeSnapshot(): Theme {
  const hour = new Date().getHours();

  // 06:00 -> 17:59  = Light
  // 18:00 -> 05:59  = Dark
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  // SSR cannot reliably know the user's local timezone.
  // Keep a stable server snapshot to avoid hydration mismatch.
  return "light";
}
function subscribeTheme(callback: () => void) {
  const handleThemeChange = () => {
    callback();
  };

  window.addEventListener("themechange", handleThemeChange);

  const observer = new MutationObserver(() => {
    callback();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => {
    window.removeEventListener(
      "themechange",
      handleThemeChange,
    );

    observer.disconnect();
  };
}

export function LoadingScene() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const isLight = theme === "light";

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

          window.dispatchEvent(
            new Event("portfolio:loading-complete"),
          );
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
        className={[
          "fixed",
          "inset-0",
          "z-[9999]",
          "overflow-hidden",
          isLight
            ? "bg-[#f5f3ee] text-neutral-900"
            : "bg-[#020304] text-white",
          complete
            ? "pointer-events-none"
            : "pointer-events-auto",
        ].join(" ")}
      initial={{ opacity: 1 }}
      animate={{
        opacity: complete ? 0 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
   

      <div
        className={`
          absolute
          inset-0
          ${
            isLight
              ? "opacity-[0.045] [background-image:linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px)]"
              : "opacity-[0.11] [background-image:linear-gradient(rgba(90,220,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(90,220,255,0.07)_1px,transparent_1px)]"
          }
        `}
        style={{
          backgroundSize: "72px 72px",
        }}
      />

      <div
        className={`
          absolute
          inset-0
          ${
            isLight
              ? "opacity-[0.025] [background-image:linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)]"
              : "opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]"
          }
        `}
        style={{
          backgroundSize: "18px 18px",
        }}
      />

      <div
        className={`
          absolute
          inset-0
          ${
            isLight
              ? "opacity-[0.018] [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(0,0,0,0.25)_4px)]"
              : "opacity-[0.035] [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.6)_4px)]"
          }
        `}
      />

      <div
        className={`
          absolute
          inset-0
          ${
            isLight
              ? "bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.08)_100%)]"
              : "bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.48)_100%)]"
          }
        `}
      />

      

      <div
        className={`
          pointer-events-none
          absolute
          inset-7
          border
          md:inset-8
          ${
            isLight
              ? "border-neutral-900/[0.08]"
              : "border-white/[0.07]"
          }
        `}
      >
        <div
          className="
            absolute
            -left-px
            -top-px
            h-10
            w-10
            border-l
            border-t
            border-cyan-300/60
          "
        />

        <div
          className="
            absolute
            -right-px
            -top-px
            h-10
            w-10
            border-r
            border-t
            border-cyan-300/60
          "
        />

        <div
          className="
            absolute
            -bottom-px
            -left-px
            h-10
            w-10
            border-b
            border-l
            border-cyan-300/60
          "
        />

        <div
          className="
            absolute
            -bottom-px
            -right-px
            h-10
            w-10
            border-b
            border-r
            border-cyan-300/60
          "
        />
      </div>



      <div
        className="
          absolute
          left-14
          right-14
          top-14
          flex
          items-start
          justify-between
        "
      >
        <div className="space-y-2">
          <p
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/75"
                  : "text-white/70"
              }
            `}
          >
            PORTFOLIO.OS
          </p>

          <p
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/75"
                  : "text-white/70"
              }
            `}
          >
            v1.0.0
          </p>
        </div>

        <div className="text-right">
          <p
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/75"
                  : "text-white/70"
              }
            `}
          >
            SYSTEM INITIALIZATION
          </p>

          <p
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/75"
                  : "text-white/70"
              }
            `}
          >
            PLEASE WAIT
          </p>
        </div>
      </div>

     

      <div
        className="
          absolute
          left-1/2
          top-[12%]
          -translate-x-1/2
        "
      >
        <div className="flex items-center gap-4">
          <motion.span
            className={`
              h-2
              w-2
              rounded-full
              ${
                isLight
                  ? "bg-neutral-500 shadow-[0_0_10px_rgba(115,115,115,0.35)]"
                  : "bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]"
              }
            `}
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

          <span
            className={`
              font-mono
              text-[11px]
              tracking-[0.42em]
              ${
                isLight
                  ? "text-neutral-800/45"
                  : "text-white/45"
              }
            `}
          >
            LOADING...
          </span>
        </div>
      </div>

 

      <div
        className="
          absolute
          inset-x-0
          top-[23%]
          px-6
          md:top-[25%]
          md:px-12
        "
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="relative h-[270px] md:h-[310px]">

        

            {!isLight && (
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
            )}

       

            <div
              className={`
                absolute
                bottom-5
                left-0
                right-0
                h-px
                ${
                  isLight
                    ? "bg-black/[0.12]"
                    : "bg-white/[0.12]"
                }
              `}
            />

            <div
              className={`
                absolute
                bottom-[19px]
                left-[8%]
                right-[8%]
                h-px
                bg-gradient-to-r
                from-transparent
                ${
                  isLight
                    ? "via-neutral-400/15"
                    : "via-orange-300/20"
                }
                to-transparent
              `}
            />

            <div
              className={`
                absolute
                bottom-4
                left-[13%]
                h-1
                w-10
                border-t
                ${
                  isLight
                    ? "border-black/10"
                    : "border-white/10"
                }
              `}
            />

            <div
              className={`
                absolute
                bottom-4
                left-[28%]
                h-1
                w-6
                border-t
                ${
                  isLight
                    ? "border-black/10"
                    : "border-white/10"
                }
              `}
            />

            <div
              className={`
                absolute
                bottom-4
                right-[27%]
                h-1
                w-12
                border-t
                ${
                  isLight
                    ? "border-black/10"
                    : "border-white/10"
                }
              `}
            />

            <div
              className={`
                absolute
                bottom-4
                right-[12%]
                h-1
                w-7
                border-t
                ${
                  isLight
                    ? "border-black/10"
                    : "border-white/10"
                }
              `}
            />

          

            <motion.div
              className="
                absolute
                bottom-5
                left-[43%]
                -translate-x-1/2
              "
              animate={{
                y: [0, -2, 0],
                rotate: [0, -0.35, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              
              {isLight ? (
                <Image
                  src={LoadingCharacterLight}
                  alt=""
                  priority
                  className="
                    h-[210px]
                    w-auto
                    object-contain
                    md:h-[250px]
                  "
                />
              ) : (
                <Image
                  src={LoadingCharacter}
                  alt=""
                  priority
                  className="
                    h-[210px]
                    w-auto
                    object-contain
                    md:h-[250px]
                  "
                />
              )}
            </motion.div>

         

            {!isLight && (
              <div
                className="
                  absolute
                  bottom-5
                  left-[57%]
                  -translate-x-1/2
                "
              >
       

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
                      y: [
                        -2,
                        -25 - (index % 3) * 12,
                      ],
                      x: [
                        0,
                        (index % 2 === 0 ? 1 : -1) *
                          (5 + (index % 4) * 5),
                      ],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1, 0.2],
                    }}
                    transition={{
                      duration:
                        1.5 + (index % 4) * 0.25,
                      repeat: Infinity,
                      delay: index * 0.16,
                      ease: "easeOut",
                    }}
                  />
                ))}

        

                <motion.div
                  className="
                    relative
                    h-20
                    w-24
                  "
                  animate={{
                    scaleX: [1, 0.96, 1.04, 1],
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
            

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


                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-3
                    w-16
                    -translate-x-1/2
                    rotate-12
                    rounded-full
                    bg-orange-900/80
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-3
                    w-16
                    -translate-x-1/2
                    -rotate-12
                    rounded-full
                    bg-orange-950/80
                  "
                />
              </div>
            )}

           

            {isLight && (
              <div
                className="
                  absolute
                  bottom-5
                  left-[57%]
                  -translate-x-1/2
                "
              >

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-3
                    w-20
                    -translate-x-1/2
                    rotate-12
                    rounded-full
                    bg-neutral-700/80
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-3
                    w-20
                    -translate-x-1/2
                    -rotate-12
                    rounded-full
                    bg-neutral-800/80
                  "
                />


                <div
                  className="
                    absolute
                    bottom-1
                    left-1/2
                    h-4
                    w-20
                    -translate-x-1/2
                    rounded-full
                    bg-neutral-500/25
                    blur-[3px]
                  "
                />

                <div
                  className="
                    absolute
                    bottom-3
                    left-1/2
                    h-3
                    w-14
                    -translate-x-1/2
                    rounded-full
                    bg-neutral-400/20
                    blur-[2px]
                  "
                />


                <span
                  className="
                    absolute
                    bottom-2
                    left-[35%]
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-neutral-500/50
                  "
                />

                <span
                  className="
                    absolute
                    bottom-3
                    left-[55%]
                    h-1
                    w-1
                    rounded-full
                    bg-neutral-400/40
                  "
                />

                <span
                  className="
                    absolute
                    bottom-1
                    left-[70%]
                    h-1
                    w-1
                    rounded-full
                    bg-neutral-600/50
                  "
                />
              </div>
            )}
          </div>
        </div>
      </div>

      

      <div
        className="
          absolute
          bottom-[18%]
          left-1/2
          w-[76%]
          max-w-[1080px]
          -translate-x-1/2
        "
      >
        <div className="mb-3 flex items-end justify-between">
          <span
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/65"
                  : "text-white/55"
              }
            `}
          >
            0%
          </span>

          <motion.span
            className={`
              font-mono
              text-2xl
              tracking-[0.15em]
              ${
                isLight
                  ? "font-semibold text-black"
                  : "text-cyan-300 drop-shadow-[0_0_10px_rgba(103,232,249,0.55)]"
              }
            `}
          >
            {String(percentage).padStart(3, "0")}%
          </motion.span>

          <span
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/65"
                  : "text-white/55"
              }
            `}
          >
            100%
          </span>
        </div>

        <div
          className={`
            relative
            h-5
            border
            p-[3px]
            ${
              isLight
                ? "border-neutral-900/15 bg-neutral-900/[0.04]"
                : "border-white/25 bg-black/50"
            }
          `}
        >
          <motion.div
            className={`
              relative
              h-full
              origin-left
              ${
                isLight
                  ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.18)]"
                  : "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]"
              }
            `}
            style={{
              scaleX: progress,
            }}
          >
            <div
              className={`
                absolute
                inset-y-0
                right-0
                w-10
                blur-[3px]
                ${
                  isLight
                    ? "bg-white/45"
                    : "bg-white/35"
                }
              `}
            />
          </motion.div>

          <motion.div
            className={`
              pointer-events-none
              absolute
              inset-y-0
              w-16
              blur-md
              ${
                isLight
                  ? "bg-black/10"
                  : "bg-white/20"
              }
            `}
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

        <div className="mt-10 text-center">
          <p
            className={`
              font-mono
              text-sm
              tracking-[0.45em]
              ${
                isLight
                  ? "font-medium text-black/65"
                  : "text-white/55"
              }
            `}
          >
            LOADING... PLEASE WAIT
          </p>
        </div>
      </div>

     

      <div
        className="
          absolute
          bottom-10
          left-14
          right-14
          flex
          items-end
          justify-between
        "
      >
        <div>
          <p
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/65"
                  : "text-white/55"
              }
            `}
          >
            SECURE CONNECTION
          </p>

          <p
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/65"
                  : "text-white/55"
              }
            `}
          >
            ESTABLISHING...
          </p>

          <div className="mt-4 flex gap-1">
            <span
              className={`
                h-px
                w-12
                ${
                  isLight
                    ? "bg-cyan-700/35"
                    : "bg-cyan-300/50"
                }
              `}
            />

            <span
              className={`
                h-px
                w-4
                ${
                  isLight
                    ? "bg-black/15"
                    : "bg-white/20"
                }
              `}
            />

            <span
              className={`
                h-px
                w-2
                ${
                  isLight
                    ? "bg-black/10"
                    : "bg-white/10"
                }
              `}
            />
          </div>
        </div>

        <div className="text-right">
          <p
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/65"
                  : "text-white/55"
              }
            `}
          >
            SYSTEM STATUS
          </p>

          <p
            className={`
              font-mono
              text-[10px]
              tracking-[0.35em]
              ${
                isLight
                  ? "text-neutral-900/65"
                  : "text-white/55"
              }
            `}
          >
            {complete ? "ONLINE" : "CONNECTING..."}
          </p>

          <div className="mt-4 flex justify-end gap-1">
            <span
              className={`
                h-px
                w-2
                ${
                  isLight
                    ? "bg-black/10"
                    : "bg-white/10"
                }
              `}
            />

            <span
              className={`
                h-px
                w-4
                ${
                  isLight
                    ? "bg-black/15"
                    : "bg-white/20"
                }
              `}
            />

            <span
              className={`
                h-px
                w-12
                ${
                  isLight
                    ? "bg-cyan-700/35"
                    : "bg-cyan-300/50"
                }
              `}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}