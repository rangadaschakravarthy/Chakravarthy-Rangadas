import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, Calendar } from "lucide-react";
import { certifications } from "../data/data";

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        {/* Technical Header with vibrant Teal/Emerald kicker */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-800 dark:text-teal-300 font-mono-tech text-xs font-extrabold tracking-widest uppercase border border-teal-500/40 shadow-sm">
            VERIFIED CERTIFICATIONS & CREDENTIALS
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-teal-500/50 to-transparent" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Verified Qualifications & Industry{" "}
            <span className="block sm:inline bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 bg-clip-text text-transparent font-black uppercase">
              CREDENTIALS.
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">
            Rigorous certifications in Cloud, Java, Generative AI, Frontend, and Database Engineering.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card bg-white dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600 dark:text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  {cert.year && (
                    <span className="text-[10px] font-mono-tech text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bold">
                      <Calendar className="w-3 h-3" />
                      {cert.year}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </h3>

                <p className="text-xs font-mono-tech text-blue-700 dark:text-cyan-400 mt-1 font-bold">
                  {cert.issuer}
                </p>

                {cert.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-medium">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Conditional Credential Link */}
              {cert.credentialUrl && (
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verify Credential</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
