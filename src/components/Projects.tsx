import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink, X, ArrowRight, Terminal, Globe, Code, Server, GitMerge, BrainCircuit, Activity } from "lucide-react";

// ---------------------- Types ----------------------
type Story = {
  problem: string;
  solution: string;
  purpose: string;
  learned: string;
};

type Project = {
  id: string;
  title: string;
  short: string;
  story: Story;
  category: string;
  tech: string[];
  banner?: string;
  github?: string;
  live?: string;
  badge: string;
  stats?: { label: string; value: string };
};

// ---------------------- Badge Styling ----------------------
const BADGE_STYLES: Record<string, string> = {
  Completed: "border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
  Active: "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
  Showcase: "border-purple-500/50 text-purple-600 dark:text-purple-400 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
  "🎓 Diploma": "border-cyan-500/50 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]",
};

// ---------------------- Project Data ----------------------
const PROJECTS: Project[] = [
  {
    id: "pythonic-quiz",
    title: "Pythonic Quiz",
    short: "My diploma final year project focused on creating an interactive quiz application using Python concepts to improve learning engagement.",
    story: {
      problem: "Traditional learning lacked interactive and engaging ways to test knowledge.",
      solution: "Developed a desktop quiz application using Python concepts.",
      purpose: "Created to focus on an interactive way to improve learning engagement.",
      learned: "Mastered Python fundamentals and GUI development using Tkinter.",
    },
    category: "Software",
    tech: ["Python", "Tkinter"],
    badge: "🎓 Diploma",
    stats: { label: "Questions", value: "200+" },
    banner: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "workfree-music",
    title: "WorkFreeMusic",
    short: "Built a music platform that provides a clean experience for accessing and exploring music resources with a simple and user-friendly interface.",
    story: {
      problem: "Many music platforms are cluttered and complex for quick access.",
      solution: "Built a platform with a simple, clean, and user-friendly interface.",
      purpose: "Created to improve frontend development skills and deployment workflow experience.",
      learned: "Advanced React concepts, state management, and frontend deployment workflows.",
    },
    category: "Web Dev",
    tech: ["React", "CSS"],
    badge: "Completed",
    github: "https://github.com/vvdmahesh3/WorkFreeMusic",
    live: "https://workfreemusic.netlify.app",
    stats: { label: "UX Rating", value: "Minimal" },
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "placement-tracker",
    title: "Placement Tracker Dashboard",
    short: "A dashboard system developed to organize and track placement-related information and records efficiently for the Strides Event.",
    story: {
      problem: "Managing student placement data manually was inefficient and disorganized.",
      solution: "Developed a centralized dashboard to organize, filter, and track records efficiently.",
      purpose: "Built to simplify management of student placement data.",
      learned: "Data visualization, state management, and building intuitive administrative dashboards.",
    },
    category: "Web Dev",
    tech: ["React", "Firebase"],
    badge: "Completed",
    github: "https://github.com/vvdmahesh3/Placement-Tracker",
    stats: { label: "Data Organized", value: "100%" },
    banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "gdg-playground",
    title: "GDG 2025 Challenge Playground",
    short: "Developed as part of a challenge environment to experiment, learn, and build practical coding implementations.",
    story: {
      problem: "Needed a dedicated environment for coding challenges and experimentation.",
      solution: "Developed a web-based playground optimized for coding implementations.",
      purpose: "Hands-on learning and challenge participation.",
      learned: "Rapid prototyping, integrating code execution contexts, and interactive UI.",
    },
    category: "Web Dev",
    tech: ["HTML", "CSS", "JavaScript"],
    badge: "Active",
    live: "https://gdgcodeplayground.netlify.app",
    stats: { label: "Challenges", value: "Multiple" },
    banner: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "carbon-footprint",
    title: "Carbon Footprint Project",
    short: "An environmental awareness project that helps users understand and calculate carbon footprint impacts.",
    story: {
      problem: "Lack of awareness regarding individual carbon footprint and sustainability.",
      solution: "Created an interactive tool that helps users understand and calculate their impacts.",
      purpose: "Promote awareness of sustainable practices.",
      learned: "Complex data calculation logic, and designing for social impact.",
    },
    category: "Web Dev",
    tech: ["React"],
    badge: "Completed",
    live: "https://eco-home-footprint-tracker.lovable.app",
    stats: { label: "Impact Area", value: "Environment" },
    banner: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "fms",
    title: "Faculty Management System (FMS)",
    short: "A complete academic management system designed to reduce faculty workload through smart automation.",
    story: {
      problem: "Faculty were overwhelmed by manual academic management tasks and tracking.",
      solution: "Designed smart automation modules for attendance, assignments, and tracking.",
      purpose: "Built to solve real faculty workflow problems.",
      learned: "Full-stack architecture, secure database management, and role-based access control.",
    },
    category: "Full Stack",
    tech: ["Python", "Flask", "SQLite"],
    badge: "Active",
    github: "https://github.com/vvdmahesh3/FMS",
    live: "https://fms-7vhd.onrender.com/",
    stats: { label: "Workload Reduced", value: "Smart Auto" },
    banner: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mediq-showcase",
    title: "MediQ Showcase Website",
    short: "A healthcare-related project showcase website presenting the MediQ idea and concept.",
    story: {
      problem: "Needed a platform to present the MediQ healthcare concept creatively to an audience.",
      solution: "Built a visually engaging showcase website with storytelling elements.",
      purpose: "Built to present healthcare solution ideas creatively.",
      learned: "Advanced UI/UX design, visual hierarchy, and storytelling in web design.",
    },
    category: "Web Dev",
    tech: ["HTML", "CSS", "JS"],
    badge: "Showcase",
    github: "https://github.com/vvdmahesh3/MediQ",
    live: "https://vvdmahesh3.github.io/MediQ_ShowCasewebsite/",
    stats: { label: "Domain", value: "Healthcare" },
    banner: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "crisissignal-ai",
    title: "CrisisSignal AI",
    short: "AI-powered emergency support platform designed to help during crisis situations.",
    story: {
      problem: "During crises, immediate and intelligent support is often lacking.",
      solution: "Developed an AI-powered platform tailored for intelligent emergency assistance.",
      purpose: "Built using AI concepts to create meaningful real-world impact.",
      learned: "AI integration, prompt engineering, handling real-time data.",
    },
    category: "AI/ML",
    tech: ["AI", "Python", "Flask", "React"],
    badge: "Active",
    github: "https://github.com/vvdmahesh3/CrisisSignal-AI",
    live: "https://crisissignal-ai.onrender.com/",
    stats: { label: "Engine", value: "AI-Powered" },
    banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
  }
];

// ---------------------- Tech Icons ----------------------
const TECH_ICONS: Record<string, string> = {
  React: "⚛", Python: "🐍", "Node.js": "🟢", MongoDB: "🍃", SQLite: "🗄",
  Flask: "🥤", Firebase: "🔥", Tailwind: "🌊", Bootstrap: "📘",
  Audio: "🎵", Tkinter: "🖥", AI: "🤖", API: "🔗", CSS: "🎨",
  "HTML5": "📜", "CSS3": "🎨", "JavaScript": "🟨", JS: "🟨", HTML: "📜"
};

// ---------------------- Statistics Data ----------------------
const PORTFOLIO_STATS = [
  { label: "Projects Built", value: "15+", icon: <Code size={20} /> },
  { label: "Deployments", value: "10+", icon: <Server size={20} /> },
  { label: "Technologies Used", value: "20+", icon: <BrainCircuit size={20} /> },
  { label: "Contributions", value: "450+", icon: <GitMerge size={20} /> },
];

// ---------------------- Component ----------------------
const Projects: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
        
        {/* Header & Journey Text */}
        <div className="mb-20 text-center">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-[#00FFB3] mb-6">PROJECTS</h2>
          
          <div className="max-w-2xl mx-auto mb-12">
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-300 mb-2">My Journey Through Code</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Every project here started with curiosity, learning, mistakes, and improvement. 
              These are not just projects. They represent my journey from a student learning basics 
              to someone building solutions for real problems.
            </p>
          </div>

          {/* Counters */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {PORTFOLIO_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4 min-w-[120px] rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
                <div className="text-zinc-500 dark:text-[#00FFB3] mb-2">{stat.icon}</div>
                <div className="text-2xl font-black text-zinc-900 dark:text-white">{stat.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <AnimatePresence mode="wait">
            {!activeProject ? (
              <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                {/* ─── GRID LAYOUT OF CARDS ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PROJECTS.map((proj) => (
                    <motion.div
                      key={proj.id}
                      layoutId={`card-${proj.id}`}
                      className="group flex flex-col h-[480px] rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/40 backdrop-blur-md transition-all duration-500 shadow-sm hover:shadow-xl dark:hover:shadow-[#00FFB3]/10 relative cursor-pointer"
                      onClick={() => setActiveProject(proj)}
                    >
                      {/* Banner Image */}
                      <div className="h-40 w-full relative overflow-hidden bg-zinc-200 dark:bg-zinc-950 flex-shrink-0">
                        <img
                          className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          src={proj.banner}
                          alt={proj.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-[#050505] to-transparent" />
                        {proj.badge && (
                          <div className="absolute top-4 right-4 z-20">
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-md border ${BADGE_STYLES[proj.badge] || BADGE_STYLES["Completed"]}`}>
                              {proj.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 group-hover:text-[#00FFB3] transition-colors">{proj.title}</h3>
                        
                        {/* Quotation / Short Description */}
                        <div className="mb-6 relative">
                          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#00FFB3] rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity" />
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 italic line-clamp-4">
                            "{proj.short}"
                          </p>
                        </div>

                        <div className="mt-auto">
                          {/* Tech stack tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {proj.tech.slice(0, 3).map((t) => (
                              <span key={t} className="px-2.5 py-1 rounded-md bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/5 text-[9px] font-bold uppercase text-zinc-600 dark:text-zinc-400">
                                {TECH_ICONS[t]} {t}
                              </span>
                            ))}
                            {proj.tech.length > 3 && <span className="px-2 py-1 text-[9px] text-zinc-500">+{proj.tech.length - 3}</span>}
                          </div>

                          {/* Interactive Buttons on Card */}
                          <div className="flex items-center justify-between border-t border-zinc-200 dark:border-white/5 pt-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex items-center gap-2">
                              Read Full Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>

                            <div className="flex gap-2">
                              {proj.github && (
                                <a
                                  href={proj.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()} // Prevent opening card
                                  className="p-2 rounded-xl bg-zinc-200 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#00FFB3] hover:bg-zinc-300 dark:hover:bg-[#00FFB3]/10 transition-all"
                                  title="View on GitHub"
                                >
                                  <Github size={16} />
                                </a>
                              )}
                              {proj.live && (
                                <a
                                  href={proj.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()} // Prevent opening card
                                  className="p-2 rounded-xl bg-zinc-200 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-all"
                                  title="View Live Demo"
                                >
                                  <ExternalLink size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ─── FULL PREVIEW MODE (When Clicked) ─── */
              <motion.div 
                key="preview" 
                layout 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[650px]"
              >
                {/* Left Panel: Detailed Storytelling */}
                <motion.div
                  layoutId={`card-${activeProject.id}`}
                  className="rounded-[40px] p-8 md:p-12 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-[#00FFB3]/20 shadow-2xl flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FFB3] to-blue-500" />
                  
                  <div>
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <span className="text-[#00FFB3] font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">{activeProject.category}</span>
                        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">{activeProject.title}</h2>
                      </div>
                      <button onClick={() => setActiveProject(null)} className="p-3 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-red-500 hover:text-white transition-all">
                        <X size={20} />
                      </button>
                    </div>

                    {/* Story Sections */}
                    <div className="space-y-6">
                      <div className="p-5 rounded-2xl bg-[#00FFB3]/5 border border-[#00FFB3]/20">
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00FFB3] mb-2">
                          <Activity size={14} /> Impact / Purpose
                        </span>
                        <p className="text-zinc-800 dark:text-zinc-300 text-sm font-medium">{activeProject.story.purpose}</p>
                      </div>

                      <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                          What problem did this solve?
                        </span>
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed">{activeProject.story.problem}</p>
                      </div>

                      <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                          Why was this created? (Solution)
                        </span>
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed">{activeProject.story.solution}</p>
                      </div>

                      <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                          What did I learn?
                        </span>
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed">{activeProject.story.learned}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Tech */}
                  <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-[10px] font-black uppercase text-zinc-600 dark:text-zinc-300 tracking-widest">
                          {TECH_ICONS[t]} {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {activeProject.github && (
                        <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-black dark:hover:bg-[#00FFB3] hover:text-white dark:hover:text-black font-bold text-xs uppercase tracking-wider transition-all" title="GitHub">
                          <Github size={16} /> Code
                        </a>
                      )}
                      {activeProject.live && (
                        <a href={activeProject.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#00FFB3]/10 text-zinc-900 dark:text-[#00FFB3] border border-[#00FFB3]/30 hover:bg-[#00FFB3] hover:text-black font-bold text-xs uppercase tracking-wider transition-all" title="Live Demo">
                          <ExternalLink size={16} /> Explore
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Right Panel: Live Iframe Preview */}
                <motion.div className="relative rounded-[40px] overflow-hidden bg-zinc-200 dark:bg-[#050505] border border-zinc-300 dark:border-white/5 flex items-center justify-center group shadow-inner">
                  {activeProject.live ? (
                    <div className="w-full h-full relative group">
                        <iframe 
                            src={activeProject.live} 
                            className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity bg-white" 
                            title="live-preview" 
                        />
                        <div className="absolute top-6 right-6 pointer-events-none">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                                <Globe className="text-[#00FFB3] w-3 h-3 animate-pulse" />
                                <span className="text-[9px] font-black uppercase text-white tracking-widest">Live System Active</span>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <div className="text-center p-16">
                      <div className="w-24 h-24 bg-zinc-300 dark:bg-[#00FFB3]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-zinc-400 dark:border-[#00FFB3]/30">
                        <Terminal className="text-zinc-500 dark:text-[#00FFB3]" size={40} />
                      </div>
                      <h3 className="text-zinc-800 dark:text-white font-black text-2xl mb-4 uppercase tracking-tighter">PREVIEW_NOT_LOADED</h3>
                      <p className="text-zinc-500 dark:text-[#00FFB3] font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                        Check GitHub for implementation logs.
                      </p>
                    </div>
                  )}
                  {/* Subtle Scanline Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] dark:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-20" />
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