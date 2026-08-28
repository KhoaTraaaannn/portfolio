"use client";

import { useEffect, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const WELCOME_STORAGE_KEY =
  "portfolio:welcome-seen";

const WELCOME_DURATION = 10_000;

export function WelcomeScene() {
  const router = useRouter();


  useEffect(() => {
    const hasSeenWelcome =
      window.localStorage.getItem(
        WELCOME_STORAGE_KEY,
      ) === "true";

    if (hasSeenWelcome) {
      router.replace("/");
    }
  }, [router]);


  useEffect(() => {
    const hasSeenWelcome =
      window.localStorage.getItem(
        WELCOME_STORAGE_KEY,
      ) === "true";

    if (hasSeenWelcome) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.localStorage.setItem(
        WELCOME_STORAGE_KEY,
        "true",
      );

      router.replace("/");
    }, WELCOME_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [router]);

  const welcomeStyle = {
    willChange:
      "transform, opacity, filter",

    backfaceVisibility:
      "hidden",

    WebkitBackfaceVisibility:
      "hidden",
  } as CSSProperties;

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-background
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            [background-image:linear-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.08)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,hsl(var(--background)/0.7)_100%)]
          "
        />
      </div>

      <div
        className="
          absolute
          left-8
          top-8
          md:left-12
          md:top-10
        "
      >
        <p
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-muted-foreground/60
          "
        >
          Portfolio
        </p>
      </div>

      <motion.div
        style={welcomeStyle}
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
          filter: "blur(14px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          text-center
        "
      >
        <p
          className="
            mb-5
            font-mono
            text-[10px]
            uppercase
            tracking-[0.45em]
            text-muted-foreground
          "
        >
          Welcome to my portfolio
        </p>

        <h1
          aria-label="Welcome"
          className="
            select-none
            whitespace-nowrap
            text-[clamp(4rem,11vw,10rem)]
            font-black
            leading-none
            tracking-[-0.07em]
            text-foreground
          "
        >
          WELCOME!
        </h1>

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            delay: 0.65,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mt-8
            h-px
            w-24
            origin-center
            bg-foreground/30
          "
        />
      </motion.div>

      <div
        className="
          absolute
          bottom-8
          left-8
          right-8
          flex
          items-end
          justify-between
          md:bottom-10
          md:left-12
          md:right-12
        "
      >
        <p
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-muted-foreground/50
          "
        >
          Initializing experience
        </p>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-foreground/60
            "
          />

          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-muted-foreground/50
          "
          >
            Entering
          </span>
        </motion.div>
      </div>
    </main>
  );
}