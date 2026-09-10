import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(37,99,235,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
