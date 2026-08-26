import { Container } from "@/components/layout/Container";

export function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              About
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Trần Nguyễn Anh Khoa
            </h2>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <p>
              I am a frontend engineer passionate about creating performant,
              accessible, and visually engaging web applications.
            </p>

            <p>
              I enjoy crafting user interfaces that balance clean design,
              thoughtful interactions, and scalable architecture.
            </p>

            <p>
              My focus is building products that not only look great but also
              provide an exceptional user experience.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}