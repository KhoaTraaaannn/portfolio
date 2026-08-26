export const JOURNEY_SECTIONS = [
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

export type JourneySectionId =
  (typeof JOURNEY_SECTIONS)[number]["id"];

export const JOURNEY_SECTION_COUNT =
  JOURNEY_SECTIONS.length;