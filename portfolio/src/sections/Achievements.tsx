import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Users, Flame, Calendar } from "lucide-react";
import { achievements } from "../data/data";

export const Achievements: React.FC = () => {
  const getIcon = (name?: string) => {
    switch (name) {
      case "Trophy":
        return Trophy;
      case "Award":
        return Award;
      case "Users":
        return Users;
      case "Flame":
        return Flame;
      default:
        return Trophy;
    }
  };

  return (
    <section id="achievements" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        {/* Technical Header with vibrant Electric Cyan / Sky Blue kicker */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-mono-tech text-xs font-extrabold tracking-widest uppercase border border-cyan-500/40 shadow-sm">
            HACKATHON WINS & HONORS
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Recognized for Engineering{" "}
            <span className="block sm:inline bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 bg-clip-text text-transparent font-black uppercase">
              EXCELLENCE & WINS.
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">
            Competitive programming awards, hackathon victories, and technical leadership honors.
          </p>
        </div>

        {/* Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach, idx) => {
            const IconComp = getIcon(ach.iconName);

            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card bg-white dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-cyan-500/60 hover:shadow-2xl transition-all duration-300 flex items-start gap-5 group shadow-sm"
              >
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform shrink-0">
                  <IconComp className="w-7 h-7" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    {/* Neutral, non-colored text for organization label */}
                    <span className="text-xs font-mono-tech font-semibold text-slate-600 dark:text-slate-400">
                      {ach.organization}
                    </span>
                    {ach.date && (
                      <span className="text-[10px] font-mono-tech text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bold">
                        <Calendar className="w-3 h-3" />
                        {ach.date}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {ach.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-medium">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
