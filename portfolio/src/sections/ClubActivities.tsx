import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Sparkles } from "lucide-react";
import { clubActivities } from "../data/data";

export const ClubActivities: React.FC = () => {
  return (
    <section id="club-activities" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        {/* Technical Header with vibrant Electric Purple/Fuchsia kicker */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono-tech text-xs font-extrabold tracking-widest uppercase border border-purple-500/40 shadow-sm">
            COMMUNITY LEADERSHIP & INVOLVEMENT
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-purple-500/50 to-transparent" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Fostering Tech Leadership &{" "}
            <span className="block sm:inline bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent font-black uppercase">
              COMMUNITIES.
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">
            Mentoring junior coders, organizing developer bootcamps, and building campus technical community.
          </p>
        </div>

        {/* Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubActivities.map((club, idx) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card bg-white dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-violet-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-violet-600/10 text-violet-700 dark:text-purple-300">
                    <Users className="w-5 h-5" />
                  </div>
                  {club.date && (
                    <span className="text-[10px] font-mono-tech text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bold">
                      <Calendar className="w-3 h-3" />
                      {club.date}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {club.title}
                </h3>

                <p className="text-xs font-mono-tech text-slate-600 dark:text-slate-400 mt-1 font-semibold">
                  {club.organization}
                </p>

                {club.role && (
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono-tech text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                    {club.role}
                  </span>
                )}

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed font-medium">
                  {club.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-1 text-[11px] font-mono-tech text-slate-500 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Active Leadership Role</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
