import React from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Cpu, Award } from "lucide-react";
import { personalInfo } from "../data/data";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        {/* Technical Header with vibrant Emerald/Teal kicker */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono-tech text-xs font-extrabold tracking-widest uppercase border border-emerald-500/40 shadow-sm">
            ENGINEERING PHILOSOPHY & IMPACT
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-emerald-500/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Engineering with Curiosity, Precision, and{" "}
              <span className="block sm:inline bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent font-black uppercase">
                REAL-WORLD IMPACT.
              </span>
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {personalInfo.extendedBio.map((paragraph, index) => (
                <p key={index} className="glass-card bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {personalInfo.stats.map((stat, i) => {
              const icons = [Code, Cpu, Award, Terminal];
              const IconComp = icons[i % icons.length];

              return (
                <div
                  key={stat.label}
                  className="glass-card bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:scale-[1.03] hover:border-blue-500/50 transition-transform duration-200 group shadow-sm hover:shadow-md"
                >
                  <div className="p-3 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white font-mono-tech tracking-tight">
                      {stat.value}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
