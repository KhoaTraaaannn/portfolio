"use client";

import {
  useEffect,
  type MouseEvent,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

type ResumeViewerProps = {
  open: boolean;
  onClose: () => void;
};

const RESUME_PDF ="/api/resume?v=2";

export function ResumeViewer({
  open,
  onClose,
}: ResumeViewerProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
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
  }, [open, onClose]);
  const handleContentClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-black/90
            p-4
            backdrop-blur-md
            md:p-8
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
            ease: "easeOut",
          }}
          onClick={onClose}
        >
          <motion.div
            className="
              relative
              flex
              h-[calc(100vh-2rem)]
              w-full
              max-w-6xl
              flex-col
              overflow-hidden
              rounded-xl
              border
              border-white/10
              bg-[#0a0a0a]
              shadow-2xl
              md:h-[calc(100vh-4rem)]
            "
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onClick={handleContentClick}
          >
            <div
              className="
                flex
                h-14
                shrink-0
                items-center
                justify-between
                border-b
                border-white/10
                px-4
              "
            >
              <span
                className="
                  text-sm
                  font-medium
                  text-white
                "
              >
                Resume
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    rounded-md
                    border
                    border-white/10
                    px-3
                    py-1.5
                    text-xs
                    text-white/70
                    transition-colors
                    hover:border-white/20
                    hover:text-white
                  "
                >
                  Open PDF
                </a>

                <a
                  href={RESUME_PDF}
                  download="resume.pdf"
                  className="
                    rounded-md
                    bg-white
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-black
                    transition-opacity
                    hover:opacity-90
                  "
                >
                  Download
                </a>

                <button
                  type="button"
                  aria-label="Close resume"
                  onClick={onClose}
                  className="
                    ml-1
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-md
                    text-white/60
                    transition-colors
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      text-lg
                      leading-none
                    "
                  >
                    ×
                  </span>
                </button>
              </div>
            </div>

            <div
              className="
                min-h-0
                flex-1
                overflow-hidden
                bg-[#181818]
              "
            >
              <iframe
                src={RESUME_PDF}
                title="Resume PDF"
                className="
                  h-full
                  w-full
                  border-0
                "
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}