import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { personalInfo, socialLinks } from "../data/data";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/50 py-12 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {personalInfo.name}
          </h3>
          <p className="text-xs font-mono-tech text-slate-500 dark:text-slate-400">
            {personalInfo.title}
          </p>
        </div>

        {/* Middle Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-full glass-panel text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-full glass-panel text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.email}
            aria-label="Email"
            className="p-2.5 rounded-full glass-panel text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right copyright & top button */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>© {new Date().getFullYear()} {personalInfo.name}. Built with React + TypeScript.</span>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-xl glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          </button>
        </div>
      </div>
    </footer>
  );
};
