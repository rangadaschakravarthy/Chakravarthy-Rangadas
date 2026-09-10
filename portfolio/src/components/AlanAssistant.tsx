import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, Send, X, Sparkles, Volume2, Loader2, Navigation, Moon, Shield, Power } from "lucide-react";
import { useAlan } from "../hooks/useAlan";

interface AlanAssistantProps {
  onNavigate: (sectionId: string) => void;
  onThemeToggle: (theme?: "light" | "dark") => void;
}

export const AlanAssistant: React.FC<AlanAssistantProps> = ({ onNavigate, onThemeToggle }) => {
  const {
    isOpen,
    setIsOpen,
    isAwake,
    state,
    messages,
    transcriptText,
    sendMessage,
    toggleMic
  } = useAlan({ onNavigate, onThemeToggle });

  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handlePromptClick = (promptText: string) => {
    sendMessage(promptText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Icon */}
      {!isOpen && (
        <motion.button
          onClick={() => {
            setIsOpen(true);
            if (!isAwake) {
              sendMessage("Hi Alan");
            }
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-slate-900/95 text-white shadow-2xl border border-blue-500/40 cursor-pointer backdrop-blur-xl"
        >
          {/* Animated Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-400 opacity-60 blur-md group-hover:opacity-100 transition-opacity -z-10 animate-pulse-ring" />

          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/30 border border-cyan-400/50">
            <Bot className="w-5 h-5 text-cyan-400" />
            {isAwake ? (
              <>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-ping" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
              </>
            ) : (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-slate-900" />
            )}
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs tracking-wider text-cyan-300 font-mono-tech">
                ALAN
              </span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono-tech font-extrabold border ${
                isAwake 
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" 
                  : "bg-amber-500/20 text-amber-300 border-amber-500/40"
              }`}>
                {isAwake ? 'Say "Thanks Alan"' : 'Say "Hi Alan"'}
              </span>
            </div>
            <span className="text-[10px] text-slate-300 font-medium">
              {isAwake ? "AI Portfolio Active" : "AI Portfolio Assistant"}
            </span>
          </div>
        </motion.button>
      )}

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[90vw] sm:w-[380px] h-[520px] glass-panel rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-blue-500/30 dark:border-cyan-500/30 bg-slate-900/95 text-white"
          >
            {/* Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-violet-600 to-cyan-400 p-0.5 shadow-md">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-cyan-400">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-cyan-300 font-mono-tech flex items-center gap-1.5">
                    ALAN
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border font-extrabold ${
                      isAwake 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" 
                        : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    }`}>
                      {isAwake ? "AWAKE" : "SLEEPING"}
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {isAwake ? 'Say "Thanks Alan" to go to sleep' : 'Say "Hi Alan" to activate'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none shadow-md"
                        : "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Status Indicator */}
              {state === "THINKING" && (
                <div className="flex items-center gap-2 p-2.5 bg-slate-800/60 rounded-xl text-xs text-cyan-300 border border-cyan-500/20 w-fit">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span className="font-mono-tech text-[11px]">ALAN is thinking...</span>
                </div>
              )}

              {state === "LISTENING" && (
                <div className="flex items-center gap-2 p-2.5 bg-red-950/60 rounded-xl text-xs text-red-300 border border-red-500/30 w-fit animate-pulse">
                  <Mic className="w-4 h-4 text-red-400" />
                  <span className="font-mono-tech text-[11px]">
                    Listening... {transcriptText && `"${transcriptText}"`}
                  </span>
                </div>
              )}

              {state === "SPEAKING" && (
                <div className="flex items-center gap-2 p-2.5 bg-blue-950/60 rounded-xl text-xs text-cyan-300 border border-cyan-500/30 w-fit">
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-bounce" />
                  <span className="font-mono-tech text-[11px]">ALAN is speaking...</span>
                </div>
              )}

              {state === "COOLDOWN" && (
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono-tech px-1">
                  <Shield className="w-3 h-3 text-slate-400" />
                  <span>Voice cooldown guard active</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills */}
            <div className="px-3 py-2 bg-slate-950/50 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {!isAwake ? (
                <button
                  onClick={() => handlePromptClick("Hi Alan")}
                  className="flex items-center gap-1 px-3 py-1 text-[10px] rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold font-mono-tech whitespace-nowrap border border-emerald-400 transition-all shadow-md"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Say "Hi Alan"</span>
                </button>
              ) : (
                <button
                  onClick={() => handlePromptClick("Thanks Alan")}
                  className="flex items-center gap-1 px-3 py-1 text-[10px] rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 font-extrabold font-mono-tech whitespace-nowrap border border-rose-500/40 transition-all"
                >
                  <Power className="w-3 h-3 text-rose-400" />
                  <span>Say "Thanks Alan"</span>
                </button>
              )}
              <button
                onClick={() => handlePromptClick("Take me to projects")}
                className="flex items-center gap-1 px-2.5 py-1 text-[10px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700 transition-colors"
              >
                <Navigation className="w-3 h-3 text-cyan-400" />
                <span>Show Projects</span>
              </button>
              <button
                onClick={() => handlePromptClick("Switch to dark mode")}
                className="flex items-center gap-1 px-2.5 py-1 text-[10px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700 transition-colors"
              >
                <Moon className="w-3 h-3 text-violet-400" />
                <span>Dark Mode</span>
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={state === "LISTENING" ? "Listening..." : isAwake ? "Ask ALAN anything..." : 'Say "Hi Alan" to activate...'}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
              />

              {/* Speech Recognition Toggle */}
              <button
                type="button"
                onClick={toggleMic}
                disabled={state === "SPEAKING" || state === "COOLDOWN"}
                title={state === "LISTENING" ? "Stop Listening" : "Start Voice Input"}
                className={`p-2 rounded-xl border transition-all ${
                  state === "LISTENING"
                    ? "bg-red-600 text-white border-red-500 animate-pulse"
                    : state === "SPEAKING" || state === "COOLDOWN"
                    ? "bg-slate-800 text-slate-600 border-slate-800 cursor-not-allowed"
                    : "bg-slate-800 hover:bg-slate-700 text-cyan-400 border-slate-700"
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={!input.trim() || state === "THINKING"}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
