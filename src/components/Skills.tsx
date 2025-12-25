import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython, SiJavascript, SiOracle, SiC, SiHtml5, SiCss3,
  SiReact, SiFlask, SiDjango, SiTailwindcss, SiBootstrap,
  SiGit, SiGithub, SiFigma, SiMysql, SiSqlite, SiMongodb, SiFirebase,
  SiPandas, SiNumpy, SiScikitlearn, SiGoogleanalytics, SiD3Dotjs,
  SiAdobeaftereffects, SiAdobepremierepro, SiAdobephotoshop, SiAdobeillustrator,
  SiCplusplus, SiLeetcode
} from "react-icons/si";
import { Cloud, Brain, Target, Zap, Search, Code2 } from "lucide-react"; 
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
    <SiCss3 className="text-[#1572B6]" />
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
    { name: "Premiere Pro", tagline: "Video editing", icon: SiAdobepremierepro, color: "#9999FF" },
    { name: "After Effects", tagline: "Motion graphics", icon: SiAdobeaftereffects, color: "#CF96FD" },
    { name: "Photoshop", tagline: "Visual design", icon: SiAdobephotoshop, color: "#31A8FF" },
    { name: "Illustrator", tagline: "Vector art", icon: SiAdobeillustrator, color: "#FF9A00" },
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
    <section id="skills" className="relative py-24 overflow-hidden bg-white dark:bg-black transition-colors duration-700">
      
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
              className={`px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 dark:bg-[#00FFB3] dark:text-black dark:border-[#00FFB3] shadow-lg shadow-blue-500/20 dark:shadow-[#00FFB3]/20"
                  : "border-gray-200 text-gray-400 dark:border-white/10 dark:text-white/40 hover:border-blue-500 dark:hover:border-[#00FFB3]"
              }`}
            >
              {cat}
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
                        whileHover={{ y: -5 }}
                        className="group relative p-6 rounded-2xl bg-gray-50/50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-blue-500/50 dark:hover:border-[#00FFB3]/50 transition-all duration-500"
                      >
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