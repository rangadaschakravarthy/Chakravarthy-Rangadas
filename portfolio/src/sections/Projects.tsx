import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, ChevronLeft, X, Layers, CheckCircle, Lightbulb, Sparkles } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";
import { projects } from "../data/data";
import type { ProjectItem } from "../types/types";

// Helper function to calculate circular offset relative to active slideIndex
const getOffset = (index: number, activeIndex: number, total: number) => {
  if (total <= 1) return 0;
  let diff = index - activeIndex;
  const half = Math.floor(total / 2);
  while (diff > half) diff -= total;
  while (diff < -half) diff += total;
  return diff;
};

export const Projects: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedTech, setSelectedTech] = useState<string>("ALL");
  const [expandedProject, setExpandedProject] = useState<ProjectItem | null>(null);

  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Extract all unique tech stack pills for secondary filter
  const allTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.techUsed.forEach((t) => techSet.add(t)));
    return ["ALL", ...Array.from(techSet)];
  }, []);

  // Filter projects by Domain & Tech
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchDomain =
        selectedDomain === "ALL" ||
        p.domain.toUpperCase() === selectedDomain.toUpperCase() ||
        p.categories.some((c) => c.toUpperCase() === selectedDomain.toUpperCase());

      const matchTech =
        selectedTech === "ALL" || p.techUsed.includes(selectedTech);

      return matchDomain && matchTech;
    });
  }, [selectedDomain, selectedTech]);

  const carouselList = useMemo(() => {
    return filteredProjects.length > 0 ? filteredProjects : projects;
  }, [filteredProjects]);

  const totalProjects = carouselList.length;

  // Reset slideIndex if list changes or index goes out of range
  useEffect(() => {
    if (slideIndex >= totalProjects) {
      setSlideIndex(0);
    }
  }, [totalProjects, slideIndex]);

  // Auto-play sliding right-to-left every 5 seconds after delay
  useEffect(() => {
    if (isPaused || totalProjects <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % totalProjects);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, totalProjects]);

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % totalProjects);
  };

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col gap-12">
        {/* Technical Header with vibrant Violet/Fuchsia kicker */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-violet-500/20 text-violet-800 dark:text-violet-300 font-mono-tech text-xs font-extrabold tracking-widest uppercase border border-violet-500/40 shadow-sm">
            ENGINEERED SYSTEMS & FEATURED BUILDS
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-violet-500/50 to-transparent" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Real Software Engineered to{" "}
            <span className="block sm:inline bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent font-black uppercase">
              SHIP & SCALE.
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">
            AI agents, full-stack web platforms, data analysis models, and responsive web systems.
          </p>
        </div>

        {/* 3D Stage Carousel Section (Right-to-Left Slide & Exit) */}
        <div
          className="relative max-w-5xl mx-auto w-full h-[450px] sm:h-[430px] flex items-center justify-center py-4 px-2 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left / Right Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-2 sm:left-4 z-40 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next project"
            className="absolute right-2 sm:right-4 z-40 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          </button>

          {/* 3D Stage Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {carouselList.map((project, index) => {
              const offset = getOffset(index, slideIndex, totalProjects);
              const isCenter = offset === 0;

              let targetX = "0%";
              let targetScale = 1;
              let targetOpacity = 1;
              let targetZIndex = 30;
              let targetBlur = "blur(0px)";

              if (offset === 1) {
                targetX = "55%";
                targetScale = 0.84;
                targetOpacity = 0.55;
                targetZIndex = 10;
                targetBlur = "blur(1px)";
              } else if (offset === -1) {
                targetX = "-55%";
                targetScale = 0.84;
                targetOpacity = 0.55;
                targetZIndex = 10;
                targetBlur = "blur(1px)";
              } else if (offset > 1) {
                targetX = "120%";
                targetScale = 0.65;
                targetOpacity = 0;
                targetZIndex = 0;
                targetBlur = "blur(4px)";
              } else if (offset < -1) {
                targetX = "-120%";
                targetScale = 0.65;
                targetOpacity = 0;
                targetZIndex = 0;
                targetBlur = "blur(4px)";
              }

              return (
                <motion.div
                  key={project.id}
                  initial={false}
                  animate={{
                    x: targetX,
                    scale: targetScale,
                    opacity: targetOpacity,
                    zIndex: targetZIndex,
                    filter: targetBlur,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 25,
                    mass: 0.9,
                  }}
                  onClick={() => {
                    if (!isCenter) setSlideIndex(index);
                  }}
                  className={`absolute w-[92%] sm:w-[580px] h-[370px] sm:h-[390px] rounded-3xl glass-card bg-white dark:bg-slate-900 border ${
                    isCenter
                      ? "border-blue-500/40 dark:border-cyan-500/40 shadow-2xl"
                      : "border-slate-300/80 dark:border-slate-800 shadow-md cursor-pointer hover:border-blue-400/60 hover:opacity-80"
                  } p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 select-none`}
                >
                  {isCenter ? (
                    /* Active Center Card View */
                    <>
                      <div>
                        {/* Badge Header */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-600/20 text-blue-700 dark:text-cyan-400 text-xs font-mono-tech font-bold border border-blue-500/20">
                            {project.badge} • PROJECT {index + 1} OF {totalProjects}
                          </span>
                          <span className="text-xs font-mono-tech text-slate-600 dark:text-slate-400 font-bold">
                            {project.domain}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                          {project.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed line-clamp-3 font-medium">
                          {project.description}
                        </p>

                        {/* Tech Pills */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.techUsed.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono-tech text-slate-800 dark:text-cyan-300 border border-slate-200 dark:border-slate-700 font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom CTAs & Pagination Dots */}
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedProject(project);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/25 cursor-pointer"
                          >
                            <span>Explore Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:text-blue-600"
                              title="GitHub Repository"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:text-blue-600"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex items-center gap-1.5">
                          {carouselList.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSlideIndex(i);
                              }}
                              aria-label={`Go to project ${i + 1}`}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                i === slideIndex ? "w-6 bg-blue-600 dark:bg-cyan-400" : "w-2 bg-slate-300 dark:bg-slate-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Side Preview Card View */
                    <div className="h-full flex flex-col justify-between pointer-events-none">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono-tech font-bold">
                            {project.badge}
                          </span>
                          <span className="text-[10px] font-mono-tech text-slate-500 dark:text-slate-400">
                            {project.domain}
                          </span>
                        </div>
                        <h4 className="text-lg font-extrabold text-slate-800 dark:text-slate-200 line-clamp-2">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 font-medium">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-mono-tech font-bold text-blue-600 dark:text-cyan-400">
                        <span>{offset === 1 ? "Next Project →" : "← Previous Project"}</span>
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dual Filter Controls */}
        <div className="flex flex-col gap-4 mt-2">
          {/* Domain Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <span className="text-xs font-mono-tech text-slate-600 dark:text-slate-400 uppercase tracking-wider mr-2 font-bold">
              Domain:
            </span>
            {["ALL", "AI", "DATA ANALYSIS", "FULL STACK", "WEB DEVELOPMENT"].map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-tech transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedDomain === domain
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                    : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white shadow-sm"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Secondary Tech Stack Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            <span className="text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 uppercase tracking-wider mr-2 font-bold">
              Tech Filter:
            </span>
            {allTechStacks.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono-tech transition-all cursor-pointer ${
                  selectedTech === tech
                    ? "bg-violet-600 text-white font-bold"
                    : "bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card bg-white dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-blue-600/10 dark:bg-blue-600/20 text-blue-700 dark:text-cyan-400 text-[10px] font-mono-tech font-bold border border-blue-500/20">
                      {project.badge}
                    </span>
                    <span className="text-[10px] font-mono-tech text-slate-600 dark:text-slate-400 font-bold">
                      {project.domain}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed line-clamp-3 font-medium">
                    {project.description}
                  </p>

                  {/* Tech preview pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techUsed.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono-tech text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techUsed.length > 4 && (
                      <span className="text-[10px] font-mono-tech text-slate-500 dark:text-slate-400 px-1 py-0.5 font-bold">
                        +{project.techUsed.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedProject(project)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Expanded Project Details Modal */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setExpandedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-blue-500/40 shadow-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setExpandedProject(null)}
                aria-label="Close Project Details"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-600/20 text-blue-700 dark:text-cyan-400 text-xs font-mono-tech font-bold border border-blue-500/30">
                  {expandedProject.badge}
                </span>
                <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 font-bold">
                  {expandedProject.domain}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {expandedProject.title}
              </h2>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {expandedProject.subtitle}
              </p>

              <div className="mt-6 space-y-6">
                {/* What I Built */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
                  <h4 className="text-xs font-mono-tech font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    What I Built
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {expandedProject.whatIBuilt}
                  </p>
                </div>

                {/* How I Solved It */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
                  <h4 className="text-xs font-mono-tech font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    How I Solved It
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {expandedProject.howISolvedIt}
                  </p>
                </div>

                {/* Tech Used */}
                <div>
                  <h4 className="text-xs font-mono-tech font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Tech Stack & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {expandedProject.techUsed.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-blue-900/40 text-slate-800 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30 text-xs font-mono-tech font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30">
                  <h4 className="text-xs font-mono-tech font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Engineering Outcome & Impact
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 font-medium">
                    {expandedProject.result}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
                {expandedProject.github && (
                  <a
                    href={expandedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub Repo</span>
                  </a>
                )}
                {expandedProject.liveDemo && (
                  <a
                    href={expandedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-500/25"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
