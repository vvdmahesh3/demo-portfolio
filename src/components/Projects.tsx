// src/components/Projects.tsx
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";

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
};

// ---------------------- Badge Styling ----------------------
const BADGE_STYLES: Record<string, string> = {
  Completed:
    "border-green-500/50 text-green-600 bg-green-100/50 shadow-[0_0_10px_rgba(34,197,94,0.4)] dark:border-green-400/50 dark:text-green-400 dark:bg-green-900/30 dark:shadow-[0_0_10px_rgba(34,197,94,0.5)]",
  "🚧 In Progress":
    "border-yellow-500/50 text-yellow-700 bg-yellow-100/50 shadow-[0_0_10px_rgba(234,179,8,0.4)] dark:border-yellow-400/50 dark:text-yellow-300 dark:bg-yellow-900/30 dark:shadow-[0_0_10px_rgba(234,179,8,0.5)]",
  Research:
    "border-purple-500/50 text-purple-700 bg-purple-100/50 shadow-[0_0_10px_rgba(168,85,247,0.4)] dark:border-purple-400/50 dark:text-purple-300 dark:bg-purple-900/30 dark:shadow-[0_0_10px_rgba(168,85,247,0.5)]",
  Experimental:
    "border-pink-500/50 text-pink-700 bg-pink-100/50 shadow-[0_0_10px_rgba(236,72,153,0.4)] dark:border-pink-400/50 dark:text-pink-300 dark:bg-pink-900/30 dark:shadow-[0_0_10px_rgba(236,72,153,0.5)]",
};

// Simplified style map for the Legend
const BADGE_LEGEND_BASE_STYLES: Record<string, string> = {
  Completed:
    "border-green-500/50 text-green-600 bg-green-100/50 dark:border-green-400/50 dark:text-green-400 dark:bg-green-900/30",
  "🚧 In Progress":
    "border-yellow-500/50 text-yellow-700 bg-yellow-100/50 dark:border-yellow-400/50 dark:text-yellow-300 dark:bg-yellow-900/30",
  "Research/Exp":
    "border-purple-500/50 text-purple-700 bg-purple-100/50 dark:border-purple-400/50 dark:text-purple-300 dark:bg-purple-900/30",
};

const BADGE_LEGEND: { label: string; style: string }[] = [
  { label: "Completed", style: BADGE_LEGEND_BASE_STYLES.Completed },
  { label: "In Progress", style: BADGE_LEGEND_BASE_STYLES["🚧 In Progress"] },
  { label: "Research/Exp", style: BADGE_LEGEND_BASE_STYLES["Research/Exp"] },
];

// ---------------------- Project Data ----------------------
const PROJECTS: Project[] = [
  {
    id: "rythmize",
    title: "Rythmize (Tkinter Music Player)",
    short: "A lightweight desktop music player built with Tkinter.",
    long: "Rythmize is a simple, focused music player built in Python/Tkinter. It supports playlists, keyboard shortcuts and a minimal visualizer.",
    category: "General",
    tech: ["Python", "Tkinter", "Audio"],
    banner: "https://via.placeholder.com/1200x600.png?text=Rythmize+Banner",
    badge: "Completed",
    impact: "Kickstarted my coding journey by mastering Python basics",
  },
  {
    id: "placement-tracker",
    title: "Placement Tracker App",
    short: "Tracks placement drives and candidate status.",
    long: "Tracks student placements, company visits, status updates and offers with role-based dashboards for colleges.",
    category: "Web Dev",
    tech: ["React", "Firebase", "Tailwind CSS"],
    banner:
      "https://via.placeholder.com/1200x600.png?text=Placement+Tracker+Banner",
    badge: "Completed",
    impact: "Simplified placement tracking for 100+ students",
  },
  {
    id: "faculty-system",
    title: "Faculty Management System",
    short: "Automates faculty workload & attendance.",
    long: "Feature-rich system to manage attendance, allocate workload, upload marks and generate reports — built with full CRUD and dashboards.",
    category: "College Project",
    tech: ["Flask", "SQLite", "Bootstrap"],
    badge: "🚧 In Progress",
    impact: "Designed to reduce workload for 50+ faculty members",
  },
  {
    id: "smart-attendance",
    title: "Smart Attendance System",
    short: "Automated attendance using QR & analytics.",
    long: "Combines QR check-ins, dashboards for teachers and exportable reports for admins.",
    category: "AI/ML",
    tech: ["React", "Node.js", "MongoDB"],
    badge: "🚧 In Progress",
    impact: "Boosts efficiency and transparency in student attendance",
  },
  {
    id: "portfolio-site",
    title: "Portfolio Website",
    short: "This portfolio — fast, modern and neon-themed.",
    long: "Showcases projects, achievements, AI resume assistant, and creative UI interactions with a dark + neon aesthetic.",
    category: "Web Dev",
    tech: ["React", "Framer Motion", "Tailwind"],
    banner: "https://via.placeholder.com/1200x600.png?text=Portfolio+Banner",
    badge: "Completed",
    impact: "Represents my professional brand and creativity",
  },
  {
    id: "gan-playground",
    title: "GANs Playground",
    short: "AI image generation with Generative Adversarial Networks.",
    long: "Experimented with GANs to generate synthetic images and visual effects. Focused on research and hands-on learning.",
    category: "AI/ML",
    tech: ["Python", "TensorFlow", "Keras"],
    badge: "Research",
    impact: "Gained hands-on ML research experience",
  },
  {
    id: "dna-skills",
    title: "DNA Skills Visualizer",
    short: "Animated DNA Helix to showcase skills.",
    long: "Designed a creative skills section using WebGL and Three.js for an interactive DNA-like helix animation.",
    category: "Creative",
    tech: ["Three.js", "WebGL", "React"],
    badge: "Experimental",
    impact: "Showcased creativity in UI/UX storytelling",
  },
];

// ---------------------- Variants ----------------------
const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};
const bannerVariants = {
  rest: { y: "100%" },
  hover: { y: "0%" },
};

// ---------------------- Tech Icons ----------------------
const TECH_ICONS: Record<string, string> = {
  React: "⚛",
  Python: "🐍",
  "Node.js": "🟢",
  MongoDB: "🍃",
  SQLite: "🗄",
  Flask: "🥤",
  Firebase: "🔥",
  "Tailwind CSS": "🌊",
  Bootstrap: "📘",
  Audio: "🎵",
  Tkinter: "🖥",
  AI: "🤖",
  "Framer Motion": "🎞",
  TensorFlow: "🧠",
  Keras: "📊",
  "OpenWeather API": "☁",
  "Chart.js": "📈",
  "GitHub API": "🐙",
  "D3.js": "📊",
  "Three.js": "🌀",
  WebGL: "🌐",
};

// ---------------------- Component ----------------------
const Projects: React.FC = () => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    []
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  // Close preview on Esc
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-20 px-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-black dark:to-gray-900 transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-blue-600 drop-shadow-[0_0_12px_rgba(37,99,235,0.5)] dark:text-[#00FFB3] dark:drop-shadow-[0_0_15px_#00FFB3]">
              Projects
            </span>
          </h2>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Badge Legend */}
            <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
              {BADGE_LEGEND.map((badge) => (
                <div key={badge.label} className="flex items-center gap-1">
                  <span
                    className={`h-2.5 w-2.5 rounded-full border ${badge.style}`}
                  ></span>
                  {badge.label}
                </div>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 p-1 rounded-full border border-black/20 bg-black/5 dark:border-[#00FFB3]/20 dark:bg-white/5 backdrop-blur-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveProject(null);
                  }}
                  className={`px-4 py-1 rounded-full text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white dark:bg-[#00FFB3] dark:text-black"
                      : "text-gray-700 hover:text-black dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid / Preview */}
        <LayoutGroup>
          <AnimatePresence mode="wait">
            {!activeProject ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    layoutId={`card-${proj.id}`}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={cardVariants}
                    onClick={() => setActiveProject(proj)}
                    className="relative group cursor-pointer h-56 rounded-xl overflow-hidden border border-black/20 bg-gradient-to-t from-gray-200/60 via-gray-100/30 to-transparent shadow-[0_0_12px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] dark:border-[#00FFB3]/30 dark:from-black/60 dark:via-black/30 dark:to-transparent dark:shadow-[0_0_12px_#00FFB3]/30 dark:hover:shadow-[0_0_35px_#00FFB3]/70 transition-all duration-500"
                  >
                    {/* Banner reveal */}
                    <motion.img
                      variants={bannerVariants}
                      initial="rest"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      src={
                        proj.banner ??
                        "https://via.placeholder.com/1200x600.png?text=No+Banner"
                      }
                      alt={`${proj.title} banner`}
                    />

                    <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm" />

                    {proj.badge && (
                      <div className="absolute top-3 right-3 z-20">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider backdrop-blur-md ${
                            BADGE_STYLES[proj.badge] ??
                            "border border-blue-600/50 text-blue-600 bg-white/40"
                          }`}
                        >
                          {proj.badge}
                        </span>
                      </div>
                    )}

                    <div className="relative z-30 h-full p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold leading-tight text-black group-hover:text-blue-600 dark:text-white dark:group-hover:text-[#00FFB3] transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
                          {proj.short}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex gap-2">
                          {proj.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-1 rounded-full bg-black/5 text-gray-800 dark:bg-white/10 dark:text-gray-200 flex items-center gap-1"
                            >
                              {TECH_ICONS[t] ?? "🔧"} {t}
                            </span>
                          ))}
                        </div>
                        <div className="text-gray-500 dark:text-white/40 text-xs">
                          View →
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Left: details */}
                <motion.div
                  layoutId={`card-${activeProject.id}`}
                  className="rounded-xl p-8 bg-white/80 border border-black/20 shadow-[0_0_15px_rgba(37,99,235,0.3)] dark:bg-white/5 dark:border-[#00FFB3]/30 dark:shadow-[0_0_20px_#00FFB3]/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-bold text-black dark:text-white">
                          {activeProject.title}
                        </h2>
                        <p className="text-blue-600 dark:text-[#00FFB3] mt-2">
                          {activeProject.short}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        {activeProject.github && (
                          <a
                            href={activeProject.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-700 hover:text-blue-600 dark:text-white/80 dark:hover:text-[#00FFB3]"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {activeProject.live && (
                          <a
                            href={activeProject.live}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-700 hover:text-blue-600 dark:text-white/80 dark:hover:text-[#00FFB3]"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {activeProject.badge && (
                      <div className="mt-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${
                            BADGE_STYLES[activeProject.badge] ??
                            "border border-blue-600/50 text-blue-600 bg-white/40"
                          }`}
                        >
                          {activeProject.badge}
                        </span>
                      </div>
                    )}

                    {activeProject.long && (
                      <p className="text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">
                        {activeProject.long}
                      </p>
                    )}

                    {activeProject.impact && (
                      <p className="mt-4 text-blue-600 dark:text-[#00FFB3] italic font-medium">
                        Impact: {activeProject.impact}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-6">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-black/5 text-sm text-gray-800 dark:bg-white/10 dark:text-gray-200 flex items-center gap-1"
                        >
                          {TECH_ICONS[t] ?? "🔧"} {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition dark:border-[#00FFB3] dark:text-[#00FFB3] dark:hover:bg-[#00FFB3] dark:hover:text-black"
                      >
                      <Github size={16} className="inline mr-2" /> View Code
                      </a>
                    )}

                    {activeProject.live ? (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition dark:border-[#00FFB3] dark:text-[#00FFB3] dark:hover:bg-[#00FFB3] dark:hover:text-black"
                      >
                        <ExternalLink size={16} className="inline mr-2" />
                        Live Demo
                      </a>
                    ) : (
                      <span className="px-4 py-2 rounded-full bg-black/5 text-gray-600 dark:bg-white/5 dark:text-gray-400 cursor-not-allowed">
                        <ExternalLink size={16} className="inline mr-2" /> No
                        Live Demo
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Right: Banner and Close Button */}
                <motion.div
                  key="preview-right"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative rounded-xl overflow-hidden h-72 lg:h-auto"
                >
                  <img
                    src={
                      activeProject.banner ??
                      "https://via.placeholder.com/1200x600.png?text=No+Banner"
                    }
                    alt={`${activeProject.title} banner`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm text-black dark:bg-black/30 dark:hover:bg-black/50 dark:text-white transition-colors"
                    aria-label="Close project preview"
                  >
                    <X size={24} />
                  </button>
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
