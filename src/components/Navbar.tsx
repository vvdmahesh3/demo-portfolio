"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, FlaskConical } from "lucide-react"; // Added icon for lab feel
import { useTheme } from "next-themes";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

// Added the prop interface to fix your App.tsx error
interface NavbarProps {
  onMClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md border-b border-black/5 dark:border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo - Now triggers the Lab Overlay */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl font-black cursor-pointer text-black dark:text-[#00FFB3] relative group"
            onClick={onMClick} 
          >
            M
            <span className="absolute -top-1 -right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <FlaskConical size={10} className="text-[#00FFB3] animate-pulse" />
            </span>
          </motion.div>

          {/* Desktop Nav Centered */}
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
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-black dark:bg-[#00FFB3] shadow-[0_0_8px_#00FFB3]"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right: Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 transition hover:scale-110 border border-black/5 dark:border-white/10"
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
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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
                className={`text-2xl font-black uppercase tracking-tighter ${
                  activeSection === item.id ? "text-blue-600 dark:text-[#00FFB3]" : "text-zinc-400"
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