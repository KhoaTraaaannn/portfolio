import { Container } from "@/components/layout/Container";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "ASP.NET Core",
  "PostgreSQL",
  "Docker",
  "Figma",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Skills
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Technologies I work with.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border px-4 py-2 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}