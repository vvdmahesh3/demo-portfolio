// src/components/Skills.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython, SiJavascript, SiOracle, SiC, SiHtml5, SiCss3,
  SiReact, SiFlask, SiDjango, SiTailwindcss, SiBootstrap,
  SiGit, SiGithub, SiFigma, SiMysql, SiSqlite, SiMongodb, SiFirebase,
  SiPandas, SiNumpy, SiScikitlearn, SiGoogleanalytics, SiD3Dotjs,
} from "react-icons/si";
import { Cloud } from "lucide-react"; // AWS
import type { IconType } from "react-icons";

// ---------------------- Project Data (imported manually) ----------------------
const PROJECTS = [
  { title: "Rythmize", tech: ["Python", "Tkinter"] },
  { title: "Placement Tracker", tech: ["React", "Firebase", "Tailwind CSS"] },
  { title: "Faculty Management System", tech: ["Flask", "SQLite", "Bootstrap"] },
  { title: "Smart Attendance", tech: ["React", "Node.js", "MongoDB"] },
  { title: "Portfolio Website", tech: ["React", "Framer Motion", "Tailwind CSS"] },
  { title: "Blog Platform", tech: ["React", "Node.js", "MongoDB", "Express"] },
  { title: "SoloPro", tech: ["React", "AI", "Node.js"] },
  { title: "GAN Playground", tech: ["Python", "TensorFlow", "Keras"] },
  { title: "Weather API", tech: ["React", "OpenWeather API", "Chart.js"] },
  { title: "GitHub Analyzer", tech: ["React", "GitHub API", "D3.js"] },
  { title: "DNA Skills Visualizer", tech: ["Three.js", "WebGL", "React"] },
];

interface Skill {
  name: string;
  tagline: string;
  icon: IconType;
  color: string;
  level: number; // % proficiency
}

const HtmlCssIcon: IconType = () => (
  <div className="flex gap-1 items-center">
    <SiHtml5 className="text-[#E44D26]" />
    <SiCss3 className="text-[#1572B6]" />
  </div>
);

const SKILLS: Record<string, Skill[]> = {
  Languages: [
    { name: "Python", tagline: "Powering AI & automation", icon: SiPython, color: "#3776AB", level: 90 },
    { name: "JavaScript", tagline: "Interactive web logic", icon: SiJavascript, color: "#F7DF1E", level: 85 },
    { name: "Java", tagline: "Strong typed systems", icon: SiOracle, color: "#007396", level: 70 },
    { name: "C", tagline: "Low-level fundamentals", icon: SiC, color: "#00599C", level: 65 },
    { name: "HTML/CSS", tagline: "Web structure & styling", icon: HtmlCssIcon, color: "#E44D26", level: 95 },
  ],
  Frameworks: [
    { name: "React", tagline: "Crafting dynamic UIs", icon: SiReact, color: "#61DAFB", level: 85 },
    { name: "Flask", tagline: "Minimal web APIs", icon: SiFlask, color: "#000000", level: 70 },
    { name: "Django", tagline: "Full-stack web apps", icon: SiDjango, color: "#092E20", level: 75 },
    { name: "Tailwind CSS", tagline: "Utility-first styling", icon: SiTailwindcss, color: "#38B2AC", level: 90 },
    { name: "Bootstrap", tagline: "Responsive design", icon: SiBootstrap, color: "#7952B3", level: 80 },
  ],
  Tools: [
    { name: "Git", tagline: "Version control", icon: SiGit, color: "#F05032", level: 85 },
    { name: "GitHub", tagline: "Collaboration hub", icon: SiGithub, color: "#181717", level: 90 },
    { name: "Figma", tagline: "UI/UX prototyping", icon: SiFigma, color: "#F24E1E", level: 70 },
    { name: "AWS", tagline: "Cloud deployment", icon: Cloud, color: "#FF9900", level: 60 },
  ],
  Databases: [
    { name: "MySQL", tagline: "Relational storage", icon: SiMysql, color: "#4479A1", level: 80 },
    { name: "SQLite", tagline: "Lightweight DB", icon: SiSqlite, color: "#003B57", level: 75 },
    { name: "MongoDB", tagline: "Document store", icon: SiMongodb, color: "#47A248", level: 70 },
    { name: "Firebase", tagline: "Realtime backend", icon: SiFirebase, color: "#FFCA28", level: 65 },
  ],
  "AI & ML": [
    { name: "Pandas", tagline: "Data manipulation", icon: SiPandas, color: "#150458", level: 85 },
    { name: "NumPy", tagline: "Numerical computing", icon: SiNumpy, color: "#013243", level: 80 },
    { name: "Scikit-learn", tagline: "Machine learning", icon: SiScikitlearn, color: "#F7931E", level: 75 },
    { name: "Matplotlib", tagline: "Data visualization", icon: SiGoogleanalytics, color: "#000000", level: 70 },
    { name: "Seaborn", tagline: "Statistical plots", icon: SiD3Dotjs, color: "#F24E1E", level: 65 },
  ],
};

const CATEGORIES = ["All", ...Object.keys(SKILLS)];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? SKILLS
      : { [activeCategory]: SKILLS[activeCategory as keyof typeof SKILLS] };

  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden 
                 bg-gradient-to-br from-white via-gray-100 to-gray-200 
                 dark:from-black dark:via-black dark:to-gray-900 
                 transition-colors duration-700"
    >
      {/* Glow Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full 
                        bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_70%)] 
                        dark:bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.12),transparent_70%)] 
                        animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
            Beyond Code —{" "}
            <span className="text-blue-600 dark:text-[#00FFB3]">
              My Skillset
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Tools, frameworks, and languages that power my creativity & execution.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 dark:bg-[#00FFB3] dark:text-black dark:border-[#00FFB3]"
                  : "border-black/20 text-gray-800 hover:border-blue-600 hover:text-blue-600 dark:border-white/20 dark:text-white dark:hover:border-[#00FFB3] dark:hover:text-[#00FFB3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-14"
          >
            {Object.entries(filtered).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-sm md:text-base font-semibold mb-4 
                               text-blue-600 dark:text-[#00FFB3] uppercase tracking-wide">
                  {category}
                </h3>
                <div className="flex gap-5 flex-wrap">
                  {skills.map((skill) => {
                    const Icon = skill.icon;
                    const projectCount = PROJECTS.filter((p) =>
                      p.tech.includes(skill.name)
                    ).length;

                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className="group relative min-w-[150px] px-4 py-6 rounded-xl 
                                   bg-gradient-to-br from-white/80 to-gray-100/70 border border-blue-200 text-center 
                                   dark:from-black/80 dark:to-gray-900/70 dark:border-[#00FFB388] 
                                   shadow-[0_0_12px_rgba(37,99,235,0.1)] dark:shadow-[0_0_12px_rgba(0,255,179,0.1)] 
                                   hover:shadow-[0_0_18px_rgba(37,99,235,0.6),0_0_30px_rgba(37,99,235,0.3)] 
                                   dark:hover:shadow-[0_0_18px_#00FFB3,0_0_30px_rgba(0,255,179,0.4)]"
                      >
                        {/* Progress Ring */}
                        <div className="relative w-16 h-16 mb-3 mx-auto">
                          <svg
                            className="absolute inset-0 w-full h-full -rotate-90"
                            viewBox="0 0 36 36"
                          >
                            <path
                              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                              stroke="rgba(0,0,0,0.1)"
                              strokeWidth="3"
                              fill="none"
                              className="dark:stroke-white/10"
                            />
                            <motion.path
                              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                              stroke={skill.color}
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: skill.level / 100 }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon style={{ color: skill.color, fontSize: "1.6rem" }} />
                          </div>
                        </div>

                        {/* Skill Name */}
                        <span className="font-semibold text-sm text-gray-800 dark:text-white">
                          {skill.name}
                        </span>

                        {/* Tooltip */}
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.25 }}
                            className="absolute left-1/2 -bottom-14 transform -translate-x-1/2 px-3 py-1.5 rounded-md 
                                       bg-white/90 border border-blue-500/40 text-[11px] text-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] 
                                       dark:bg-black/80 dark:border-[#00FFB3]/50 dark:text-[#00FFB3] dark:shadow-[0_0_10px_rgba(0,255,179,0.4)] 
                                       opacity-0 group-hover:opacity-100"
                          >
                            {`${skill.level}% • Used in ${projectCount} Project${
                              projectCount !== 1 ? "s" : ""
                            }`}
                          </motion.div>
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
