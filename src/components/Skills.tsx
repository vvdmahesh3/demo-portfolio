import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython, SiJavascript, SiC, SiHtml5, SiCss,
  SiReact, SiFlask, SiDjango, SiTailwindcss, SiBootstrap,
  SiGit, SiGithub, SiFigma, SiMysql, SiSqlite, SiMongodb, SiFirebase,
  SiPandas, SiNumpy, SiScikitlearn, SiGoogleanalytics,
  SiCplusplus, SiLeetcode
} from "react-icons/si";
import { Cloud, Brain, Target, Zap, Search, Code2, Database, Film, Pen, Image as ImageIcon, BarChart3 } from "lucide-react"; 
import type { IconType } from "react-icons";

// ---------------------- Project Data ----------------------
const PROJECTS = [
  { title: "Rythmize", tech: ["Python", "Tkinter"] },
  { title: "Placement Tracker", tech: ["React", "Firebase", "Tailwind CSS"] },
  { title: "Faculty Management System", tech: ["Flask", "SQLite", "Bootstrap"] },
  { title: "Smart Attendance", tech: ["React", "Node.js", "MongoDB"] },
  { title: "Portfolio Website", tech: ["React", "Framer Motion", "Tailwind CSS"] },
  { title: "SoloPro", tech: ["React", "AI", "Node.js"] },
  { title: "GAN Playground", tech: ["Python", "TensorFlow", "Keras"] },
  { title: "DNA Skills Visualizer", tech: ["Three.js", "WebGL", "React"] },
];

interface Skill {
  name: string;
  tagline: string;
  icon: IconType;
  color: string;
  level?: number; 
}

const HtmlCssIcon: IconType = () => (
  <div className="flex gap-1 items-center">
    <SiHtml5 className="text-[#E44D26]" />
    <SiCss className="text-[#1572B6]" />
  </div>
);

const SKILLS: Record<string, Skill[]> = {
  Languages: [
    { name: "Python", tagline: "Powering AI & automation", icon: SiPython, color: "#3776AB", level: 90 },
    { name: "JavaScript", tagline: "Interactive web logic", icon: SiJavascript, color: "#F7DF1E", level: 85 },
    { name: "HTML/CSS", tagline: "Web structure & styling", icon: HtmlCssIcon, color: "#E44D26", level: 95 },
  ],
  Frameworks: [
    { name: "React", tagline: "Crafting dynamic UIs", icon: SiReact, color: "#61DAFB", level: 85 },
    { name: "Django", tagline: "Full-stack web apps", icon: SiDjango, color: "#092E20", level: 75 },
    { name: "Tailwind CSS", tagline: "Utility-first styling", icon: SiTailwindcss, color: "#38B2AC", level: 90 },
  ],
  "Problem Solving Core": [
    { name: "C", tagline: "Low-level fundamentals", icon: SiC, color: "#A8B9CC", level: 75 },
    { name: "C++", tagline: "Performance systems", icon: SiCplusplus, color: "#00599C", level: 80 },
    { name: "DSA", tagline: "Algorithmic thinking", icon: SiLeetcode, color: "#FFA116", level: 85 },
  ],
  "AI & ML": [
    { name: "Pandas", tagline: "Data manipulation", icon: SiPandas, color: "#150458", level: 85 },
    { name: "NumPy", tagline: "Numerical computing", icon: SiNumpy, color: "#013243", level: 80 },
    { name: "Scikit-learn", tagline: "Machine learning", icon: SiScikitlearn, color: "#F7931E", level: 75 },
  ],
  "Creative Tools": [
    { name: "Premiere Pro", tagline: "Video editing", icon: Film as unknown as IconType, color: "#9999FF" },
    { name: "After Effects", tagline: "Motion graphics", icon: Film as unknown as IconType, color: "#CF96FD" },
    { name: "Photoshop", tagline: "Visual design", icon: ImageIcon as unknown as IconType, color: "#31A8FF" },
    { name: "Illustrator", tagline: "Vector art", icon: Pen as unknown as IconType, color: "#FF9A00" },
    { name: "Figma", tagline: "UI/UX prototyping", icon: SiFigma, color: "#F24E1E" },
  ],
};

const MINDSET = [
  { label: "Leadership", icon: Target, color: "#3B82F6" },
  { label: "Ownership", icon: Brain, color: "#10B981" },
  { label: "Execution", icon: Zap, color: "#F59E0B" },
  { label: "Curiosity", icon: Search, color: "#8B5CF6" },
];

const CATEGORIES = ["All", ...Object.keys(SKILLS)];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? SKILLS : { [activeCategory]: SKILLS[activeCategory] };

  return (
    <section id="skills" className="relative py-24 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-700">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Ownership Bar - High Signal */}
        <div className="flex flex-wrap justify-center gap-8 mb-20 border-b border-gray-100 dark:border-white/5 pb-12">
          {MINDSET.map((item) => (
            <div key={item.label} className="flex items-center gap-3 group">
              <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-[#00FFB3] transition-colors" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
            Execution <span className="text-blue-600 dark:text-[#00FFB3]">&</span> Strategy
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
            A balanced stack of core engineering, data intelligence, and creative execution.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-16 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative overflow-hidden px-6 py-3 rounded-xl border text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-[#00FFB3] dark:text-black dark:border-[#00FFB3] shadow-[0_0_20px_rgba(0,100,255,0.2)] dark:shadow-[0_0_30px_rgba(0,255,179,0.3)] scale-105"
                  : "bg-white dark:bg-zinc-900/40 border-zinc-200 text-zinc-500 dark:border-white/10 dark:text-white/40 hover:border-blue-500 dark:hover:border-[#00FFB3] hover:text-blue-600 dark:hover:text-[#00FFB3]"
              }`}
            >
              {activeCategory === cat && (
                <motion.div layoutId="activeCategoryGlow" className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 dark:from-[#00FFB3]/50 dark:to-cyan-400/50 blur-md pointer-events-none" />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-20">
            {Object.entries(filtered).map(([category, skills]) => (
              <div key={category}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-gray-200 dark:to-white/10" />
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-[#00FFB3]">
                    {category}
                  </h3>
                  <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-gray-200 dark:to-white/10" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {skills.map((skill) => {
                    const Icon = skill.icon;
                    const projectCount = PROJECTS.filter((p) => p.tech.includes(skill.name)).length;

                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="group relative overflow-hidden p-6 rounded-3xl bg-zinc-50/80 dark:bg-black/40 border border-zinc-200 dark:border-white/10 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-[#00FFB3]/10 transition-all duration-500"
                      >
                        {/* Inner Ambient Glow */}
                        <div className="absolute -inset-10 bg-gradient-to-tr from-transparent via-blue-500/10 to-transparent dark:via-[#00FFB3]/10 opacity-0 group-hover:opacity-100 blur-[30px] transition-opacity duration-700 pointer-events-none" />

                        {skill.level ? (
                          <div className="absolute top-3 right-3">
                             <div className="text-[10px] font-bold text-gray-300 dark:text-white/20 group-hover:text-blue-500 dark:group-hover:text-[#00FFB3]">
                               {skill.level}%
                             </div>
                          </div>
                        ) : (
                          <Zap className="absolute top-3 right-3 w-3 h-3 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}

                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 relative">
                             <Icon style={{ color: skill.color }} className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                             <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: skill.color }} />
                          </div>
                          
                          <span className="text-sm font-bold text-gray-700 dark:text-white mb-1">
                            {skill.name}
                          </span>
                          <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {projectCount > 0 ? `Used in ${projectCount} Projects` : skill.tagline}
                          </span>
                        </div>
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