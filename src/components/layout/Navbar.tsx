"use client";

import { useState } from "react";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

import { ResumeViewer } from "@/components/resume/ResumeViewer";

const navigation = [
  {
    label: "About",
    targetId: "about",
  },
  {
    label: "Skills",
    targetId: "skills",
  },
  {
    label: "Projects",
    targetId: "projects",
  },
  {
    label: "Experience",
    targetId: "experience",
  },
  {
    label: "Timeline",
    targetId: "timeline",
  },
  {
    label: "Contact",
    targetId: "contact",
  },
];

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
                  navigateToLayer(item.targetId)
                }
                className="
                  text-sm
                  text-muted-foreground
                  transition-colors
                  hover:text-foreground
                "
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
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
              Resume
            </button>
          </div>
        </Container>
      </header>

      <ResumeViewer
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </>
  );
}