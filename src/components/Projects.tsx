import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink, X, ArrowRight, Activity, Terminal, Code, Cpu, Globe } from "lucide-react";

// ---------------------- Types ----------------------
type Project = {
  id: string;
  title: string;
  short: string;
  long?: string;
  category: string;
  tech: string[];
  banner?: string;
  github?: string;
  live?: string;
  badge?: string;
  impact?: string;
  stats?: { label: string; value: string }; 
};

// ---------------------- Badge Styling ----------------------
const BADGE_STYLES: Record<string, string> = {
  Completed: "border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
  "🚧 In Progress": "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
  Research: "border-purple-500/50 text-purple-600 dark:text-purple-400 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
  Experimental: "border-pink-500/50 text-pink-600 dark:text-pink-400 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.2)]",
};

// ---------------------- Project Data ----------------------
const PROJECTS: Project[] = [
  {
    id: "gdg-code-playground",
    title: "GDG Code Playground",
    short: "A powerful multi-language web IDE built for the Google Developer Group community.",
    long: `🔴 The Problem\nDevelopers often face heavy local setup hurdles. There was a need for a lightweight, browser-based environment to write, test, and debug code instantly.\n\n🟢 My Solution\nConceptualized and developed an all-in-one playground using Monaco Editor. It supports C, Python, Java, and JavaScript with simulated real-time execution and an AI Code Mentor.\n\n⚙️ Key Modules\n- Monaco-powered code editor with VS Code-like experience\n- AI Code Mentor for language-specific suggestions\n- LocalStorage persistence to prevent data loss\n- Resizable and draggable UI components for a custom workspace`,
    category: "Web Dev",
    tech: ["HTML5", "CSS3", "JavaScript", "Monaco Editor", "GSAP"],
    banner: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
    badge: "Completed",
    github: "https://github.com/vvdmahesh3/GDG-Code-Playground",
    live: "https://vvdmahesh3.github.io/GDG-Code-Playground/",
    stats: { label: "IDE Engine", value: "Monaco" },
    impact: "Created a contest-winning educational tool for the developer community.",
  },
  {
    id: "infosys-ai-health",
    title: "Multi-Model AI Health Diagnostics",
    short: "Automated interpretation of noisy medical PDFs using OCR + ML pipelines.",
    long: `🔴 Problem\nMedical reports are unstructured, noisy and manually interpreted — time-consuming and error-prone.\n\n🟢 Why Me\nWorked directly with real hospital PDFs. Handled OCR failures, inconsistent units and missing values.\n\n⚙️ System Design\nOCR → Cleaning → Feature Extraction\nRule-based logic + ML models\nModular pipeline (Model-1, Model-2…)`,
    category: "AI/ML",
    tech: ["Python", "Pandas", "TensorFlow", "OCR"],
    badge: "Research",
    stats: { label: "Processing Speed", value: "0.8s/Page" },
    impact: "Demonstrates real-world ML problem solving",
  },
  {
    id: "faculty-system",
    title: "Faculty Management System (FMS)",
    short: "Designed from real CR experience to reduce faculty workload.",
    long: `🔴 Problem\nFaculty overloaded with attendance, marks, tracking and reports.\nFragmented tools and manual workflows.\n\n🟢 Why Me\nCR experience. Direct observation of faculty pain points. Built for real college operations — not assumptions.\n\n🧩 Core Modules\nSmart Attendance\nAssignment Tracking\nProgress Dashboard\nNotifications`,
    category: "College Project",
    tech: ["Flask", "SQLite", "Bootstrap"],
    badge: "🚧 In Progress",
    stats: { label: "Workload Reduced", value: "40%" },
    impact: "Founder mindset + systems thinking",
  },
  {
    id: "rythmize",
    title: "Rythmize Music Player",
    short: "A lightweight desktop music player built with Tkinter.",
    long: "Rythmize is a simple, focused music player built in Python/Tkinter. It supports playlists, keyboard shortcuts and a minimal visualizer.",
    category: "General",
    tech: ["Python", "Tkinter", "Audio"],
    badge: "Completed",
    stats: { label: "Memory Usage", value: "<15MB" },
    impact: "Kickstarted my coding journey by mastering Python basics",
  },
  {
    id: "placement-tracker",
    title: "Placement Tracker App",
    short: "Tracks placement drives and candidate status for 100+ students.",
    long: "Tracks student placements, company visits, status updates and offers with role-based dashboards for colleges.",
    category: "Web Dev",
    tech: ["React", "Firebase", "Tailwind CSS"],
    badge: "Completed",
    stats: { label: "Data Integrity", value: "99.9%" },
    impact: "Simplified placement tracking and increased transparency",
  },
  {
    id: "smart-attendance",
    title: "Smart Attendance System",
    short: "Automated attendance using QR & analytics for rapid tracking.",
    long: "Combines QR check-ins, dashboards for teachers and exportable reports for admins. Reduces check-in time to 1.2 seconds.",
    category: "AI/ML",
    tech: ["React", "Node.js", "MongoDB"],
    badge: "🚧 In Progress",
    stats: { label: "Check-in Time", value: "1.2s" },
    impact: "Boosts efficiency and transparency in student attendance",
  },
  {
    id: "portfolio-site",
    title: "Portfolio Website",
    short: "This portfolio — fast, modern and neon-themed.",
    long: "Showcases projects, achievements, AI resume assistant, and creative UI interactions with a dark + neon aesthetic.",
    category: "Web Dev",
    tech: ["React", "Framer Motion", "Tailwind"],
    badge: "Completed",
    stats: { label: "Performance", value: "100/100" },
    impact: "Represents my professional brand and creativity",
  },
  {
    id: "gan-playground",
    title: "GANs Playground",
    short: "AI image generation with Generative Adversarial Networks.",
    long: "Experimented with GANs to generate synthetic images and visual effects. Focused on DCGAN research and hands-on learning.",
    category: "AI/ML",
    tech: ["Python", "TensorFlow", "Keras"],
    badge: "Research",
    stats: { label: "Model Type", value: "DCGAN" },
    impact: "Gained hands-on ML research experience",
  },
  {
    id: "dna-skills",
    title: "DNA Skills Visualizer",
    short: "Animated DNA Helix to showcase skills using Three.js.",
    long: "Designed a creative skills section using WebGL and Three.js for an interactive DNA-like helix animation.",
    category: "Creative",
    tech: ["Three.js", "WebGL", "React"],
    badge: "Experimental",
    stats: { label: "FPS", value: "60.0" },
    impact: "Showcased creativity in UI/UX storytelling",
  },
];

// ---------------------- Tech Icons ----------------------
const TECH_ICONS: Record<string, string> = {
  React: "⚛", Python: "🐍", "Node.js": "🟢", MongoDB: "🍃", SQLite: "🗄",
  Flask: "🥤", Firebase: "🔥", "Tailwind CSS": "🌊", Bootstrap: "📘",
  Audio: "🎵", Tkinter: "🖥", AI: "🤖", "Framer Motion": "🎞",
  TensorFlow: "🧠", Keras: "📊", "Three.js": "🌀", WebGL: "🌐",
  "HTML5": "📜", "CSS3": "🎨", "JavaScript": "🟨", "Monaco Editor": "✍", "GSAP": "✨"
};

// ---------------------- Component ----------------------
const Projects: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))], []);
  const filteredProjects = activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveProject(null); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative py-24 px-6 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-1000">
      
      {/* Background Blurs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00FFB3]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-[#00FFB3]">PROJECTS</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-4 font-mono uppercase tracking-[0.4em] text-[10px]">Architecture & Execution</p>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-100/50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveProject(null); }}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-zinc-900 text-white dark:bg-[#00FFB3] dark:text-black shadow-xl" 
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <AnimatePresence mode="wait">
            {!activeProject ? (
              <motion.div 
                key="grid" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredProjects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    layoutId={`card-${proj.id}`}
                    onClick={() => setActiveProject(proj)}
                    className="relative group cursor-pointer h-[420px] rounded-[40px] overflow-hidden border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/40 backdrop-blur-md transition-all duration-500 flex flex-col shadow-sm hover:shadow-2xl dark:hover:shadow-[#00FFB3]/10"
                  >
                    {/* Card Banner */}
                    <div className="h-28 relative overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-white/5">
                      <motion.img
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        src={proj.banner ?? `https://via.placeholder.com/800x200/ddd/888?text=SYSTEM+CORE`}
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/80 dark:from-zinc-900 to-transparent" />
                      {proj.badge && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest backdrop-blur-md ${BADGE_STYLES[proj.badge]}`}>
                            {proj.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-10 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white group-hover:text-[#00FFB3] transition-colors">{proj.title}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 line-clamp-3 leading-relaxed">{proj.short}</p>
                      </div>

                      <div className="flex items-center justify-between pt-8 border-t border-zinc-100 dark:border-white/5">
                        <div className="flex -space-x-2">
                          {proj.tech.slice(0, 3).map((t) => (
                            <div key={t} className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border-2 border-zinc-50 dark:border-zinc-950 flex items-center justify-center text-[10px]" title={t}>
                              {TECH_ICONS[t] ?? "🔧"}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:group-hover:text-[#00FFB3]">
                          Deploy <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* --- FULL PREVIEW MODE --- */
              <motion.div 
                key="preview" 
                layout 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]"
              >
                {/* Details Panel */}
                <motion.div
                  layoutId={`card-${activeProject.id}`}
                  className="rounded-[48px] p-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-[#00FFB3]/20 shadow-2xl flex flex-col justify-between"
                >
                  <div className="space-y-12">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">{activeProject.title}</h2>
                        <span className="text-blue-600 dark:text-[#00FFB3] font-mono text-[10px] font-bold uppercase tracking-[0.4em]">{activeProject.category}</span>
                      </div>
                      <div className="flex gap-4">
                        {activeProject.github && (
                          <a href={activeProject.github} target="_blank" className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-[#00FFB3] hover:text-black transition-all">
                            <Github size={20} />
                          </a>
                        )}
                        <button onClick={() => setActiveProject(null)} className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-red-500 hover:text-white transition-all">
                          <X size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {activeProject.stats && (
                        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-[#00FFB3]/5 border border-zinc-100 dark:border-[#00FFB3]/10">
                          <span className="text-[9px] font-black uppercase text-zinc-400 dark:text-[#00FFB3] tracking-widest">{activeProject.stats.label}</span>
                          <div className="text-3xl font-black text-zinc-900 dark:text-white mt-2">{activeProject.stats.value}</div>
                        </div>
                      )}
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-loose whitespace-pre-line font-medium">
                        {activeProject.long}
                      </p>
                      {activeProject.impact && (
                        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-2">Impact</span>
                          <p className="text-blue-100 font-bold">{activeProject.impact}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-zinc-100 dark:border-white/5">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="px-5 py-2 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 text-[10px] font-black uppercase text-zinc-500 dark:text-zinc-300 tracking-widest">
                        {TECH_ICONS[t] ?? "🔧"} {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* System Preview Panel (The Live Iframe) */}
                <motion.div className="relative rounded-[48px] overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 flex items-center justify-center group shadow-inner">
                  {activeProject.live ? (
                    <div className="w-full h-full relative group">
                        <iframe 
                            src={activeProject.live} 
                            className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity" 
                            title="live-preview" 
                        />
                        <div className="absolute top-6 right-6 pointer-events-none">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                <Globe className="text-[#00FFB3] w-3 h-3 animate-pulse" />
                                <span className="text-[9px] font-black uppercase text-white tracking-widest">Live System Active</span>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <div className="text-center p-16">
                      <div className="w-24 h-24 bg-zinc-200 dark:bg-[#00FFB3]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse border border-zinc-300 dark:border-[#00FFB3]/30">
                        <Terminal className="text-zinc-400 dark:text-[#00FFB3]" size={40} />
                      </div>
                      <h3 className="text-zinc-900 dark:text-white font-black text-2xl mb-4 uppercase tracking-tighter">PREVIEW_NOT_LOADED</h3>
                      <p className="text-[#00FFB3] font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
                        Check GitHub for implementation logs.
                      </p>
                    </div>
                  )}
                  {/* CRT Screen Scanline Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default Projects;