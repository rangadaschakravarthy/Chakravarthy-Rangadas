import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import type { Theme } from "../hooks/useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="relative p-2.5 rounded-full glass-panel text-slate-800 dark:text-slate-100 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm cursor-pointer"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "backOut" }}
        className="relative w-5 h-5 flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Moon className="w-5 h-5 text-cyan-400" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
};
