"use client";

import { motion } from "motion/react";
import { useLocale } from "@/hooks/useLocale";

type LightTransitionProps = {
  active: boolean;
  direction: 1 | -1;
  label: string;
  source: "wheel" | "navbar";
};

const WHITE = "#FFFFFF";
const BLACK = "#111111";



const WIND_BANDS = [
  {
    d: `
      M -320 55
      C -40 -30 170 20 390 105
      C 610 190 790 190 1010 105
      C 1230 20 1440 40 1770 170
    `,
    width: 82,
    opacity: 0.96,
  },
  {
    d: `
      M -340 165
      C -50 55 160 100 405 195
      C 630 280 810 275 1040 185
      C 1270 95 1460 110 1800 240
    `,
    width: 148,
    opacity: 0.86,
  },
  {
    d: `
      M -350 285
      C -40 145 150 190 410 285
      C 645 375 830 360 1060 265
      C 1290 175 1470 190 1810 315
    `,
    width: 64,
    opacity: 0.98,
  },
  {
    d: `
      M -360 405
      C -45 265 145 315 425 410
      C 665 495 850 480 1080 385
      C 1305 295 1480 310 1830 435
    `,
    width: 182,
    opacity: 0.80,
  },
  {
    d: `
      M -350 530
      C -45 380 155 430 430 520
      C 670 605 855 590 1090 495
      C 1315 405 1490 420 1810 545
    `,
    width: 78,
    opacity: 0.98,
  },
  {
    d: `
      M -340 650
      C -50 505 160 555 435 640
      C 675 720 860 710 1100 615
      C 1325 530 1490 545 1790 660
    `,
    width: 138,
    opacity: 0.82,
  },
  {
    d: `
      M -320 770
      C -30 625 165 675 440 755
      C 675 825 865 815 1095 725
      C 1320 640 1490 655 1760 770
    `,
    width: 60,
    opacity: 0.94,
  },
  {
    d: `
      M -300 885
      C -10 750 180 790 445 865
      C 675 925 865 920 1100 830
      C 1320 750 1490 765 1730 875
    `,
    width: 108,
    opacity: 0.70,
  },
] as const;



const AIR_CURRENTS = [
  {
    d: `
      M -180 245
      C 80 145 275 180 485 255
      C 700 330 865 315 1085 230
      C 1290 155 1450 175 1630 250
    `,
    width: 10,
    opacity: 0.96,
  },
  {
    d: `
      M -175 455
      C 90 345 280 380 500 455
      C 720 525 875 510 1100 420
      C 1305 345 1460 365 1640 435
    `,
    width: 8,
    opacity: 0.92,
  },
  {
    d: `
      M -165 665
      C 95 550 285 585 505 655
      C 725 725 885 705 1105 620
      C 1310 545 1465 565 1645 635
    `,
    width: 10,
    opacity: 0.88,
  },
  {
    d: `
      M -100 780
      C 130 690 300 715 500 775
      C 720 840 900 825 1100 750
    `,
    width: 6,
    opacity: 0.80,
  },
] as const;



const VORTEX = [
  {
    d: `
      M 250 500
      C 350 325 590 250 835 315
      C 1060 375 1180 535 1115 690
      C 1050 840 810 875 595 785
      C 420 710 360 555 455 445
      C 525 365 665 350 795 405
    `,
    width: 94,
    opacity: 0.64,
  },
  {
    d: `
      M 390 535
      C 480 405 650 350 805 400
      C 950 450 1015 555 975 660
      C 935 775 780 810 630 755
      C 505 710 455 600 520 515
      C 570 450 675 430 765 465
    `,
    width: 50,
    opacity: 0.90,
  },
  {
    d: `
      M 515 555
      C 560 490 655 460 745 490
      C 830 520 870 585 840 645
      C 810 710 720 735 640 700
      C 570 670 545 610 575 560
      C 605 520 675 505 720 525
    `,
    width: 21,
    opacity: 1,
  },
  {
    d: `
      M 625 555
      C 660 520 715 515 750 540
      C 785 560 790 595 765 620
      C 740 645 695 645 665 625
      C 640 605 642 575 665 555
    `,
    width: 9,
    opacity: 1,
  },
] as const;



const TRAILING_AIR = [
  {
    d: `
      M -120 330
      C 80 270 255 285 450 350
    `,
    width: 7,
    opacity: 0.88,
  },
  {
    d: `
      M 970 330
      C 1130 280 1280 300 1445 355
    `,
    width: 6,
    opacity: 0.84,
  },
  {
    d: `
      M -100 700
      C 110 630 285 650 465 710
    `,
    width: 6,
    opacity: 0.82,
  },
  {
    d: `
      M 995 690
      C 1160 635 1305 655 1460 715
    `,
    width: 7,
    opacity: 0.82,
  },
] as const;



export function LightTransition({
  active,
  direction,
  label,
  source,
}: LightTransitionProps) {
  const { content } = useLocale();
console.log(
  "🔥 LIGHT SSR/CLIENT",
  typeof window === "undefined" ? "SERVER" : "CLIENT",
);
  const forward =
    source === "navbar" || direction > 0;

  
  const enterX = forward ? "-115%" : "115%";
  const enterY = forward ? "-78%" : "78%";

  const leaveX = forward ? "115%" : "-115%";
  const leaveY = forward ? "78%" : "-78%";

  return (
    <motion.div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-[9990]
        overflow-hidden
      "
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
      }}
      transition={{
        duration: active ? 0.04 : 0.18,
        ease: "linear",
      }}
    >
     

      <motion.div
        className="
          absolute
          will-change-transform
        "
        style={{
          inset: "-32%",
        }}
        initial={{
          x: enterX,
          y: enterY,
          rotate: -6,
        }}
        animate={{
          x: active ? "0%" : leaveX,
          y: active ? "0%" : leaveY,
          rotate: -6,
        }}
        transition={{
          duration: active ? 0.82 : 0.58,
          ease: [0.72, 0, 0.28, 1],
        }}
      >
       

        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
          "
          style={{
            backgroundColor: WHITE,
          }}
        />

       

        <svg
          aria-hidden="true"
          className="
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >

          <g
            fill="none"
            stroke={WHITE}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {WIND_BANDS.map((wind, index) => (
              <path
                key={`wind-${index}`}
                d={wind.d}
                strokeWidth={wind.width}
                opacity={wind.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>


          <g
            fill="none"
            stroke={WHITE}
            strokeLinecap="round"
          >
            {AIR_CURRENTS.map((air, index) => (
              <path
                key={`air-${index}`}
                d={air.d}
                strokeWidth={air.width}
                opacity={air.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>


          <g
            fill="none"
            stroke={WHITE}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {VORTEX.map((vortex, index) => (
              <path
                key={`vortex-${index}`}
                d={vortex.d}
                strokeWidth={vortex.width}
                opacity={vortex.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>


          <g
            fill="none"
            stroke={WHITE}
            strokeLinecap="round"
          >
            {TRAILING_AIR.map((air, index) => (
              <path
                key={`trail-${index}`}
                d={air.d}
                strokeWidth={air.width}
                opacity={air.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        </svg>
      </motion.div>


      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
      >
        <motion.div
          className="
            relative
            z-20
            px-6
            text-center
          "
          initial={{
            opacity: 0,
            y: 56,
          }}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 56,
          }}
          transition={{
            delay: active ? 0.34 : 0,
            duration: active ? 0.46 : 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.4em]
            "
            style={{
              color: BLACK,
            }}
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: active ? 0.42 : 0,
              y: active ? 0 : 18,
            }}
            transition={{
              delay: active ? 0.38 : 0,
              duration: 0.30,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {content.transition.entering}
          </motion.p>

          <motion.h2
            className="
              mt-3
              text-5xl
              font-semibold
              tracking-[-0.04em]
              md:text-7xl
              lg:text-8xl
            "
            style={{
              color: BLACK,
            }}
            initial={{
              opacity: 0,
              y: 48,
            }}
            animate={{
              opacity: active ? 1 : 0,
              y: active ? 0 : 48,
            }}
            transition={{
              delay: active ? 0.42 : 0,
              duration: 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {label}
          </motion.h2>
        </motion.div>
      </div>
    </motion.div>
  );
}