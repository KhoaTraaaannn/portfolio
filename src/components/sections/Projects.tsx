"use client";

import { Container } from "@/components/layout/Container";
import { useLocale } from "@/hooks/useLocale";

const projects = [
  {
    title: "Smart AI Fridge",
    descriptionKey: "smartAiFridge",
    technologies: ["Python", "TensorFlow", "React", "Node.js"],
    github: "https://github.com/DaauShen/SmartAIFridge",
  },
  {
    title: "Library Management System",
    descriptionKey: "libraryManagement",
    technologies: ["React", ".NET", "PostgreSQL"],
    github:
      "https://github.com/karuufumi/Software-Project-Management-CO3011-",
  },
  {
    title: "Campsite E-Commerce",
    descriptionKey: "campsiteEcommerce",
    technologies: ["TypeScript", "React", "Node.js"],
    github: "https://github.com/DankoFox/campgear-rental",
  },
  {
    title: "Tic Tac Toe Web Game",
    descriptionKey: "ticTacToe",
    technologies: ["PHP", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/KhoaTraaaannn/TicTacToe",
  },
] as const;

export function Projects() {
  const { content } = useLocale();

  return (
    <section
      id="projects"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {content.projects.label}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {content.projects.title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="
                group
                flex
                flex-col
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
                {content.projects.descriptions[project.descriptionKey]}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
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
                ))}
              </div>

              <div className="mt-auto pt-8">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    transition-colors
                    hover:text-muted-foreground
                  "
                >
                  {content.projects.viewProject}

                  <span
                    aria-hidden="true"
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}