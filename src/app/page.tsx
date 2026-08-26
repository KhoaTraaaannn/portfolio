import { Hero } from "@/components/hero/Hero";
import { LayerScroll } from "@/components/animations/LayerScroll";

import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";

import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <LayerScroll>
      <Hero />

      <About />

      <Skills />

      <Projects />

      <Experience />

      <Timeline />

      <Contact />

    </LayerScroll>
  );
}