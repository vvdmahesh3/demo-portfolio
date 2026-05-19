"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, FlaskConical, MousePointer2, Zap } from "lucide-react";
import { useTheme } from "next-themes";

/* ------------------ NAV ITEMS ------------------ */
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "coding-profiles", label: "Profiles" },
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
  const [showHint, setShowHint] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  /* -------- Robust Active Section Tracking & Scroll Detection -------- */
  useEffect(() => {
    const handleScroll = () => {
      // 1. Detect scroll for Navbar shrink effect
      setScrolled(window.scrollY > 50);

      // 2. Track current section based on scroll position
      // Using a threshold of 1/3rd of the screen height
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = "";

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = item.id;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      } else if (!current && window.scrollY < window.innerHeight / 2) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    const timer = setTimeout(() => setShowHint(true), 2000);
    const hideTimer = setTimeout(() => setShowHint(false), 8000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      // Offset slightly to account for the floating navbar
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ─────────── ADVANCED FLOATING PILL NAVBAR ─────────── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none"
      >
        {/* Outer Glow container hidden until scrolled */}
        <div className={`absolute inset-0 -top-[50%] -left-[10%] w-[120%] h-[200%] pointer-events-none bg-gradient-to-b from-[#00FFB3]/10 to-transparent blur-[80px] transition-opacity duration-1000 ${scrolled ? 'opacity-100 dark:opacity-40' : 'opacity-0'}`} />

        <div className="relative pointer-events-auto">
          {/* Animated Gradient Border Layer */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#00FFB3]/40 via-blue-500/40 to-purple-500/40 blur-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <motion.div
            animate={{
              paddingTop: scrolled ? "0.6rem" : "0.75rem",
              paddingBottom: scrolled ? "0.6rem" : "0.75rem",
              borderRadius: scrolled ? "1.5rem" : "1.75rem",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative flex items-center justify-between gap-2 md:gap-4 px-4 md:px-6 w-full max-w-5xl transition-all duration-500 ring-1 shadow-2xl ${
              scrolled
                ? "bg-white/70 dark:bg-black/60 backdrop-blur-3xl ring-black/5 dark:ring-white/10 shadow-black/10 dark:shadow-[#00FFB3]/5"
                : "bg-white/40 dark:bg-[#030303]/40 backdrop-blur-xl ring-black/5 dark:ring-white/5 shadow-transparent"
            }`}
          >
            {/* ─── M BUTTON (EXPERIMENTAL LAB) ─── */}
            <div className="relative flex-shrink-0">
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                  >
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-zinc-900 to-black dark:from-[#00FFB3]/20 dark:to-transparent border border-zinc-800 dark:border-[#00FFB3]/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,255,179,0.3)] min-w-max">
                      <MousePointer2 className="w-3 h-3 text-[#00FFB3] animate-bounce" />
                      <span className="text-[8px] uppercase tracking-[0.3em] text-[#00FFB3] font-black">
                        Enter Lab
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => {
                  onMClick();
                  setShowHint(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer group z-10"
                aria-label="Open Experimental Lab"
              >
                {/* Rotating SVG Ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-[#00FFB3] border-r-blue-500 opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700 pointer-events-none" />
                
                {/* Background Fill */}
                <div className="absolute inset-0.5 rounded-[14px] bg-zinc-900 dark:bg-white/10 group-hover:bg-black dark:group-hover:bg-[#00FFB3]/20 transition-colors backdrop-blur-md" />
                
                <span className="relative z-10 text-base font-black text-[#00FFB3] leading-none drop-shadow-[0_0_8px_rgba(0,255,179,0.8)]">
                  M
                </span>
                
                {/* Floating Icon */}
                <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FlaskConical size={10} className="text-[#00FFB3] dark:text-white drop-shadow-md animate-pulse" />
                </span>
              </motion.button>
            </div>

            {/* ─── DESKTOP NAV LINKS (macOS Dock Style) ─── */}
            <div
              className="hidden md:flex items-center gap-1 flex-1 justify-center relative"
              onMouseLeave={() => setHoveredTab(null)}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredTab === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredTab(item.id)}
                    className="relative px-4 py-2 rounded-xl cursor-pointer group outline-none"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover Pill Background */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="nav-hover-pill"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 rounded-xl bg-black/5 dark:bg-white/5"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-xl bg-white dark:bg-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-black/5 dark:border-white/10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active Dot Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-dot"
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FFB3] shadow-[0_0_8px_rgba(0,255,179,0.8)]"
                      />
                    )}

                    <span
                      className={`relative z-10 text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${
                        isActive
                          ? "text-black dark:text-white"
                          : isHovered
                          ? "text-zinc-800 dark:text-zinc-200"
                          : "text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* ─── RIGHT CONTROLS ─── */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Theme Toggle Premium Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-10 h-10 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-zinc-200/50 dark:border-white/10 flex items-center justify-center overflow-hidden group shadow-sm"
                aria-label="Toggle Theme"
              >
                {/* Glow behind icon */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.1)_0%,transparent_70%)]" />
                
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ y: -20, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3, ease: "backOut" }}
                      className="relative z-10"
                    >
                      <Sun className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: -20, opacity: 0, rotate: 90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.3, ease: "backOut" }}
                      className="relative z-10"
                    >
                      <Moon className="w-4 h-4 text-zinc-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Hamburger Premium */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden relative w-10 h-10 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-zinc-200/50 dark:border-white/10 flex items-center justify-center shadow-sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X size={18} className="text-zinc-900 dark:text-white" />
                ) : (
                  <Menu size={18} className="text-zinc-900 dark:text-white" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* ─────────── MOBILE DRAWER (GLASSMORPHISM) ─────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden pointer-events-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white/95 dark:bg-[#050505]/95 backdrop-blur-3xl border-l border-zinc-200 dark:border-white/10 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.2)]"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-black dark:bg-[#00FFB3]/10 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white dark:text-[#00FFB3]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white">
                    Navigation
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 px-6 py-8 space-y-3 overflow-y-auto">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full relative flex items-center justify-between px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all overflow-hidden group ${
                      activeSection === item.id
                        ? "bg-zinc-900 text-white dark:bg-[#00FFB3] dark:text-black shadow-xl"
                        : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div 
                      className={`w-2 h-2 rounded-full ${activeSection === item.id ? "bg-[#00FFB3] dark:bg-black" : "bg-transparent group-hover:bg-zinc-200 dark:group-hover:bg-white/20"} transition-colors`} 
                    />
                  </motion.button>
                ))}
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02]">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onMClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-4 rounded-2xl bg-zinc-900 dark:bg-[#00FFB3] text-white dark:text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,255,179,0.2)]"
                >
                  <FlaskConical size={16} className={theme === 'dark' ? "text-black" : "text-[#00FFB3]"} /> 
                  Enter Security Lab
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;