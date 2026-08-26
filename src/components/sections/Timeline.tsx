import { Container } from "@/components/layout/Container";

export function Timeline() {
  const timeline = [
    {
      year: "2022",
      title: "Started Computer Science",
      company: "Ho Chi Minh City University of Technology",
    },
    {
      year: "2025",
      title: "Software Developer Intern",
      company: "SHPT Software",
    },
    {
      year: "2025",
      title: "Published AI Fridge Research",
      company: "arXiv",
    },
  ];

  return (
    <section id="timeline" className="py-24">
      <Container>
        <h2 className="text-4xl font-bold">Timeline</h2>

        <div className="mt-8 space-y-6">
          {timeline.map((item) => (
            <div key={`${item.year}-${item.title}`} className="border-l-2 pl-6">
              <p className="text-sm text-muted-foreground">{item.year}</p>

              <h3 className="text-xl font-semibold">{item.title}</h3>

              <p className="text-muted-foreground">{item.company}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}