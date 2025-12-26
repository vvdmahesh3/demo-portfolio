"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, FlaskConical, MousePointer2 } from "lucide-react";
import { useTheme } from "next-themes";

/* ------------------ NAV ITEMS ------------------ */
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  onMClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHint, setShowHint] = useState(false); // 🔥 Hint State
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // 🔥 Trigger hint 1.5s after load, hide after 8s
    const timer = setTimeout(() => setShowHint(true), 1500);
    const hideTimer = setTimeout(() => setShowHint(false), 9500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  /* -------- Active Section Tracking -------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
    );
    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* ---------- M BUTTON (WITH PERFECTLY ALIGNED HINT) ---------- */}
          <div className="relative">
             {/* 🔥 THE HINT (Now part of the same div as M) */}
             <AnimatePresence>
              {showHint && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                  {/* The Glow Aura exactly centered on M */}
                  <div className="absolute w-12 h-12 rounded-full bg-[#00FFB3]/20 animate-aura border border-[#00FFB3]/30" />
                  
                  {/* The Tooltip positioned perfectly below */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/90 dark:bg-zinc-900 border border-[#00FFB3]/30 px-3 py-1 rounded-full backdrop-blur-md shadow-2xl min-w-max">
                    <MousePointer2 className="w-3 h-3 text-[#00FFB3]" />
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#00FFB3] font-bold">
                      Initialize System
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => {
                onMClick();
                setShowHint(false); // Hide hint on click
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative text-2xl font-black text-black dark:text-[#00FFB3] cursor-pointer group z-10"
              aria-label="Open Experimental Lab"
            >
              M
              <span className="absolute -top-1 -right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <FlaskConical size={10} className="text-[#00FFB3] animate-pulse" />
              </span>
            </motion.button>
          </div>

          {/* ---------- DESKTOP NAV ---------- */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-mono text-xs uppercase tracking-widest font-bold ${
                  activeSection === item.id
                    ? "text-black dark:text-[#00FFB3]"
                    : "text-zinc-500 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-black dark:bg-[#00FFB3] rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* ---------- RIGHT CONTROLS ---------- */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:scale-110 transition"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-900" />
              )}
            </button>
            <button
              className="md:hidden p-2 text-zinc-500 hover:text-black dark:hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-2xl font-black uppercase tracking-tight ${
                  activeSection === item.id
                    ? "text-black dark:text-[#00FFB3]"
                    : "text-zinc-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;