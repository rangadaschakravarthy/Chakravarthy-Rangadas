import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, CheckCircle2, GitCommit } from "lucide-react";
import { education } from "../data/data";

export const EducationTree: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        {/* Technical Header with vibrant Indigo/Purple kicker */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 font-mono-tech text-xs font-extrabold tracking-widest uppercase border border-indigo-500/40 shadow-sm">
            ACADEMIC FOUNDATION & DEGREES
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Solid Computer Science{" "}
            <span className="block sm:inline bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-black uppercase">
              ACADEMIC FOUNDATION.
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">
            Structured evolutionary progression from secondary honors to computer science degree.
          </p>
        </div>

        {/* Tree Timeline Grid Container */}
        <div className="relative mt-8">
          {/* Central Trunk Line (Growing SVG branch) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-violet-600 to-cyan-400 -translate-x-1/2 rounded-full" />

          <div className="flex flex-col gap-12">
            {education.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Card Content Side */}
                  <div className="w-full md:w-1/2 p-4">
                    <div className="glass-card bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 shadow-md hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 dark:text-cyan-400 text-xs font-mono-tech font-bold border border-blue-500/20 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.year}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-violet-600/10 text-violet-700 dark:text-purple-300 text-xs font-mono-tech font-extrabold border border-violet-500/20">
                          {item.score}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {item.degree}
                      </h3>

                      <p className="text-xs font-mono-tech text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1 font-semibold">
                        <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                        {item.institution}
                      </p>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed font-medium">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-1.5">
                        {item.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central Node Circle */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-600 text-blue-600 dark:text-cyan-400 items-center justify-center shadow-lg z-10">
                    <GitCommit className="w-5 h-5" />
                  </div>

                  {/* Spacer Side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
