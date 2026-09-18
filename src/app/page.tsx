import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Achievements } from "@/components/Achievements";
import { GitHubSectionLoader } from "@/components/GitHubSectionLoader";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Home",
  description: "Java Full Stack Developer building scalable web and mobile applications.",
};

export default function Home() {
  return (
    <main id="main" className="relative">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <GitHubSectionLoader />
      <Contact />
    </main>
  );
}