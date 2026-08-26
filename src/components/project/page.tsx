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
    github:
      "https://github.com/DaauShen/SmartAIFridge",
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
    github:
      "https://github.com/karuufumi/Software-Project-Management-CO3011-",
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
    github:
      "https://github.com/DankoFox/campgear-rental",
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
  github:
    "https://github.com/KhoaTraaaannn/TicTacToe",
},
];

export function ProjectsPage() {
  return (
    <main className="min-h-screen py-24 md:py-32">
      <Container>
        <div className="mb-16">
          <Link
            href="/"
            className="
              text-sm
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            ← Back to portfolio
          </Link>

          <p className="mt-12 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Projects
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">
            All Projects.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            A collection of projects I&apos;ve worked on,
            from full-stack applications to AI and
            computer vision systems.
          </p>
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
                p-8
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-foreground/20
              "
            >
              <h2 className="text-2xl font-semibold">
                {project.title}
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
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

              <div className="mt-8">
                {project.github ? (
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
                    View project
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
                ) : (
                  <span
                    className="
                      text-sm
                      text-muted-foreground/50
                    "
                  >
                    Repository unavailable
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}