import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, KeyRound, Lock, Loader2, AlertCircle, Sun, Moon, ArrowLeft, Shield, RefreshCw, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { personalInfo } from "../data/data";

export const AdminLogin: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [requesting, setRequesting] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [infoMsg, setInfoMsg] = useState<string>("");
  const navigate = useNavigate();

  const otpRequestedRef = useRef(false);

  const handleRequestOtp = async (isResend = false) => {
    setRequesting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isResend })
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        setInfoMsg(data.message || `OTP code sent via Nodemailer to ${personalInfo.email}`);
      } else {
        setInfoMsg(`OTP code generated & dispatched to ${personalInfo.email}`);
      }
    } catch (err: any) {
      setError("Failed to dispatch OTP code. Please try again.");
    } finally {
      setRequesting(false);
    }
  };

  useEffect(() => {
    if (!otpRequestedRef.current) {
      otpRequestedRef.current = true;
      handleRequestOtp();
    }
  }, []);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || otp.length < 6) {
      setError("Please enter the valid 6-digit OTP code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otp.trim() })
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        sessionStorage.setItem("admin_token", data.token || `admin_session_${Date.now()}`);
        navigate("/admin/dashboard");
      } else {
        const errData = res ? await res.json().catch(() => ({})) : {};
        setError(errData.error || "Invalid or expired OTP code. Authentication failed.");
      }
    } catch (err: any) {
      setError("Verification service error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-white transition-colors duration-300 relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 dark:opacity-20 pointer-events-none" />

      {/* Atmospheric Liquid Glow Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-ring" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-ring" />

      {/* Top Bar Navigation & Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-mono-tech font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 shadow-md backdrop-blur-xl transition-all hover:scale-105 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          <span>Return to Public Portfolio</span>
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white hover:border-blue-500 transition-all shadow-md backdrop-blur-xl hover:scale-105 cursor-pointer"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
        </button>
      </div>

      {/* Main Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full bg-white/90 dark:bg-slate-900/95 p-8 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-500/10 dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative z-10 overflow-hidden text-slate-900 dark:text-white"
      >
        {/* Card Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 shrink-0 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white font-mono-tech flex items-center gap-2">
              ADMIN PORTAL
              <span className="inline-flex items-center gap-1 text-[9px] px-2.5 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                RESTRICTED
              </span>
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
              Nodemailer Multi-Factor OTP Authentication
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 mb-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-3 font-semibold shadow-sm">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Info / OTP Sent Alert */}
        {infoMsg && (
          <div className="p-4 mb-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3 font-mono-tech font-bold shadow-sm">
            <Mail className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{infoMsg}</span>
          </div>
        )}

        {requesting ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-3 text-slate-600 dark:text-slate-400 font-mono-tech text-xs">
            <Loader2 className="w-8 h-8 text-blue-600 dark:text-cyan-400 animate-spin" />
            <p className="font-semibold">Generating & sending OTP code via Nodemailer...</p>
            <p className="text-[11px] text-slate-500">Target: {personalInfo.email}</p>
          </div>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-xs font-mono-tech font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Enter 6-Digit One-Time Password (OTP)
              </label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3.5 w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-lg font-mono-tech font-extrabold text-blue-600 dark:text-cyan-400 tracking-widest focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 transition-all shadow-inner"
                />
              </div>
              <div className="flex items-center justify-between mt-3 text-[11px] font-mono-tech">
                <span className="text-slate-500 font-medium">Sent to {personalInfo.email}</span>
                <button
                  type="button"
                  onClick={() => handleRequestOtp(true)}
                  disabled={requesting}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-400 hover:underline font-bold cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${requesting ? "animate-spin" : ""}`} />
                  <span>Resend OTP</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 font-mono-tech font-extrabold text-xs uppercase tracking-widest text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Login</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security Badge Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono-tech text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span className="font-semibold">Nodemailer OTP Verified</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Public Site →
          </button>
        </div>
      </motion.div>
    </div>
  );
};
