import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Mail, Sparkles, Code2, Database, Brain, Terminal, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/SocialIcons";
import { personalInfo, socialLinks } from "../data/data";

const KINETIC_WORDS = ["BUILD.", "SOLVE.", "LEARN.", "SHIP."];

export const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % KINETIC_WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle Liquid Gradient Atmospheric Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-ring" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-ring" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Identity & Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Technical Section Tag without numbers */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-400 text-xs font-mono-tech font-bold border border-blue-500/20 flex items-center gap-1.5 glitch-text shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              {personalInfo.availability}
            </span>
            <span className="text-xs font-mono-tech text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
              SOFTWARE ENGINEERING & AI PORTFOLIO
            </span>
          </div>

          {/* Kinetic Animated Heading */}
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Software Engineer to{" "}
              <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={KINETIC_WORDS[wordIndex]}
                    initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute left-0 top-0 bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent"
                  >
                    {KINETIC_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mt-2 font-semibold">
              {personalInfo.title}
            </p>
          </div>

          {/* Short Introduction */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-medium">
            {personalInfo.bio}
          </p>

          {/* Hiring Manager Quick View Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 uppercase tracking-wider w-full mb-1 flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              ENGINEERING PROFILE QUICK-VIEW:
            </span>
            {[
              { label: "Full Stack Development", icon: Code2, sec: "skills" },
              { label: "AI Applications", icon: Brain, sec: "projects" },
              { label: "Data Analysis", icon: Database, sec: "projects" },
              { label: "Problem Solving", icon: ShieldCheck, sec: "education" }
            ].map((tag) => {
              const IconComp = tag.icon;
              return (
                <button
                  key={tag.label}
                  onClick={() => scrollTo(tag.sec)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass-panel text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-cyan-400 transition-all cursor-pointer shadow-sm hover:scale-105"
                >
                  <IconComp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => scrollTo("projects")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {personalInfo.resumeUrl && (
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-200 active:scale-95 shadow-sm"
              >
                <FileText className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>View Resume</span>
              </a>
            )}

            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 font-bold text-sm text-slate-800 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-all cursor-pointer shadow-sm"
            >
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-mono-tech text-slate-600 dark:text-slate-400 font-bold">CONNECT:</span>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl glass-panel bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl glass-panel bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.email}
              aria-label="Email Me"
              className="p-2.5 rounded-xl glass-panel bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Circular Photograph Frame & Technical Orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative py-6"
        >
          {/* Rotating Technical Accent Ring */}
          <div className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-blue-500/30 dark:border-cyan-500/30 animate-orbit pointer-events-none" />

          {/* Circular Photo Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1.5 bg-gradient-to-tr from-blue-600 via-violet-600 to-cyan-400 shadow-2xl shadow-blue-500/20 glow-border">
            <div className="w-full h-full rounded-full bg-slate-900 dark:bg-slate-950 overflow-hidden relative flex flex-col items-center justify-center border-4 border-white dark:border-slate-950">

              {/* Professional Developer SVG Graphic with dynamic light/dark gradient */}
              <div className="w-full h-full bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 dark:from-slate-800 dark:to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-blue-600/10 dark:bg-blue-600/20 border-2 border-blue-500/30 dark:border-cyan-400/50 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-2 shadow-inner">
                  <Terminal className="w-12 h-12" />
                </div>
                <span className="font-mono-tech font-bold text-sm text-slate-900 dark:text-cyan-300">
                  {personalInfo.name}
                </span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono-tech font-semibold">
                  ANURAG UNIV • CGPA 9.26
                </span>
              </div>

              <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
            </div>

            {/* Floating Technical Labels Orbit */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-[10px] font-mono-tech font-bold text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-cyan-400/40 shadow-md">
              FULL STACK
            </div>

            <div className="absolute top-1/4 -right-6 px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-[10px] font-mono-tech font-bold text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-purple-400/40 shadow-md">
              AI / LLM
            </div>

            <div className="absolute bottom-1/4 -left-6 px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-[10px] font-mono-tech font-bold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-blue-400/40 shadow-md">
              PYTHON & JAVA
            </div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-[10px] font-mono-tech font-bold text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-emerald-400/40 shadow-md">
              DATA ANALYSIS
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
