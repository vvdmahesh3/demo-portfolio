import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { Github, ExternalLink, X, ArrowRight, Target, Lightbulb, BookOpen, Layers, GraduationCap } from "lucide-react";

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
  Completed: "border-green-200 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400",
  Active: "border-blue-200 bg-blue-50 text-blue-700 dark:border-[#00FFB3]/30 dark:bg-[#00FFB3]/10 dark:text-[#00FFB3]",
  Showcase: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-400",
  "🎓 Diploma": "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400",
};

// ---------------------- Project Data ----------------------
const PROJECTS: Project[] = [
  {
    id: "pythonic-quiz",
    title: "Pythonic Quiz",
    short: "A comprehensive diploma final year project focused on redefining interactive learning. This application utilizes core Python concepts to create a dynamic, engaging quiz environment that transforms traditional static testing into an interactive experience, drastically improving student engagement and knowledge retention.",
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
    short: "A sleek, distraction-free music exploration platform designed to prioritize user experience. WorkFreeMusic cuts through the clutter of modern streaming apps by offering a minimalist, intuitive interface for accessing music resources effortlessly. Built to optimize frontend performance and streamline continuous deployment workflows.",
    story: {
      problem: "Many music platforms are cluttered and complex for quick access.",
      solution: "Built a platform with a simple, clean, and user-friendly interface.",
      purpose: "Created to improve frontend development skills and deployment workflow experience.",
      learned: "Advanced React concepts, state management, and frontend deployment workflows.",
    },
    category: "Web Dev",
    tech: ["React", "CSS", "Frontend Dev"],
    badge: "Completed",
    github: "https://github.com/vvdmahesh3/WorkFreeMusic",
    live: "https://workfreemusic.netlify.app",
    stats: { label: "UX Rating", value: "Minimal" },
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "placement-tracker",
    title: "Placement Tracker Dashboard",
    short: "An end-to-end administrative dashboard engineered specifically for the Strides Event to solve the chaos of manual placement tracking. It centralizes student records, streamlines filtering, and visualizes placement data in real-time, completely eliminating the inefficiencies of disorganized manual data management.",
    story: {
      problem: "Managing student placement data manually was inefficient and disorganized.",
      solution: "Developed a centralized dashboard to organize, filter, and track records efficiently.",
      purpose: "Built to simplify management of student placement data.",
      learned: "Data visualization, state management, and building intuitive administrative dashboards.",
    },
    category: "Web Dev",
    tech: ["React", "Firebase", "Data Visualization"],
    badge: "Completed",
    github: "https://github.com/vvdmahesh3/Placement-Tracker-Dashboard",
    live: "https://vvdmahesh3.github.io/Placement-Tracker-Dashboard/",
    stats: { label: "Data Organized", value: "100%" },
    banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "gdg-playground",
    title: "GDG 2025 Challenge Playground",
    short: "A dedicated, interactive web-based coding playground built for the GDG 2025 challenge. This environment was engineered to facilitate rapid prototyping, hands-on experimentation, and practical code execution, providing a seamless interface for developing and testing complex technical solutions on the fly.",
    story: {
      problem: "Needed a dedicated environment for coding challenges and experimentation.",
      solution: "Developed a web-based playground optimized for coding implementations.",
      purpose: "Hands-on learning and challenge participation.",
      learned: "Rapid prototyping, integrating code execution contexts, and interactive UI.",
    },
    category: "Web Dev",
    tech: ["HTML", "CSS", "JavaScript"],
    badge: "Active",
    github: "https://github.com/vvdmahesh3/GDG-Code-Playground",
    live: "https://gdgcodeplayground.netlify.app",
    stats: { label: "Challenges", value: "Multiple" },
    banner: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "carbon-footprint",
    title: "Carbon Footprint Project",
    short: "An impactful environmental awareness application designed to bridge the gap between daily habits and climate impact. It features an interactive calculation engine that helps users accurately measure, visualize, and understand their individual carbon footprint, promoting actionable, sustainable lifestyle changes through data.",
    story: {
      problem: "Lack of awareness regarding individual carbon footprint and sustainability.",
      solution: "Created an interactive tool that helps users understand and calculate their impacts.",
      purpose: "Promote awareness of sustainable practices.",
      learned: "Complex data calculation logic, and designing for social impact.",
    },
    category: "Web Dev",
    tech: ["React", "State Management"],
    badge: "Completed",
    live: "https://eco-home-footprint-tracker.lovable.app",
    stats: { label: "Impact Area", value: "Environment" },
    banner: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "fms",
    title: "Faculty Management System (FMS)",
    short: "A robust, full-stack Faculty Management System engineered to completely overhaul academic administration. By implementing smart automation modules for attendance, assignments, and record tracking, FMS drastically reduces manual administrative workload, allowing educators to focus entirely on teaching and student development.",
    story: {
      problem: "Faculty were overwhelmed by manual academic management tasks and tracking.",
      solution: "Designed smart automation modules for attendance, assignments, and tracking.",
      purpose: "Built to solve real faculty workflow problems.",
      learned: "Full-stack architecture, secure database management, and role-based access control.",
    },
    category: "Full Stack",
    tech: ["Python", "Flask", "SQLite", "Auth"],
    badge: "Active",
    github: "https://github.com/vvdmahesh3/FMS",
    live: "https://fms-7vhd.onrender.com/",
    stats: { label: "Workload Reduced", value: "Smart Auto" },
    banner: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mediq",
    title: "MediQ",
    short: "A complex healthcare intelligence platform. Due to deployment complexity, a dedicated showcase website was built to present its concept, architecture, and capabilities to the audience. This project highlights a deep intersection of technology and creative presentation.",
    story: {
      problem: "Healthcare systems lack intelligent, real-time decision support, making it hard for both patients and providers to access the right information quickly.",
      solution: "Designed MediQ as a healthcare intelligence platform. Built a full showcase website to communicate the concept, system architecture, and feature set to stakeholders and viewers.",
      purpose: "To explore the intersection of AI and healthcare — and to demonstrate that even complex, undeployed systems deserve a professional presentation.",
      learned: "System design for healthcare domains, advanced UI/UX storytelling, visual hierarchy for complex concepts, and how to present ideas professionally even when deployment isn't possible.",
    },
    category: "Healthcare · AI Concept",
    tech: ["HTML", "CSS", "JS", "AI Concept"],
    badge: "Showcase",
    github: "https://github.com/vvdmahesh3/MediQ",
    live: "https://vvdmahesh3.github.io/MediQ_ShowCasewebsite/",
    stats: { label: "Domain", value: "Healthcare" },
    banner: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "crisissignal-ai",
    title: "CrisisSignal AI",
    short: "An intelligent, AI-powered emergency support platform designed to provide critical assistance when seconds matter. CrisisSignal leverages advanced artificial intelligence and real-time data processing to offer immediate, context-aware guidance during crisis situations, demonstrating the profound real-world impact of applied AI technologies.",
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

// ---------------------- Components ----------------------

const ProjectCard = ({ proj, idx, onClick }: { proj: Project, idx: number, onClick: (p: Project) => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layoutId={`card-container-${proj.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      onClick={() => onClick(proj)}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col bg-white dark:bg-zinc-900/30 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1.5"
    >
      {/* Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 255, 179, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Container holding the actual content to ensure border radius is respected */}
      <div className="relative h-full flex flex-col overflow-hidden rounded-2xl z-10 bg-white dark:bg-[#0a0a0a]">
        {/* Perfect Aspect Ratio Image Section */}
        <div className="w-full aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-950">
          <motion.img
            layoutId={`card-image-${proj.id}`}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            src={proj.banner}
            alt={proj.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge Overlay */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${BADGE_STYLES[proj.badge] || BADGE_STYLES["Completed"]}`}>
              {proj.badge}
            </span>
          </div>
        </div>

        {/* Card Content Section */}
        <div className="p-5 md:p-6 flex flex-col flex-grow">
          <div className="mb-2">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-[#00FFB3]">
               {proj.category}
             </span>
          </div>
          
          <motion.h3 
            layoutId={`card-title-${proj.id}`}
            className="text-lg md:text-xl font-black text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-[#00FFB3] transition-colors line-clamp-1"
          >
            {proj.title}
          </motion.h3>
          
          {/* Scrollable text container without visible scrollbar */}
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-4 h-[4.5rem] overflow-y-auto hide-scrollbar">
            {proj.short}
          </p>

          <div className="mt-auto">
            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {proj.tech.slice(0, 3).map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[9px] font-bold tracking-wide text-zinc-600 dark:text-zinc-300">
                  {t}
                </span>
              ))}
              {proj.tech.length > 3 && (
                <span className="px-2 py-0.5 rounded bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[9px] font-bold tracking-wide text-zinc-500">
                  +{proj.tech.length - 3}
                </span>
              )}
            </div>

            {/* Footer interaction cue & Links */}
            <div className="flex items-center justify-between border-t border-zinc-100 dark:border-white/10 pt-3 relative z-30">
              <div className="flex items-center gap-3">
                {proj.github && (
                  <a 
                    href={proj.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()} 
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
                    title="Source Code"
                  >
                    <Github size={14} />
                  </a>
                )}
                {proj.live && (
                  <a 
                    href={proj.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()} 
                    className="text-zinc-400 hover:text-blue-600 dark:hover:text-[#00FFB3] transition-colors p-1"
                    title="Live Preview"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white flex items-center gap-2 group-hover:text-blue-600 dark:group-hover:text-[#00FFB3] transition-colors">
                Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveProject(null); };
    window.addEventListener("keydown", onEsc);
    // Prevent body scrolling when a project is open
    if (activeProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [activeProject]);

  return (
    <section id="projects" ref={containerRef} className="relative z-30 py-24 px-4 md:px-6 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-700">
      
      {/* Global Style for hiding scrollbar visually but keeping functionality */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Custom scrollbar for modal */
        .modal-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 10px;
        }
        .dark .modal-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Subtle Background Effects */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-100/40 dark:bg-[#00FFB3]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/40 dark:bg-blue-500/5 rounded-full blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Creative Header */}
        <div className="mb-12 md:mb-16 flex flex-col items-center text-center relative">
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-[#00FFB3]/20 to-transparent"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-[#00FFB3]/20 bg-blue-50 dark:bg-[#00FFB3]/5 text-blue-700 dark:text-[#00FFB3] text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm"
            >
               <Layers size={14} /> Portfolio Showcase
            </motion.div>

            <div className="relative mb-4">
              {/* Glow behind heading */}
              <div className="absolute -inset-4 bg-blue-100/50 dark:bg-[#00FFB3]/5 blur-2xl rounded-full" />
              <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-[0.9]">
                <span className="block">Featured</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400">Projects.</span>
              </h2>
            </div>

            {/* Animated underline bar */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400 rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-lg text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed"
            >
              Each project here is a chapter in my story — built through curiosity, shaped by challenges, and driven by the need to solve real problems.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 mt-8"
            >
              {[
                { value: "8+", label: "Projects" },
                { value: "10+", label: "Deployments" },
                { value: "15+", label: "Technologies" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-black text-zinc-900 dark:text-white">{s.value}</div>
                  <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((proj, idx) => (
            <ProjectCard key={proj.id} proj={proj} idx={idx} onClick={setActiveProject} />
          ))}
        </div>
      </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 z-40 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-container-${activeProject.id}`}
                className="w-full max-w-6xl h-[95vh] bg-white dark:bg-[#0a0a0a] rounded-3xl md:rounded-[40px] shadow-2xl border border-zinc-200 dark:border-white/10 overflow-hidden flex flex-col lg:flex-row pointer-events-auto"
              >
                {/* LEFT: Full-height image with overlay info */}
                <div className="relative w-full lg:w-[45%] flex-shrink-0 h-64 lg:h-full overflow-hidden">
                  <motion.img
                    layoutId={`card-image-${activeProject.id}`}
                    src={activeProject.banner}
                    alt={activeProject.title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Bottom overlay: badge + tech + actions */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col gap-4">
                    <span className={`self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${BADGE_STYLES[activeProject.badge] || BADGE_STYLES["Completed"]}`}>
                      {activeProject.badge}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-1">
                      {activeProject.live && (
                        <a
                          href={activeProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 dark:bg-[#00FFB3] text-white dark:text-black font-black uppercase tracking-wider text-xs hover:scale-105 transition-transform shadow-lg"
                        >
                          <ExternalLink size={14} /> Live
                        </a>
                      )}
                      {activeProject.github && (
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white font-black uppercase tracking-wider text-xs border border-white/20 hover:bg-white/20 transition-colors"
                        >
                          <Github size={14} /> Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Close on mobile */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="lg:hidden absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* RIGHT: Rich storytelling panel */}
                <div className="flex-1 w-full lg:w-[55%] min-h-0 h-full relative overflow-hidden">
                  <div className="absolute inset-0 overflow-y-auto overscroll-contain p-6 md:p-10 modal-scrollbar">
                    {/* Close on desktop */}
                    <button
                      onClick={() => setActiveProject(null)}
                      className="hidden lg:flex absolute top-6 right-6 p-2.5 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors z-50"
                    >
                      <X size={18} />
                    </button>

                    {/* Title block */}
                    <div className="mb-8 pr-12 mt-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-[#00FFB3] mb-2 block">
                        {activeProject.category}
                      </span>
                      <motion.h2
                        layoutId={`card-title-${activeProject.id}`}
                        className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-tight mb-3"
                      >
                        {activeProject.title}
                      </motion.h2>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{activeProject.short}</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-zinc-100 dark:bg-white/10 mb-8" />

                    {/* Story Grid - Staggered Animations */}
                    <div className="space-y-8 pb-4">
                      {/* Purpose block */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-5 rounded-2xl bg-blue-50 dark:bg-[#00FFB3]/5 border border-blue-100 dark:border-[#00FFB3]/15 mb-6"
                      >
                        <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-[#00FFB3] mb-2">
                          <Target size={14} /> Why This Exists
                        </h4>
                        <p className="text-zinc-700 dark:text-zinc-200 font-medium text-sm leading-relaxed">
                          {activeProject.story.purpose}
                        </p>
                      </motion.div>

                      {/* Problem & Solution — side by side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/8"
                        >
                          <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                            <BookOpen size={14} /> The Challenge
                          </h4>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{activeProject.story.problem}</p>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/8"
                        >
                          <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                            <Lightbulb size={14} /> My Approach
                          </h4>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{activeProject.story.solution}</p>
                        </motion.div>
                      </div>

                      {/* Takeaways */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/8"
                      >
                        <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                          <GraduationCap size={14} /> What I Gained
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{activeProject.story.learned}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;