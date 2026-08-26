import Link from "next/link";

import { Container } from "@/components/layout/Container";

const projects = [
  {
    title: "Smart AI Fridge",
    description:
      "IoT-enabled smart refrigerator with computer vision for food recognition.",
    technologies: [
      "Python",
      "TensorFlow",
      "React",
      "Node.js",
    ],
  },
  {
    title: "Library Management System",
    description:
      "Full-stack library management platform using React and ASP.NET Core.",
    technologies: [
      "React",
      ".NET",
      "PostgreSQL",
    ],
  },
  {
    title: "Campsite E-Commerce",
    description:
      "Booking and e-commerce platform for campsite services.",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
    ],
  },
  {
    title: "Tic Tac Toe Web Game",
    description:
      "Browser-based Tic Tac Toe game with PHP server logic, session-based game state management, and real-time move updates.",
    technologies: [
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
    ],
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Projects
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Things I&apos;ve built.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="
                rounded-xl
                border
                p-7
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-foreground/20
              "
            >
              <h3 className="text-xl font-semibold">
                {project.title}
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-full
                        border
                        px-3
                        py-1
                        text-sm
                        text-muted-foreground
                      "
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-accent
            "
          >
            View More
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}