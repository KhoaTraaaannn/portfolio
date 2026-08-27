"use client";

import { useState } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { ResumeViewer } from "@/components/resume/ResumeViewer";
import { useLocale } from "@/hooks/useLocale";

const navigation = [
  {
    key: "about",
    targetId: "about",
  },
  {
    key: "skills",
    targetId: "skills",
  },
  {
    key: "projects",
    targetId: "projects",
  },
  {
    key: "experience",
    targetId: "experience",
  },
  {
    key: "timeline",
    targetId: "timeline",
  },
  {
    key: "contact",
    targetId: "contact",
  },
] as const;

function navigateToLayer(targetId: string) {
  window.dispatchEvent(
    new CustomEvent("portfolio:navigate", {
      detail: targetId,
    }),
  );
}

export function Navbar() {
  const [resumeOpen, setResumeOpen] =
    useState(false);

  const {
    locale,
    setLocale,
    content,
  } = useLocale();

  const toggleLocale = () => {
    setLocale(
      locale === "vi" ? "en" : "vi",
    );
  };

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          border-b
          bg-background/80
          backdrop-blur-md
        "
      >
        <Container
          className="
            flex
            h-16
            items-center
            justify-between
          "
        >
          {/* Brand */}
          <Link
            href="/"
            className="
              text-lg
              font-semibold
              tracking-tight
            "
          >
            {siteConfig.name}
          </Link>

          {/* Navigation */}
          <nav
            aria-label="Main navigation"
            className="
              hidden
              items-center
              gap-8
              md:flex
            "
          >
            {navigation.map((item) => (
              <button
                key={item.targetId}
                type="button"
                onClick={() =>
                  navigateToLayer(
                    item.targetId,
                  )
                }
                className="
                  text-sm
                  text-muted-foreground
                  transition-colors
                  hover:text-foreground
                "
              >
                {content.nav[item.key]}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {/* Language */}
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={
                locale === "vi"
                  ? content.language.english
                  : content.language.vietnamese
              }
              className="
                inline-flex
                h-9
                min-w-9
                items-center
                justify-center
                rounded-md
                border
                px-2.5
                text-xs
                font-medium
                uppercase
                tracking-wide
                transition-colors
                hover:bg-accent
              "
            >
              {locale === "vi"
                ? "EN"
                : "VI"}
            </button>

            {/* Resume */}
            <button
              type="button"
              onClick={() =>
                setResumeOpen(true)
              }
              className="
                rounded-md
                bg-foreground
                px-4
                py-2
                text-sm
                font-medium
                text-background
                transition-opacity
                hover:opacity-90
              "
            >
              {content.nav.resume}
            </button>
          </div>
        </Container>
      </header>

      <ResumeViewer
        open={resumeOpen}
        onClose={() =>
          setResumeOpen(false)
        }
      />
    </>
  );
}