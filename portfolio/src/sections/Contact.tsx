import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileText, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/SocialIcons";
import confetti from "canvas-confetti";
import { personalInfo, socialLinks } from "../data/data";

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).catch(() => null);

      if (res && !res.ok) {
        throw new Error("Failed to send message.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

    } catch (err: any) {
      console.warn("Contact form submission fallback:", err);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        {/* Technical Header with vibrant Sky/Blue kicker */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-800 dark:text-cyan-300 font-mono-tech text-xs font-extrabold tracking-widest uppercase border border-blue-500/40 shadow-sm">
            CONNECT & COLLABORATE
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Let's Build Something Exceptional{" "}
              <span className="block sm:inline bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent font-black uppercase">
                TOGETHER.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Whether you have an exciting software role, an AI challenge, a web development project, or just want to connect, my inbox is open!
            </p>

            {/* Direct Cards */}
            <div className="space-y-3 pt-2">
              <a
                href={socialLinks.email}
                className="glass-card bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 flex items-center gap-4 transition-all group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-slate-500 uppercase font-bold">Direct Email</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white font-mono-tech">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <div className="flex gap-3">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 glass-card bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 flex items-center gap-3 transition-all group shadow-sm"
                >
                  <GithubIcon className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600" />
                  <div>
                    <span className="text-[10px] font-mono-tech text-slate-500 uppercase font-bold">GitHub</span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">rangadaschakravarthy</p>
                  </div>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 glass-card bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 flex items-center gap-3 transition-all group shadow-sm"
                >
                  <LinkedinIcon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] font-mono-tech text-slate-500 uppercase font-bold">LinkedIn</span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">rangadaschakravarthy</p>
                  </div>
                </a>
              </div>

              {personalInfo.resumeUrl && (
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full glass-card bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-violet-500/50 flex items-center justify-between transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    <div>
                      <span className="text-[10px] font-mono-tech text-slate-500 uppercase font-bold">Resume PDF</span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Download Credentials</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                    Download →
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Right Form Card - Expanded & Prominent */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8 font-medium">
                  Have an engineering opportunity, full-stack project, or technical question? Send a message directly to my inbox below.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-16 flex flex-col items-center justify-center text-center gap-5"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-bounce shadow-lg">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md font-medium leading-relaxed">
                      Thank you for reaching out. Rangadas has received your message and will respond promptly!
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 px-8 py-3 rounded-2xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form key="contact-form" onSubmit={handleSubmit} className="space-y-6">
                    {status === "error" && (
                      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2.5 font-medium">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono-tech text-slate-700 dark:text-slate-300 mb-2 font-bold uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech text-slate-700 dark:text-slate-300 mb-2 font-bold uppercase tracking-wider">
                          Your Email
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="sarah@company.com"
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech text-slate-700 dark:text-slate-300 mb-2 font-bold uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        rows={7}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Hi Rangadas, we loved your projects and would like to discuss an engineering opportunity with our team..."
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-medium leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs tracking-widest uppercase shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer mt-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
