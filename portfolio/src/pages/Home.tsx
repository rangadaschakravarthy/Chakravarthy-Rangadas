import React, { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { Navbar } from "../components/Navbar";
import { ScrollProgress } from "../components/ScrollProgress";
import { CustomCursor } from "../components/CustomCursor";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { EducationTree } from "../sections/EducationTree";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { Achievements } from "../sections/Achievements";
import { Certifications } from "../sections/Certifications";
import { ClubActivities } from "../sections/ClubActivities";
import { Contact } from "../sections/Contact";
import { Footer } from "../components/Footer";
import { AlanAssistant } from "../components/AlanAssistant";

export const Home: React.FC = () => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "education",
      "skills",
      "projects",
      "achievements",
      "certifications",
      "club-activities",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleAlanThemeToggle = (newTheme?: "light" | "dark") => {
    if (newTheme) {
      setTheme(newTheme);
    } else {
      toggleTheme();
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <ScrollProgress />
      <CustomCursor />
      <Navbar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

      <main className="relative z-10">
        <Hero />
        <About />
        <EducationTree />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <ClubActivities />
        <Contact />
      </main>

      <Footer />
      <AlanAssistant onNavigate={handleNavigate} onThemeToggle={handleAlanThemeToggle} />
    </div>
  );
};
