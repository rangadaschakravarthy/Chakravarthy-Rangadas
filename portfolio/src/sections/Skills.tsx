import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ShieldCheck, X, Sparkles } from "lucide-react";
import { skills as initialSkills } from "../data/data";
import type { SkillItem } from "../types/types";

export const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const getTierBadge = (level: SkillItem["level"]) => {
    switch (level) {
      case "Primary":
        return { label: "STRONGHOLD TIER", color: "bg-blue-600/10 text-blue-700 dark:text-cyan-400 border-blue-500/30" };
      case "Strong":
        return { label: "STRONG TIER", color: "bg-violet-600/10 text-violet-700 dark:text-purple-300 border-violet-500/30" };
      case "Working Knowledge":
        return { label: "WORKING KNOWLEDGE", color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30" };
    }
  };

  return (
    <section id="skills" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        {/* Technical Header with vibrant Cyan/Blue kicker */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-mono-tech text-xs font-extrabold tracking-widest uppercase border border-cyan-500/40 shadow-sm">
            TECHNICAL STACK & CORE COMPETENCIES
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center justify-center gap-2 flex-wrap">
            <span>Comprehensive Engineering</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-black uppercase">
              TECH TOOLKIT.
            </span>
            <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">
            Hover to view techstack name and full color logo. Click any icon to view skill metrics.
          </p>
        </div>

        {/* 6 columns x 3 rows Grid displaying ONLY LOGOS initially */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {initialSkills.map((skill) => {
            const isHovered = hoveredSkillId === skill.id;

            return (
              <div
                key={skill.id}
                className="relative flex flex-col items-center justify-center"
                onMouseEnter={() => setHoveredSkillId(skill.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
              >
                {/* Floating Tooltip Text on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-12 z-30 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-950 text-white shadow-xl border border-blue-500/40 text-center pointer-events-none whitespace-nowrap"
                    >
                      <span className="font-bold text-xs block text-cyan-300">{skill.name}</span>
                      <span className="text-[9px] font-mono-tech text-slate-400 uppercase">{skill.category}</span>
                      {/* Tooltip arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-blue-500/40" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Skill Logo Box */}
                <button
                  onClick={() => setSelectedSkill(skill)}
                  className="w-24 h-24 rounded-2xl glass-card bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex items-center justify-center p-4 cursor-pointer group shadow-sm hover:scale-110 active:scale-95"
                >
                  <img
                    src={skill.logoUrl}
                    alt={skill.name}
                    className={`w-12 h-12 object-contain transition-all duration-300 ${
                      isHovered
                        ? "filter-none opacity-100 scale-110"
                        : "filter grayscale opacity-70 group-hover:filter-none group-hover:opacity-100"
                    }`}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Small Skill Details Modal Popup */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card bg-white dark:bg-slate-900 rounded-3xl p-6 border border-blue-500/40 shadow-2xl max-w-md w-full relative text-slate-900 dark:text-white"
            >
              <button
                onClick={() => setSelectedSkill(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-inner">
                  <img src={selectedSkill.logoUrl} alt={selectedSkill.name} className="w-9 h-9 object-contain" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedSkill.name}
                  </h3>
                  <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    Category: {selectedSkill.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {(() => {
                  const tier = getTierBadge(selectedSkill.level);
                  return (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className={`text-xs font-mono-tech font-extrabold px-3 py-1 rounded-md border ${tier.color}`}>
                        {tier.label}
                      </span>
                      <span className="text-[10px] font-mono-tech text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" />
                        VERIFIED
                      </span>
                    </div>
                  );
                })()}

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedSkill.description}
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-[11px] font-mono-tech text-slate-500 dark:text-slate-400 font-semibold">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>PRODUCTION COMPETENCY VERIFIED</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
