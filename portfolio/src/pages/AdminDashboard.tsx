import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Cpu, 
  Mail, 
  LogOut, 
  Terminal, 
  Plus, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Sun, 
  Moon, 
  ArrowLeft,
  Trash2,
  CheckCircle2,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as initialProjects, skills as initialSkills, certifications as initialCertifications, achievements as initialAchievements, education as initialEducation } from "../data/data";
import type { ProjectItem, SkillItem, EducationItem, AchievementItem, CertificationItem } from "../types/types";
import { useTheme } from "../hooks/useTheme";

export const AdminDashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "add-project" | "add-skill" | "add-education" | "add-achievement" | "add-cert" | "messages">("overview");

  // Dynamic state arrays allowing additions & deletions
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(initialProjects);
  const [skillsList, setSkillsList] = useState<SkillItem[]>(initialSkills);
  const [educationList, setEducationList] = useState<EducationItem[]>(initialEducation);
  const [achievementsList, setAchievementsList] = useState<AchievementItem[]>(initialAchievements);
  const [certificationsList, setCertificationsList] = useState<CertificationItem[]>(initialCertifications);

  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    navigate("/admin");
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  // Form Handlers
  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      badge: formData.get("badge") as string,
      domain: formData.get("domain") as string,
      categories: (formData.get("categories") as string).split(",").map((s) => s.trim()),
      description: formData.get("description") as string,
      whatIBuilt: formData.get("whatIBuilt") as string,
      howISolvedIt: formData.get("howISolvedIt") as string,
      techUsed: (formData.get("techUsed") as string).split(",").map((s) => s.trim()),
      result: formData.get("result") as string,
      github: (formData.get("github") as string) || undefined,
      liveDemo: (formData.get("liveDemo") as string) || undefined,
      featured: formData.get("featured") === "on",
    };

    setProjectsList((prev) => [newProj, ...prev]);
    initialProjects.unshift(newProj);
    e.currentTarget.reset();
    showNotification(`Project "${newProj.title}" added to live portfolio!`);
  };

  const handleDeleteProject = (id: string) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== id));
    const idx = initialProjects.findIndex((p) => p.id === id);
    if (idx !== -1) initialProjects.splice(idx, 1);
    showNotification("Project removed from live portfolio.");
  };

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: formData.get("name") as string,
      logoUrl: formData.get("logoUrl") as string,
      level: formData.get("level") as any,
      category: formData.get("category") as any,
      description: formData.get("description") as string,
    };

    setSkillsList((prev) => [...prev, newSkill]);
    initialSkills.push(newSkill);
    e.currentTarget.reset();
    showNotification(`Skill "${newSkill.name}" added to skills matrix!`);
  };

  const handleDeleteSkill = (id: string) => {
    setSkillsList((prev) => prev.filter((s) => s.id !== id));
    const idx = initialSkills.findIndex((s) => s.id === id);
    if (idx !== -1) initialSkills.splice(idx, 1);
    showNotification("Skill removed from matrix.");
  };

  const handleAddEducation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      year: formData.get("year") as string,
      degree: formData.get("degree") as string,
      institution: formData.get("institution") as string,
      score: formData.get("score") as string,
      description: formData.get("description") as string,
      highlights: (formData.get("highlights") as string).split(",").map((s) => s.trim()),
    };

    setEducationList((prev) => [newEdu, ...prev]);
    initialEducation.unshift(newEdu);
    e.currentTarget.reset();
    showNotification(`Education "${newEdu.degree}" added!`);
  };

  const handleAddAchievement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAch: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: formData.get("title") as string,
      organization: formData.get("organization") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      iconName: (formData.get("iconName") as string) || "Trophy",
    };

    setAchievementsList((prev) => [newAch, ...prev]);
    initialAchievements.unshift(newAch);
    e.currentTarget.reset();
    showNotification(`Achievement "${newAch.title}" added to wall!`);
  };

  const handleAddCertification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: formData.get("name") as string,
      issuer: formData.get("issuer") as string,
      year: formData.get("year") as string,
      credentialUrl: (formData.get("credentialUrl") as string) || undefined,
      description: formData.get("description") as string,
    };

    setCertificationsList((prev) => [newCert, ...prev]);
    initialCertifications.unshift(newCert);
    e.currentTarget.reset();
    showNotification(`Certification "${newCert.name}" verified & added!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-white font-sans flex flex-col transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Tech Grid & Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-15 dark:opacity-20 pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-ring" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-ring" />

      {/* Top Navbar Header */}
      <header className="p-4 sm:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0b1120]/90 flex items-center justify-between shadow-sm backdrop-blur-2xl sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center font-mono-tech font-extrabold text-white shadow-lg shadow-blue-500/25 border border-white/20">
            RC
          </div>
          <div>
            <h1 className="font-extrabold text-base font-mono-tech flex items-center gap-2 text-slate-900 dark:text-white tracking-tight">
              ADMIN CONTROL CENTER
              <span className="inline-flex items-center gap-1.5 text-[9px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                AUTHENTICATED
              </span>
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
              Rangadas Chakravarthy Portfolio Management & Real-time Live State
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 text-xs font-mono-tech font-bold transition-all cursor-pointer border border-slate-200 dark:border-slate-700 hover:scale-105 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Public Site</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-white hover:border-blue-500 transition-all cursor-pointer border border-slate-200 dark:border-slate-700 hover:scale-105 shadow-sm"
          >
            {theme === "dark" ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-blue-600" />}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white text-xs font-mono-tech font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Floating Global Notification Banner */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-2.5 rounded-full text-xs font-mono-tech font-extrabold shadow-xl flex items-center gap-2 border border-white/20"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Section Group: Analytics & Messages */}
          <div>
            <h2 className="text-[10px] font-mono-tech font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-3 mb-2">
              ANALYTICS & INBOX
            </h2>
            <div className="space-y-1.5">
              {[
                { id: "overview", label: "System Overview", icon: LayoutDashboard, badge: "Live" },
                { id: "messages", label: "Recruiter Inbox", icon: Mail, badge: "Synced" },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold font-mono-tech transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                        : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800/90"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComp className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Group: Content Management */}
          <div>
            <h2 className="text-[10px] font-mono-tech font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-3 mb-2">
              CONTENT MANAGEMENT
            </h2>
            <div className="space-y-1.5">
              {[
                { id: "add-project", label: "Add Project", count: projectsList.length, icon: FolderGit2 },
                { id: "add-skill", label: "Add Skill", count: skillsList.length, icon: Cpu },
                { id: "add-education", label: "Add Education", count: educationList.length, icon: GraduationCap },
                { id: "add-achievement", label: "Add Achievement", count: achievementsList.length, icon: Award },
                { id: "add-cert", label: "Add Certification", count: certificationsList.length, icon: ShieldCheck },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold font-mono-tech transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                        : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800/90"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComp className={`w-4 h-4 ${isActive ? "text-white" : "text-blue-600 dark:text-cyan-400"}`} />
                      <span>{tab.label}</span>
                    </div>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono-tech font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-800/60"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Terminal Card */}
          <div className="p-5 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl space-y-3 font-mono-tech">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" /> API Node
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Express API server online on port 5000. Express Nodemailer & Alan AI ready.
            </p>
          </div>

        </div>

        {/* Content Pane */}
        <div className="lg:col-span-9 bg-white/90 dark:bg-slate-900/95 p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl backdrop-blur-2xl text-slate-900 dark:text-white overflow-hidden min-h-[600px]">
          
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-extrabold font-mono-tech text-slate-900 dark:text-white flex items-center gap-2">
                        SYSTEM OVERVIEW & METRICS
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                        Real-time inspection of published portfolio sections & data matrices
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-2 text-xs font-mono-tech font-bold px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-800">
                      <Activity className="w-4 h-4 animate-pulse" /> Live State
                    </span>
                  </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-600/20 dark:to-indigo-600/20 border border-blue-500/20 dark:border-blue-500/40 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between text-blue-600 dark:text-cyan-400 mb-2">
                      <span className="text-[10px] font-mono-tech text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider">PROJECTS</span>
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    <p className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono-tech">{projectsList.length}</p>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 mt-2 block">Active in Stage Slider →</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 dark:from-cyan-600/20 dark:to-teal-600/20 border border-cyan-500/20 dark:border-cyan-500/40 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between text-cyan-600 dark:text-cyan-300 mb-2">
                      <span className="text-[10px] font-mono-tech text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider">SKILLS</span>
                      <Cpu className="w-5 h-5" />
                    </div>
                    <p className="text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono-tech">{skillsList.length}</p>
                    <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-300 mt-2 block">Interactive Matrix →</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 dark:from-violet-600/20 dark:to-purple-600/20 border border-violet-500/20 dark:border-violet-500/40 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between text-violet-600 dark:text-violet-400 mb-2">
                      <span className="text-[10px] font-mono-tech text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider">CERTS</span>
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p className="text-4xl font-extrabold text-violet-600 dark:text-violet-400 font-mono-tech">{certificationsList.length}</p>
                    <span className="text-[10px] font-bold text-violet-600 dark:text-violet-300 mt-2 block">Verified Records →</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-600/20 dark:to-orange-600/20 border border-amber-500/20 dark:border-amber-500/40 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-2">
                      <span className="text-[10px] font-mono-tech text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider">HONORS</span>
                      <Award className="w-5 h-5" />
                    </div>
                    <p className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 font-mono-tech">{achievementsList.length}</p>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300 mt-2 block">Award Wall →</span>
                  </div>
                </div>

                {/* Published Items Live Inspection List */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-extrabold font-mono-tech text-slate-900 dark:text-white flex items-center justify-between">
                    <span>LIVE PORTFOLIO PROJECTS ({projectsList.length})</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-normal">Click delete to instantly remove</span>
                  </h3>

                  <div className="space-y-3">
                    {projectsList.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 transition-all hover:border-blue-500/50"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono-tech truncate">{project.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20 font-bold uppercase font-mono-tech">
                              {project.domain}
                            </span>
                            {project.featured && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold uppercase">
                                ★ Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium line-clamp-1">{project.subtitle}</p>
                        </div>

                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors shrink-0 cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Published Skills Live Matrix */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-extrabold font-mono-tech text-slate-900 dark:text-white">
                    LIVE SKILLS MATRIX ({skillsList.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skillsList.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img src={skill.logoUrl} alt={skill.name} className="w-7 h-7 object-contain rounded-lg" />
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white font-mono-tech">{skill.name}</p>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{skill.level} • {skill.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* ADD PROJECT FORM */}
            {activeTab === "add-project" && (
              <motion.div
                key="add-project"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold font-mono-tech text-slate-900 dark:text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    PUBLISH NEW PROJECT TO STAGE SLIDER
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    Adds project card into the 3D Stage Carousel and Modal inspector
                  </p>
                </div>

                <form onSubmit={handleAddProject} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Project Title</label>
                      <input name="title" required placeholder="e.g. AI Financial Analyst" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Subtitle Tagline</label>
                      <input name="subtitle" required placeholder="e.g. Real-time Market Diagnostic Tool" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Badge Pill</label>
                      <input name="badge" required placeholder="e.g. AI & Finance" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Domain Category</label>
                      <select name="domain" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner">
                        <option value="AI">AI</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="Web Development">Web Development</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Filter Categories (Comma-separated)</label>
                    <input name="categories" required placeholder="AI, React, Python, Finance" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Short Description</label>
                    <textarea name="description" required rows={2} placeholder="Brief summary for card view..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner resize-none" />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">What I Built</label>
                    <textarea name="whatIBuilt" required rows={2} placeholder="Detailed build description..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner resize-none" />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">How I Solved It</label>
                    <textarea name="howISolvedIt" required rows={2} placeholder="Architecture and engineering solutions..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner resize-none" />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Tech Stack Used (Comma-separated)</label>
                    <input name="techUsed" required placeholder="React, Python, FastApi, PostgreSQL" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Result & Impact</label>
                    <input name="result" required placeholder="e.g. Achieved sub-second inference time..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">GitHub URL (Optional)</label>
                      <input name="github" placeholder="https://github.com/..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Live Demo URL (Optional)</label>
                      <input name="liveDemo" placeholder="https://demo.vercel.app" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" name="featured" id="featured" className="w-4 h-4 rounded text-blue-600 cursor-pointer" />
                    <label htmlFor="featured" className="text-slate-700 dark:text-slate-300 font-mono-tech font-bold cursor-pointer">
                      Mark as Featured System (Higher priority in slider)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 font-mono-tech font-extrabold text-xs uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
                  >
                    Save & Publish Project Card
                  </button>
                </form>
              </motion.div>
            )}

            {/* ADD SKILL FORM */}
            {activeTab === "add-skill" && (
              <motion.div
                key="add-skill"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold font-mono-tech text-slate-900 dark:text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    ADD NEW TECHNOLOGY TO SKILLS MATRIX
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    Adds skill logo, category badge, and competency tooltip to portfolio matrix
                  </p>
                </div>

                <form onSubmit={handleAddSkill} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Technology Name</label>
                      <input name="name" required placeholder="e.g. GraphQL" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Devicon / SVG Logo URL</label>
                      <input name="logoUrl" required placeholder="https://cdn.jsdelivr.net/gh/devicons/..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Proficiency Level</label>
                      <select name="level" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner">
                        <option value="Primary">Primary (Stronghold)</option>
                        <option value="Strong">Strong</option>
                        <option value="Working Knowledge">Working Knowledge</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Category Filter</label>
                      <select name="category" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner">
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="databases">Databases</option>
                        <option value="languages">Languages</option>
                        <option value="tools">Tools</option>
                        <option value="cloud">Cloud</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Skill Description & Production Context</label>
                    <textarea name="description" required rows={3} placeholder="Describe production usage, APIs built, and architectural experience..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner resize-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 font-mono-tech font-extrabold text-xs uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
                  >
                    Save & Publish Skill
                  </button>
                </form>
              </motion.div>
            )}

            {/* ADD EDUCATION FORM */}
            {activeTab === "add-education" && (
              <motion.div
                key="add-education"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold font-mono-tech text-slate-900 dark:text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    ADD ACADEMIC EDUCATION NODE
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    Adds degree node to the interactive timeline tree
                  </p>
                </div>

                <form onSubmit={handleAddEducation} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Degree / Certificate</label>
                      <input name="degree" required placeholder="e.g. M.Tech Artificial Intelligence" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Institution Name</label>
                      <input name="institution" required placeholder="Anurag University, Hyderabad" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Timeline Years</label>
                      <input name="year" required placeholder="e.g. 2025 – 2027" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Score / CGPA</label>
                      <input name="score" required placeholder="CGPA: 9.5 / 10.0" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Overview Description</label>
                    <textarea name="description" required rows={2} placeholder="Academic specialization details..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner resize-none" />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Highlights (Comma-separated)</label>
                    <input name="highlights" required placeholder="Academic distinction, Published paper" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 font-mono-tech font-extrabold text-xs uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
                  >
                    Save & Publish Education Node
                  </button>
                </form>
              </motion.div>
            )}

            {/* ADD ACHIEVEMENT FORM */}
            {activeTab === "add-achievement" && (
              <motion.div
                key="add-achievement"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold font-mono-tech text-slate-900 dark:text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    ADD ACHIEVEMENT OR AWARD ENTRY
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    Adds hackathon win or academic honor to the Achievements grid
                  </p>
                </div>

                <form onSubmit={handleAddAchievement} className="space-y-5 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Achievement Title</label>
                    <input name="title" required placeholder="e.g. 1st Place National AI Hackathon" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Organization / Event</label>
                      <input name="organization" required placeholder="e.g. IEEE Student Branch" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Date / Year</label>
                      <input name="date" required placeholder="e.g. May 2025" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Description</label>
                    <textarea name="description" required rows={3} placeholder="Describe project built or award details..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner resize-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 font-mono-tech font-extrabold text-xs uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
                  >
                    Save & Publish Achievement
                  </button>
                </form>
              </motion.div>
            )}

            {/* ADD CERTIFICATION FORM */}
            {activeTab === "add-cert" && (
              <motion.div
                key="add-cert"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold font-mono-tech text-slate-900 dark:text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    ADD VERIFIED CERTIFICATION ENTRY
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    Adds industry credential link and badge to Certifications section
                  </p>
                </div>

                <form onSubmit={handleAddCertification} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Certification Title</label>
                      <input name="name" required placeholder="e.g. AWS Certified Solutions Architect" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Issuing Authority</label>
                      <input name="issuer" required placeholder="Amazon Web Services" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Year Issued</label>
                      <input name="year" required placeholder="2025" className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Credential Verification Link</label>
                      <input name="credentialUrl" placeholder="https://aws.amazon.com/verify/..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono-tech font-extrabold uppercase tracking-wider mb-2">Description</label>
                    <textarea name="description" rows={3} placeholder="Core engineering capabilities verified..." className="w-full p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-cyan-500/20 shadow-inner resize-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 font-mono-tech font-extrabold text-xs uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
                  >
                    Save & Publish Certification
                  </button>
                </form>
              </motion.div>
            )}

            {/* MESSAGES INBOX TAB */}
            {activeTab === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold font-mono-tech text-slate-900 dark:text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    RECRUITER & VISITOR INBOX QUEUE
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    Direct messages sent through the portfolio contact form
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      id: "msg-1",
                      sender: "Tech Talent Recruiter",
                      email: "recruiter@google.com",
                      subject: "Software Engineer / AI Engineering Opportunities",
                      time: "Today, 10:45 AM",
                      message: "Hi Rangadas, We reviewed your portfolio and were very impressed with your AI Financial Analyst and full-stack projects. We would love to discuss software engineering roles with your background.",
                      tag: "Priority"
                    },
                    {
                      id: "msg-2",
                      sender: "Engineering Lead",
                      email: "lead@startup.io",
                      subject: "Contract / Full-time Full Stack Developer",
                      time: "Yesterday, 3:20 PM",
                      message: "Great work on the 3D stage slider and Alan AI integration! Are you open to discussing full-time senior development positions?",
                      tag: "Inquiry"
                    }
                  ].map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 transition-all hover:border-blue-500/50"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono-tech">{msg.sender}</span>
                          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono-tech">({msg.email})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20 font-bold uppercase font-mono-tech">
                            {msg.tag}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">{msg.time}</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono-tech">{msg.subject}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium bg-white/50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};
